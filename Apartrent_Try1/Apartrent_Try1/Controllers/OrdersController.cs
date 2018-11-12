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
    public class OrdersController : ControllerBase
    {

        [HttpGet("UserOrders")]
        public List<Orders> GetUserOrders([FromQuery]string userName,[FromQuery]string password)
        {
            return DB.OrdersDB.GetUserOrders(userName,password);
        }

        [HttpGet("PendingOrders")]
        public List<Orders> GetPendingOrders([FromQuery]string userName,[FromQuery]string password)
        {
            return DB.OrdersDB.GetPendingOrders(userName, password);
        }

        [HttpGet("ApartmentOrders")]
        public List<Orders> GetApartmentOrders([FromQuery]string userName, [FromQuery] string password, [FromQuery]int apartmentID)
        {
            return DB.OrdersDB.GetApartmentOrders(userName, password, apartmentID);
        }

        [HttpPut]
        public bool ChangeOrderStatus([FromQuery]string password,[FromBody]Orders orders)
        {
            return DB.OrdersDB.UpdateOrderStatus(password, orders);
        }

        [HttpPost]
        public bool NewOrder([FromQuery] string password,[FromBody]Orders order)
        {
            return DB.OrdersDB.NewOrder(password, order);
        }


    }
}