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
    public class RenterController : ControllerBase
    {

        [HttpDelete]
        public bool DeleteRenterStatus([FromBody]Users users)
        {
            return DB.RenterDB.DeleteRenterStatus(users.UserName,users.Password);
        }
    }
}