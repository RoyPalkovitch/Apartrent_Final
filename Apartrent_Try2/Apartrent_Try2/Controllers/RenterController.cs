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
    [Authorize]
    public class RenterController : ControllerBase
    {

        [HttpDelete]
        public string DeleteRenterStatus()
        {
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            int role = Int32.Parse(((ClaimsIdentity)User.Identity).FindFirst("Role").Value);
            if (String.IsNullOrEmpty(userName) || role != 1)
                return null;
            if (DB.RenterDB.DeleteRenterStatus(userName))
            {
                role = 0;
                return AuthService.GetToken(userName, role).ToString();
            }
            return null;
        }
    }
}