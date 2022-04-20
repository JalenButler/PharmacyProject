using api.Models;
using System.Collections.Generic;

namespace api.Interfaces
{
    public interface IHandleAppointment
    {
         public void Create(Appointment appt);
         public void Delete(int id);
         public List<Appointment> GetAll();
         public Appointment GetOne();
         public void Update(Appointment appt);
    }
}