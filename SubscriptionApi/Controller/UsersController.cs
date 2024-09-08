using Azure.Identity;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SubscriberApp.Data;
using SubscriberApp.Models;
using System.Threading.Tasks;

namespace SubscriberApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public UsersController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] Users user)
        {
            var existingUser = await _dbContext.Users
                                     .AnyAsync(u => u.email == user.email);
            if (existingUser)
            {
                return BadRequest("User already exists.");
            }

            int maxCompanyId = await _dbContext.Companies.MaxAsync(c => (int?)c.company_id) ?? 0;
            int newCompanyId = maxCompanyId + 1;

            user.password = BCrypt.Net.BCrypt.HashPassword(user.password);
            user.company_id = newCompanyId;
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            var company = new Companies
            {
                company_id = newCompanyId,
                company_name = user.company_name,
                manager_id = user.user_id,
                manager_name = user.user_name,
                manager_email = user.email
            };

            _dbContext.Companies.Add(company);
            await _dbContext.SaveChangesAsync();

            return Ok(user);
        }

        [HttpGet]
        public async Task<ActionResult<Users>> GetUsers()
        {
            var users = await _dbContext.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] Users login)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => u.email == login.email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(login.password, user.password))
            {
                return Unauthorized("Invalid login credentials.");
            }

            return Ok(new { user.user_id, user.user_name, user.company_name });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Ok(new { message = "Successfully logout." });
        }
    }
}
