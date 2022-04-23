using api.Models;
using System.Collections.Generic;

namespace api.Interfaces
{
    public interface IHandleAvailability
    {
         public void Create(Availability avlb);
         public void Delete(int id);
         public List<Availability> GetAll();
         public Availability GetOne(int id);
         public void Update(Availability avlb);
    }
}