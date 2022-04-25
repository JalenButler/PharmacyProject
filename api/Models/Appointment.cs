using System;
namespace api.Models
{
 public class Appointment
{
    public string ApptReason {get; set;}
    public Availability Slot {get; set;}
    public int ApptID {get; set;}
    public DateTime startDateTime {get; set;}
    public DateTime endDateTime {get; set;}
    public int custID {get; set;}
    public int userId{get; set;}
}


}