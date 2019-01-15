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
    [Authorize]
    public class ReviewsController : ControllerBase
    {
        [HttpPost]
        public int NewReview([FromBody]Reviews reviews)
        {
            if (reviews.Rating > 5 || reviews.Rating < 1 || reviews.ApartmentID < 1 || String.IsNullOrEmpty(reviews.Description) ||
                reviews.Description.Length > 70 || reviews.Description.Length < 3)
                return -1;
            reviews.UserName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            if (String.IsNullOrEmpty(reviews.UserName))
                return -1;
            return DB.ReviewsDB.NewReview(reviews);
        }

        [HttpPost("Delete")]
        public bool DeleteReview([FromBody]Reviews reviews)
        {
            reviews.UserName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;

            if (reviews.ApartmentID < 1 || reviews.ReviewID < 1)
                return false;
            return DB.ReviewsDB.DeleteReview(reviews);
        }

        [HttpPut]
        public bool EditReview([FromBody]Reviews reviews)
        {
            reviews.UserName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            if (reviews.ReviewID <1 || reviews.ApartmentID < 1 || reviews.Rating < 1 || 
                reviews.Rating > 5 ||String.IsNullOrEmpty(reviews.Description) || reviews.Description.Length < 3 || reviews.Description.Length > 70)
                return false;
            return DB.ReviewsDB.EditReview(reviews);
        }

        [HttpGet("UserReviews")]
        public List<Reviews> GetUserReviews()
        {
            string userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
            return DB.ReviewsDB.GetUserReviews(userName);
        }
    }
}