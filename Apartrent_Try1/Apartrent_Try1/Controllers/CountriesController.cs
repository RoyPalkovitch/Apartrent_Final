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
    public class CountriesController : ControllerBase
    {
        [HttpGet]
        public List<Countries> GetCountries()
        {
            List<Countries> countries = new List<Countries>();
            return countries = DB.CountriesDB.GetCountries();
        }
    }
}