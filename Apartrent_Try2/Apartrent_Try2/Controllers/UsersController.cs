using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet("UserProfile")]
        public Users GetUserProfile([FromQuery] string userName)
        {
            return DB.UsersDB.GetUserProfile(userName);
        }

        [HttpPut]
        public bool EditUser([FromBody]Users users)
        {
            return DB.UsersDB.EditUser(users);
        }


        [HttpDelete]
        public bool DeleteUser([FromQuery]Users users)
        {
            return DB.UsersDB.DeleteUser(users);
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