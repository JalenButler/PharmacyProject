using api.Models;
using System.Collections.Generic;

namespace api.Interfaces
{
    public interface IHandleUser
    {
         public void Create(User user);
         public void Delete(int id);
         public List<User> GetAll();
         public List<UsersReporting> GetOne(int id);
         public void Update(User user);
    }
}