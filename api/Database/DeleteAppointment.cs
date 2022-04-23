using PharmacyProject.Interfaces;
using PharmacyProject.Models;
using MySql.Data.MySqlClient;
using System;
namespace api.Database
{
    public class DeleteAppointment: IHandleAppointment
    {
        public void Delete(int id)
        {


            ConnectionString myConnection = new ConnectionString();

            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"DELETE from appointment where apptId =" + apptId;

            using var cmd = new MySqlCommand(stm, con);

            cmd.ExecuteNonQuery();

            con.Close();
        }
    }
}