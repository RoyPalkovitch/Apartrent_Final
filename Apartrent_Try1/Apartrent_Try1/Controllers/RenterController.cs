using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Apartrent_Try1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RenterController : ControllerBase
    {

      [HttpPost]
      public bool BecomeRenter([FromBody]Users users)
        {
            return DB.RenterDB.BecomeRenter(users);
        }

        [HttpDelete]
        public bool DeleteRenterStatus([FromBody]Users users)
        {
            return DB.RenterDB.DeleteRenterStatus(users);
        }


    }
}