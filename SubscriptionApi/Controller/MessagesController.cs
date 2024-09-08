using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SubscriberApp.Data;
using SubscriberApp.Models;
using System.Threading.Tasks;
using System.Linq;

namespace SubscriberApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public MessagesController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(Messages message)
        {
            var sender = await _dbContext.Users.AnyAsync(u => u.user_id == message.sender_id);
            var receiver = await _dbContext.Users.AnyAsync(u => u.user_id == message.receiver_id);
            var senderName = await _dbContext.Users.AnyAsync(u => u.user_name == message.sender_name);
            var receiverName = await _dbContext.Users.AnyAsync(u => u.user_name == message.receiver_name);

            if (!sender || !receiver)
            {
                return NotFound("Kullanýcý bulunamadý.");
            }

            //Ayný þirketteki kullanýcýlar için kontrol
            //if (sender.company_id != receiver.company_id)
            //{
            //    return BadRequest("Ayný þirketteki kullanýcýlar birbirine mesaj gönderebilir.")
            //}

            message.sent_at = DateTime.UtcNow;
            message.is_read = false;
            _dbContext.Messages.Add(message);
            await _dbContext.SaveChangesAsync();
            return Ok(message);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetMessages(int userId)
        {
            var messages = await _dbContext.Messages
                .Where(m => m.receiver_id == userId)
                .ToListAsync();
            return Ok(messages);
        }

        [HttpGet("{userId}/unreadcount")]
        public async Task<IActionResult> GetUnreadMessagesCount(int userId)
        {
            var unreadMessagesCount = await _dbContext.Messages
                .Where(m => m.receiver_id == userId && !m.is_read)
                .CountAsync();

            return Ok(unreadMessagesCount);
        }

        [HttpPut("{userId}/markread")]
        public async Task<IActionResult> MarkMessagesAsRead(int userId)
        {
            var unreadMessages = await _dbContext.Messages
                .Where(m => m.receiver_id == userId && !m.is_read)
                .ToListAsync();

            unreadMessages.ForEach(m => m.is_read = true);
            await _dbContext.SaveChangesAsync();

            return Ok("Mesajlar okundu olarak iþaretlendi.");
        }
    }
}