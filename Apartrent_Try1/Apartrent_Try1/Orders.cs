using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apartrent_Try1
{
    public class Orders
    {
        public int OrderID { get; set; }
        public int ApartmentID { get; set; }
        public string UserName { get; set; }
        public string RenterUserName { get; set; }
        public double Price { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool Approved { get; set; }


    }
}
