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
    public class AppointmentController : ControllerBase
    {
        // GET: api/Appointment
        [EnableCors("AnotherPolicy")]
        [HttpGet]
        public List<Appointment> Get()
        {
            IHandleAppointment appointment = new AppointmentUtility();
            return appointment.GetAll();
        }

        // GET: api/Appointment/5
        [EnableCors("AnotherPolicy")]
        [HttpGet("{id}", Name = "GetAppointment")]
        public Appointment Get(int id)
        {
            IHandleAppointment getAppointment = new AppointmentUtility();
            return getAppointment.GetOne(id);
        }

        // POST: api/Appointment
       
       [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void Post([FromBody] Appointment value)
        {
            IHandleAppointment postAppointment = new AppointmentUtility();
            postAppointment.Create(value);
        }

        // PUT: api/Appointment/5
       
       [EnableCors("AnotherPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Appointment value)
        {
            IHandleAppointment updateAppointment = new AppointmentUtility();
            updateAppointment.Update(value);
        }

        // DELETE: api/Appointment/5
        [EnableCors("AnotherPolicy")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            IHandleAppointment deleteAppointment = new AppointmentUtility();
            getAppointment.Delete(id);
        }
    }
}
