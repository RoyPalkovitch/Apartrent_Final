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
    public class ApartmentController : ControllerBase
    {
        [HttpGet("ApartmentLocation")]
        public List<Apartment> GetApartmentForLocation(int countryID, int numberOfGuests, DateTime fromDate, DateTime toDate) // need to add time availabe
        {

            List<Apartment> apartments = new List<Apartment>();
            return apartments = DB.ApartmentDB.GetApartmentsForLocation(countryID, numberOfGuests, fromDate, toDate);
        }

        [HttpGet("ApartmentType")]
        public List<ApartmentCategories> GetApartmentCategories()
        {
            List<ApartmentCategories> categories = new List<ApartmentCategories>();
            return categories = DB.ApartmentDB.GetCategories();
        }

        [HttpGet("GetApartment")]
        public Apartment GetApartment([FromQuery]int apartmentID)
        {
            return DB.ApartmentDB.GetApartment(apartmentID);
        }

        [HttpPost]
        [Authorize]
        public int AddApartment([FromBody]Apartment apartment)
        {
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            int role = Int32.Parse(((ClaimsIdentity)User.Identity).FindFirst("Role").Value);
            if (String.IsNullOrEmpty(userName))
                return -1;

            bool changeRenterStatus = false;
            if (role == 0)
                changeRenterStatus = true;
            return DB.ApartmentDB.AddApartment(apartment, userName, changeRenterStatus);
        }

        [HttpDelete]
        [Authorize]
        public bool DeleteApartment([FromQuery]int apartmentID)
        {
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            int role = Int32.Parse(((ClaimsIdentity)User.Identity).FindFirst("Role").Value);
            if (String.IsNullOrEmpty(userName) || role != 1)
                return false;
            return DB.ApartmentDB.DeleteApartment(apartmentID, userName,null);
        }

        [HttpPut]
        [Authorize]
        public bool EditApartment([FromQuery]bool editFeature, [FromBody]Apartment apartment)
        {
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            int role = Int32.Parse(((ClaimsIdentity)User.Identity).FindFirst("Role").Value);
            if (String.IsNullOrEmpty(userName) || role != 1)
                return false;
            return DB.ApartmentDB.EditApartment(apartment, editFeature, userName);
        }
    }
}