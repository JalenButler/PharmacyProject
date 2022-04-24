using api.Interfaces;
using System.Collections.Generic;
using api;
using api.Models;
using MySql.Data.MySqlClient;

namespace api.Database
{
    public class AppointmentUtility: IHandleAppointment
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
            con.Close();
            return AppointmentList;
        } 


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


         public Appointment GetOne(int ID)
         {
            Appointment appointment = new Appointment();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"Select * from appointment where apptId= " + ID;

            using var cmd = new MySqlCommand(stm, con);
            MySqlDataReader reader = cmd.ExecuteReader();
            while(rdr.Read())
            {
                
                appointment.apptId = reader.GetInt32(0);
                appointment.apptReason = reader.GetString(1);
            } 
            con.Close();
            return appointment;

         }



    }
}