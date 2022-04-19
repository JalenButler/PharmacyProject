using System;
namespace api.Models
{
    public class User
    {
        public int Id {get; set;}
        public string UserName {get; set;}
        public string Password {get; set;}
        public string Name {get; set;}
        public string Gender {get; set;}
        public DateTime BirthDate {get; set;}
        public int UserType {get; set;}
        public Appointment NextAppt {get; set;}
    }
}