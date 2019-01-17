using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Apartrent_Try2
{
    public class Users
    {
        public byte[] ProfileImageByte { get; set; }
        public string ProfileImage { get; set; }
        public string ProfileImageType { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool Gender { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long LastLogin { get; set; }
        public long LastOrder { get; set; }
        public int CountryID { get; set; }
        public string CountryName { get; set; }
        public int Role { get; set; }
        public string Token { get; set; }
        public List<Apartment> RenterApartments { get; set; }
        public List<Orders> PendingOrders { get; set; }
        
    }

    public enum Role
    {
        User, Renter, Admin
    }

}

