using PharmacyProject.Interfaces;
using PharmacyProject.Models;
using MySql.Data.MySqlClient;
using System;
namespace api.Database
{
    public class UpdateAppointment: IHandleAppointment
    {
        public void Update(Appointment appointment)
        {
            
            
            ConnectionString myConnection = new ConnectionString();

            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

           

           


            string stm = @"UPDATE appointment set apptReason = '" + Appointment.ApptReason  + "' WHERE id = " + Appointment.ApptID;

             using var cmd = new MySqlCommand(stm, con);

             cmd.ExecuteNonQuery();

            con.Close();
        }
    }
}