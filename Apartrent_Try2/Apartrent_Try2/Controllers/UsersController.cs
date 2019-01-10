using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace Apartrent_Try2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet("Login")]
        public Users Login([FromQuery]Users users)
        {
            if (String.IsNullOrEmpty(users.UserName) || users.UserName.Length < 4 || users.UserName.Length > 10 ||
                users.Password.Length < 6 || users.Password.Length > 10)
                return null;
            return DB.UsersDB.Login(users);
        }


        [HttpGet("NewToken")]
        [Authorize]
        public string NewToken()
        {
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            int role =Int32.Parse(((ClaimsIdentity)User.Identity).FindFirst("Role").Value);
            return AuthService.GetToken(userName,role).ToString();
            
        }


        [HttpPut]
        [Authorize]
        public bool EditUser([FromBody]Users users)
        {
            users.UserName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            if (String.IsNullOrEmpty(users.UserName) || String.IsNullOrEmpty(users.Password) || String.IsNullOrEmpty(users.PhoneNumber) ||
               String.IsNullOrEmpty(users.Email) || String.IsNullOrEmpty(users.Address) || String.IsNullOrEmpty(users.FirstName) ||
               String.IsNullOrEmpty(users.LastName) || users.CountryID > 5 || users.CountryID < 1 || users.Address.Length > 50 ||
               users.Address.Length < 3 || users.PhoneNumber.Length > 15 || users.PhoneNumber.Length < 5 || users.UserName.Length > 10 ||
               users.UserName.Length < 4 || users.Password.Length > 10 || users.Password.Length < 6 || users.Email.Length > 30 ||
               users.Email.Length < 7 || users.FirstName.Length > 11 || users.LastName.Length > 11 ||
               !users.Email.Contains(".com") || !users.Email.Contains("@") || String.IsNullOrEmpty(users.ProfileImageType) || users.ProfileImageType.Length > 50)
                return false;
            return DB.UsersDB.EditUser(users);
        }


        [HttpPut("UpdateProfileImage")]
        [Authorize]
        public bool UpdateProfileImage([FromBody]Users user)
        {
            user.UserName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;

            user.ProfileImageByte = ImageValidation.Base64Vadilation(user.ProfileImage,null)[0];
            if (user.ProfileImageByte == null || user.ProfileImageType == null || user.ProfileImageType.Length > 50)
                return false;
                return DB.UsersDB.UpdateProfilePicture(user);
        }


        [HttpDelete]
        [Authorize]
        public bool DeleteUser()
        {
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;

            return DB.UsersDB.DeleteUser(userName);
        }


        [HttpPost]
        public bool SignUp([FromBody]Users user)
        {
            if (String.IsNullOrEmpty(user.UserName) || String.IsNullOrEmpty(user.Password) || String.IsNullOrEmpty(user.PhoneNumber) ||
                String.IsNullOrEmpty(user.Email) || String.IsNullOrEmpty(user.Address) || String.IsNullOrEmpty(user.FirstName) ||
                String.IsNullOrEmpty(user.LastName) || user.CountryID > 5 || user.CountryID < 1 || user.Address.Length > 50 ||
                user.Address.Length < 3 || user.PhoneNumber.Length > 15 || user.PhoneNumber.Length < 5 || user.UserName.Length > 10 ||
                user.UserName.Length < 4 || user.Password.Length > 10 || user.Password.Length < 6 || user.Email.Length > 30 ||
                user.Email.Length < 7 || user.FirstName.Length > 11 || user.LastName.Length > 11 ||
                !user.Email.Contains(".com") || !user.Email.Contains("@")||String.IsNullOrEmpty(user.ProfileImageType)||user.ProfileImageType.Length > 50)
                return false;

            if(String.IsNullOrEmpty(user.ProfileImage))
                 user.ProfileImageByte = ImageValidation.Base64Vadilation(user.ProfileImage, null)[0];

            PasswordHash hash = new PasswordHash();
            user.Password = hash.Hash(user.Password);
            return DB.UsersDB.SignUp(user);
            
        }

    }
}