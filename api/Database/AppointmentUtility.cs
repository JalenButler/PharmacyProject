using api.Interfaces;
using System.Collections.Generic;
using api;
using api.Models;
using MySql.Data.MySqlClient;
using System;

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

            
            cmd.Parameters.AddWithValue("@apptReason", newappointment.ApptReason);
            
            
            cmd.ExecuteNonQuery();

            con.Close();

        }

          public void Delete(int id)
        {


            ConnectionString myConnection = new ConnectionString();

            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"DELETE from appointment where apptId =" + id;

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

            string stm = @"SELECT * from appointment";
            using var cmd = new MySqlCommand(stm, con);

            using MySqlDataReader rdr = cmd.ExecuteReader();

            while(rdr.Read())
            {
                
                AppointmentList.Add(new Appointment()
                {ApptID = rdr.GetInt32(0), 
                ApptReason = rdr.GetString(1),
                startDateTime = DateTime.Parse(rdr.GetString(2)),
                endDateTime = DateTime.Parse(rdr.GetString(3)),
                custID = rdr.GetInt32(4),
                userId = rdr.GetInt32(5)
                
                });
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

           

           


            string stm = @"UPDATE appointment set apptReason = '" + appointment.ApptReason  + "' WHERE id = " + appointment.ApptID;

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
            while(reader.Read())
            {
                
                appointment.ApptID = reader.GetInt32(0);
                appointment.ApptReason = reader.GetString(1);
            } 
            con.Close();
            return appointment;

         }



    }
}