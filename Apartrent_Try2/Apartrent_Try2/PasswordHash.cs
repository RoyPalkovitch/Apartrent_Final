using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Apartrent_Try2
{
    public class PasswordHash
    {
        //Size of salt
        private const int SaltSize = 16;
        //Size of hash
        private const int HashSize = 20;

        /// <summary>
        /// Creates a hash from a password.
        /// </summary>
        /// <param name="password">The password.</param>
        /// <param name="iterations">Number of iterations.</param>
        /// <returns>The hash.</returns>
        private string HashOperation(string password, int iterations)
        {
            //Create salt
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[SaltSize]);

            //Create hash
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterations);
            var hash = pbkdf2.GetBytes(HashSize);

            //Combine salt and hash (salt first)
            var hashBytes = new byte[SaltSize + HashSize];
            Array.Copy(salt, 0, hashBytes, 0, SaltSize);
            Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

            //Convert to base64
            var base64Hash = Convert.ToBase64String(hashBytes);

            //Format hash with extar information
            return string.Format("$ddsadd$AS${0}${1}", iterations, base64Hash);
        }


        /// <summary>
        /// Creates a hash from a password with 10000 iterations
        /// </summary>
        /// <param name="password">The password.</param>
        /// <returns>The hash.</returns>
        public string Hash(string password)
        {
            return HashOperation(password, 10000);
        }


        /// <summary>
        /// Verifies a password against a hash.
        /// </summary>
        /// <param name="password">The password.</param>
        /// <param name="hashedPassword">The hash.</param>
        /// <returns>Could be verified?</returns>
        public bool Verify(string password,string hashedPassword)
        {

            // Extract iteration and Base64 string
            var splittedHashString = hashedPassword.Replace("$ddsadd$AS$", "").Split('$');
            var iterations = int.Parse(splittedHashString[0]);
            var base64Hash = splittedHashString[1];

            // Get hash bytes
            var hashBytes = Convert.FromBase64String(base64Hash);

            //Get salt
            var salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);

            //Create hash with given salt (from the password the user entered)
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterations);
            byte[] hash = pbkdf2.GetBytes(HashSize);

            //Get result
            for (int i = 0; i < HashSize; i++)
            {
                if (hashBytes[i + SaltSize] != hash[i])
                    return false;
            }

            return true;
        }
    }
}
