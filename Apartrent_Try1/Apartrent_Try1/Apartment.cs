using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apartrent_Try1
{
    public class Apartment
    {
        public int ApartmentID { get; set; }
        public string RenterUserName { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int CountryID { get; set; }
        public string CountryName { get; set; }
        public int CategoryID { get; set; }
        public string ApartmentType { get; set; }
        
        public string Address { get; set; }
        public double PricePerDay { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Description { get; set; }

        public int NumberOfGuests { get; set; }
        public bool Shower { get; set; }
        public bool Bath { get; set; }
        public bool WIFI { get; set; }
        public bool TV { get; set; }
        public bool Cables { get; set; }
        public bool Satellite { get; set; }
        public bool Pets { get; set; }
        public int NumberOfBedRooms { get; set; }
        public bool LivingRoom { get; set; }
        public string BedRoomDescription { get; set; }
        public string LivingRoomDescription { get; set; }
        public int QueenSizeBed { get; set; }
        public int DoubleBed { get; set; }
        public int SingleBed { get; set; }
        public int SofaBed { get; set; }
        public string BedsDescription { get; set; }
    }
}
