using System;
namespace api.Models
{
    public class User
    {
        public int UserId {get; set;}
        public string UserName {get; set;}
        public string UserPassword {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string UserGender {get; set;}
        public string userBirthdate {get; set;}
        public int UserType {get; set;}
    }
}