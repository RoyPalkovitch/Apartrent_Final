using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        [HttpGet("UserProfile")]
        public Users GetUserProfile([FromQuery] string userName)
        {
            return DB.UsersDB.GetUserProfile(userName);
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
            PasswordHash hash = new PasswordHash();
            user.Password = hash.Hash(user.Password);
            return DB.UsersDB.SignUp(user);
        }
    }
}