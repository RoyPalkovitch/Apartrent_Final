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
            if (String.IsNullOrEmpty(users.UserName))
                return false;
              return DB.UsersDB.EditUser(users);
        }


        [HttpPut("UpdateProfileImage")]
        [Authorize]
        public bool UpdateProfileImage([FromBody]Users user)
        {
            user.UserName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            if (String.IsNullOrEmpty(user.UserName))
                return false;
            user.ProfileImageByte = ImageValidation.Base64Vadilation(user.ProfileImage,null)[0];
            if (user.ProfileImageByte == null)
                return false;
                return DB.UsersDB.UpdateProfilePicture(user);
        }


        [HttpDelete]
        [Authorize]
        public bool DeleteUser()
        {
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            if (String.IsNullOrEmpty(userName))
                return false;
            return DB.UsersDB.DeleteUser(userName);
        }


        [HttpPost]
        public bool SignUp([FromBody]Users user)
        {
            user.ProfileImageByte = ImageValidation.Base64Vadilation(user.ProfileImage, null)[0];

            PasswordHash hash = new PasswordHash();
            user.Password = hash.Hash(user.Password);
            return DB.UsersDB.SignUp(user);
            
        }

    }
}