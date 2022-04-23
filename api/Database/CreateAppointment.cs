using PharmacyProject.Interfaces;
using PharmacyProject.Models;
using MySql.Data.MySqlClient;
using System;

namespace api.Database
{
    public class CreateAppointment: IHandleAppointment
    {
         public void Create(Appointment newappointment)
        {
            
            ConnectionString myConnection = new ConnectionString();

            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"INSERT INTO appointment(apptReason) Values(@apptReason)";

            using var cmd = new MySqlCommand(stm, con);

            
            cmd.Parameters.AddWithValue("@apptReason",appointment.ApptReason);
            
            
            cmd.ExecuteNonQuery();

            con.Close();

        }
    }
}