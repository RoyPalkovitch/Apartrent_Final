﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Apartrent_Try2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        long presentTime = DateTime.Now.Ticks;

        [HttpGet("UserOrders")]
        public List<Orders> GetUserOrders()
        {
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;

            return DB.OrdersDB.GetUserOrders(userName);
        }

        [HttpGet("PendingOrders")]
        public List<Orders> GetPendingOrders()
        {
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            int role = Int32.Parse(((ClaimsIdentity)User.Identity).FindFirst("Role").Value);
            if ( role != 1)
                return null;
            return DB.OrdersDB.GetPendingOrders(userName, null);
        }

        [HttpGet("ApartmentOrders")]
        public List<Orders> GetApartmentOrders([FromQuery]int apartmentID)
        {
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            int role = Int32.Parse(((ClaimsIdentity)User.Identity).FindFirst("Role").Value);
            if (String.IsNullOrEmpty(userName) || role != 1 || apartmentID < 1)
                return null;
            return DB.OrdersDB.GetApartmentOrders(userName, apartmentID);
        }

        [HttpPut]
        public object ChangeOrderStatus([FromBody]Orders orders)
        {
            orders.UserName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            int role = Int32.Parse(((ClaimsIdentity)User.Identity).FindFirst("Role").Value);
            if (String.IsNullOrEmpty(orders.UserName) || role != 1 || orders.OrderID < 1 || orders.ApartmentID < 1 )
                return null;
            return DB.OrdersDB.UpdateOrderStatus(orders);
        }

        [HttpPost]
        public bool NewOrder([FromBody]Orders order)
        {
            order.UserName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            if (String.IsNullOrEmpty(order.UserName) || String.IsNullOrEmpty(order.UserName)
                 || order.FromDate.Ticks > order.ToDate.Ticks || presentTime > order.FromDate.Ticks || presentTime > order.ToDate.Ticks)
                return false;
            return DB.OrdersDB.NewOrder(order);
        }

        [HttpDelete]
        public bool DeleteOrders([FromQuery] int orderID)
        {
            if (orderID < 1)
                return false;
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            return DB.OrdersDB.DeleteOrder(orderID, userName);
        }
    }
}