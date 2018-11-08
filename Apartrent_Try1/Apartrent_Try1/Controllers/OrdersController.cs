﻿using System;
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


        [HttpPost]
        public bool NewOrder([FromQuery] string password,[FromBody]Orders order)
        {
            return DB.OrdersDB.NewOrder(password, order);
        }


    }
}