using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using api.Interfaces;
using api.Models;
using api.Database;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvailabilityController : ControllerBase
    {
        // GET: api/Availability
        [EnableCors("AnotherPolicy")]
        [HttpGet]
        public List<Availability> Get()
        {
            IHandleAvailability availability = new AvailabilityUtility();
            return availability.GetAll();
        }
        
        // GET: api/Availability/5
        [EnableCors("AnotherPolicy")]
        [HttpGet("{id}", Name = "GetAvailability")]
        public Availability Get(int id)
        {
            IHandleAvailability getAvailability = new AvailabilityUtility();
            return getAvailability.GetOne(id);
        }

        // POST: api/Availability
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void Post([FromBody] Availability value)
        {
            IHandleAvailability postAvailability = new AvailabilityUtility();
            postAvailability.Create(value);
        }

        // PUT: api/Availability/5
        [EnableCors("AnotherPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Availability/5
        [EnableCors("AnotherPolicy")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
