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
        public int AddApartment([FromQuery]string userName, [FromQuery]string password, [FromQuery]bool changeRenterStatus, [FromBody]Apartment apartment)
        {
            return DB.ApartmentDB.AddApartment(apartment, userName, password, changeRenterStatus);
        }

        [HttpDelete]
        public bool DeleteApartment([FromQuery]int apartmentID, [FromQuery]string userName, [FromQuery]string password)
        {
            return DB.ApartmentDB.DeleteApartment(apartmentID, userName, password);
        }

        [HttpPut]
        public bool EditApartment([FromQuery]string userName, [FromQuery]string password, [FromQuery]bool editFeature, [FromBody]Apartment apartment)
        {
            return DB.ApartmentDB.EditApartment(apartment, editFeature, userName, password);
        }
    }
}