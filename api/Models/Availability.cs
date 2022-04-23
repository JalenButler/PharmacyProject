using System;
namespace api.Models
{
    public class Availability
    {
        public int availID {get; set;}
        public int userId {get; set;}
        public DateTime startDateTime {get; set;}
        public DateTime endDateTime {get; set;}
    }
}