using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SubscriberApp.Data;
using SubscriberApp.Models;
using System.Threading.Tasks;


namespace SubscriberApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscribersController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public SubscribersController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> PostSubscriber([FromBody] Subscribers subscriber)
        {
            var existingSubscriber = await _dbContext.Subscribers
                                            .AnyAsync(s => s.subscriber_name == subscriber.subscriber_name);
            if (existingSubscriber)
            {
                return BadRequest("Subscriber already exists.");
            }

            _dbContext.Subscribers.Add(subscriber);
            await _dbContext.SaveChangesAsync();

            return Ok(subscriber);
        }

        [HttpGet]
        public async Task<ActionResult<Subscribers>>GetSubscribers()
        {
            var subscribers = await _dbContext.Subscribers.ToListAsync();
            return Ok(subscribers);
        }
    }
}
