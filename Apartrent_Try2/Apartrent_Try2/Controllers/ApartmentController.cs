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
        long presentTicks = DateTime.Now.Ticks; // for validate the date time is not from the past
        [HttpGet("ApartmentLocation")]
        public List<Apartment> GetApartmentForLocation(int countryID, int numberOfGuests, DateTime fromDate, DateTime toDate) // need to add time availabe
        {
            if (countryID > 5 || countryID < 1 || numberOfGuests > 20 || numberOfGuests < 1 || fromDate.Ticks > toDate.Ticks ||
                presentTicks > fromDate.Ticks || presentTicks > toDate.Ticks)
                return null;

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
            if (apartmentID < 1)
                return null;
            return DB.ApartmentDB.GetApartment(apartmentID);
        }

        [HttpPost]
        [Authorize]
        public Apartment AddApartment([FromBody]Apartment apartment)
        {
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            int role = Int32.Parse(((ClaimsIdentity)User.Identity).FindFirst("Role").Value);
            if (apartment.CategoryID < 1 || apartment.CategoryID > 2 || apartment.CountryID < 1 || apartment.CountryID > 5 || apartment.PricePerDay < 0 ||
                apartment.Address.Length > 50 || apartment.Address.Length < 5 || String.IsNullOrEmpty(apartment.Address) || apartment.FromDate.Ticks >= apartment.ToDate.Ticks ||
                presentTicks > apartment.FromDate.Ticks || presentTicks >= apartment.ToDate.Ticks ||
                apartment.Description.Length > 70 || apartment.Description.Length < 5 || String.IsNullOrEmpty(apartment.Description) ||
                apartment.NumberOfGuests < 1 || apartment.NumberOfGuests > 20 || apartment.NumberOfBedRooms < 1 ||
                apartment.LivingRoomDescription.Length > 70 || apartment.LivingRoomDescription.Length < 5 || String.IsNullOrEmpty(apartment.LivingRoomDescription) ||
                apartment.BedRoomDescription.Length > 70 || apartment.BedRoomDescription.Length < 5 || String.IsNullOrEmpty(apartment.BedRoomDescription) ||
                apartment.QueenSizeBed < 0 || apartment.DoubleBed < 0 || apartment.SingleBed < 0 || apartment.SofaBed < 0 ||
                apartment.BedsDescription.Length > 70 || apartment.BedsDescription.Length < 5 || String.IsNullOrEmpty(apartment.BedsDescription))
                return null;
            if (apartment.ApartmentImageType[0] != null)
                apartment.ApartmentImageByte = ImageValidation.Base64Vadilation(null, apartment.ApartmentImage);
            if (apartment.ApartmentImageByte[0] == null)
                return null;
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
            if (String.IsNullOrEmpty(userName) || role != 1 || apartmentID < 1)
                return false;
            return DB.ApartmentDB.DeleteApartment(apartmentID, userName, null);
        }

        [HttpPut]
        [Authorize]
        public bool EditApartment([FromQuery]bool editFeature, [FromBody]Apartment apartment)
        {
            if (apartment.CategoryID < 1 || apartment.CategoryID > 2 || apartment.CountryID < 1 || apartment.CountryID > 5 ||
                     apartment.Address.Length > 50 || apartment.Address.Length < 5 || String.IsNullOrEmpty(apartment.Address) || apartment.FromDate.Ticks >= apartment.ToDate.Ticks ||
                     presentTicks > apartment.FromDate.Ticks || presentTicks >= apartment.ToDate.Ticks ||
                     apartment.Description.Length > 70 || apartment.Description.Length < 5 || String.IsNullOrEmpty(apartment.Description) ||
                     apartment.NumberOfGuests < 1 || apartment.NumberOfGuests > 20 || apartment.NumberOfBedRooms < 1 || apartment.PricePerDay < 0
                   )
                return false;
            if (editFeature && apartment.LivingRoomDescription.Length > 70 || apartment.LivingRoomDescription.Length < 5 || String.IsNullOrEmpty(apartment.LivingRoomDescription) ||
                     apartment.BedRoomDescription.Length > 70 || apartment.BedRoomDescription.Length < 5 || String.IsNullOrEmpty(apartment.BedRoomDescription) ||
                     apartment.QueenSizeBed < 0 || apartment.QueenSizeBed > 20 || apartment.DoubleBed > 20 || apartment.SingleBed > 20 || apartment.SofaBed > 20 || apartment.DoubleBed < 0 || apartment.SingleBed < 0 || apartment.SofaBed < 0 ||
                     apartment.BedsDescription.Length > 70 || apartment.BedsDescription.Length < 5 || String.IsNullOrEmpty(apartment.BedsDescription))
                return false;
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            int role = Int32.Parse(((ClaimsIdentity)User.Identity).FindFirst("Role").Value);
            if (String.IsNullOrEmpty(userName) || role != 1)
                return false;
            return DB.ApartmentDB.EditApartment(apartment, editFeature, userName);
        }

        [HttpPut("UpdateApartmentImages")]
        [Authorize]
        public bool UpdateApartmentImages([FromBody]Apartment apartment)
        {
            apartment.RenterUserName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            int role = Int32.Parse(((ClaimsIdentity)User.Identity).FindFirst("Role").Value);
            if (role != 1 || String.IsNullOrEmpty(apartment.RenterUserName))
                return false;
            apartment.ApartmentImageByte = ImageValidation.Base64Vadilation(null, apartment.ApartmentImage);
            if (apartment.ApartmentImageByte[0] == null || apartment.ApartmentImageType[0] == null)
                return false;
            for (int i = 1; i < 5; i++)
            {
                if (apartment.ApartmentImageType[i] == null || apartment.ApartmentImageByte[i] == null)
                {
                    apartment.ApartmentImageType[i] = null;
                    apartment.ApartmentImageByte[i] = null;
                }
            }
            return DB.ApartmentDB.UpdateApartmentPictures(apartment);
        }
    }
}