using PharmacyProject.Interfaces;
using PharmacyProject.Models;
using MySql.Data.MySqlClient;
using System;
namespace api.Database
{
    public class ReadAppointment : IHandleAppointment
    {
         public List<Appointment> GetAll()
        {
             List<Appointment> AppointmentList = new List<Appointment>();
            

            ConnectionString myConnection = new ConnectionString();

            string cs = myConnection.cs;

            MySqlConnection con = new MySqlConnection(cs);
            con.Open();

            string stm = @"SELECT * from appointment order by datetime desc";
            using var cmd = new MySqlCommand(stm, con);

            using MySqlDataReader rdr = cmd.ExecuteReader();

            while(rdr.Read())
            {
                Appointment temp = new Appointment(){ApptID = rdr.GetInt32(0), ApptReason = rdr.GetString(1)};
                AppointmentList.Add(temp);
            } 

            return AppointmentList;
        }   
    }
}