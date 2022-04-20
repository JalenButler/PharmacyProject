using System;
namespace api.Models
{
    public class Availability
    {
        public int Id {get; set;}
        public DateTime Start {get; set;}
        public DateTime End {get; set;}
        public bool IsBooked {get; set;}
    }
}