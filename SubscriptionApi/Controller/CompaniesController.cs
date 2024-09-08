using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SubscriberApp.Data;
using SubscriberApp.Models;
using System.Threading.Tasks;

namespace SubscriberApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public CompaniesController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<Companies>> GetCompanies()
        {
            var companies = await _dbContext.Companies.ToListAsync();
            return Ok(companies);
        }
    }
}