using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apartrent_Try2
{
    public class Reviews
    {
        public int ReviewID { get; set; }

        public int ApartmentID { get; set; }

        public short Rating { get; set; }

        public string UserName { get; set; }

        public string Description { get; set; }
    }
}
