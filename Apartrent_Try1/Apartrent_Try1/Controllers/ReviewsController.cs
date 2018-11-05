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
    public class ReviewsController : ControllerBase
    {
        [HttpPost]
        public int NewReview([FromQuery]string password,[FromBody]Reviews reviews)
        {
            return DB.ReviewsDB.NewReview(reviews, password);
        }

        [HttpPost("Delete")]
        public bool DeleteReview([FromQuery]string password,[FromBody]Reviews reviews)
        {
            return DB.ReviewsDB.DeleteReview(reviews, password);
        }

        [HttpPut]
        public bool EditReview([FromQuery]string password,[FromBody]Reviews reviews)
        {
            return DB.ReviewsDB.EditReview(reviews, password);
        }

        [HttpGet("UserReviews")]
        public List<Reviews> GetUserReviews ([FromQuery]string userName,[FromQuery]string password)
        {
            return DB.ReviewsDB.GetUserReviews(userName,password);
        }
        
    }
}