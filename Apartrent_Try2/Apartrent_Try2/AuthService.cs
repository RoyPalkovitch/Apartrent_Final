using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Apartrent_Try2
{
    public class AuthService
    {
        private static string AuthSecret;

        public static void GetAuthKey(string key)
        {
            if(String.IsNullOrEmpty(AuthSecret))
                AuthSecret = key;
        }

        public static object GetToken(string userName,int role)
        {
            if (string.IsNullOrEmpty(userName) && (role != 0 ||role != 1))
            {
                return null;
            }

            return TokenCreation(userName,role);
        }

        private static object TokenCreation(string userName,int role)
        {
            var claims = new[]
            {
                new Claim("UserName",userName),
                new Claim("Role",role.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AuthSecret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "https://localhost:44328",
                audience: "https://localhost:44328",
                claims: claims,
                expires: DateTime.Now.AddMinutes(45),
                signingCredentials: creds
                );

            var writtingToken = new JwtSecurityTokenHandler().WriteToken(token);
            return writtingToken;
        }
    }
}
