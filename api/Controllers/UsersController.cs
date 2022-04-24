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
    public class UsersController : ControllerBase
    {
        // GET: api/Users
        [EnableCors("AnotherPolicy")]
        [HttpGet]
        public List<User> Get()
        {
            IHandleUser users = new UserUtility();
            return users.GetAll();
        }

        // GET: api/Users/5
       [EnableCors("AnotherPolicy")]
        [HttpGet("{id}", Name = "GetUsers")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Users
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void Post([FromBody] User user)
        {
            IHandleUser users = new UserUtility();
            users.Create(user);
        }

        // PUT: api/Users/5
       [EnableCors("AnotherPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Users/5
        [EnableCors("AnotherPolicy")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }
    }
}
