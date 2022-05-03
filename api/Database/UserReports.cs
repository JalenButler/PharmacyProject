using api.Interfaces;
using System.Collections.Generic;
using api;
using api.Models;
using MySql.Data.MySqlClient;
namespace api.Database
{
    public class UserReports
    {
          public List<UsersReporting> GetAll()
        {
            List<UsersReporting>  userReportList = new List<UsersReporting>();
            

            ConnectionString myConnection = new ConnectionString();

            string cs = myConnection.cs;

            MySqlConnection con = new MySqlConnection(cs);
            con.Open();

            string stm = @"select count(*) as Count, apptReason, year(endDateTime) as Year
                            from appointment
                            group by apptReason, year(endDateTime)";
            using var cmd = new MySqlCommand(stm, con);

            using MySqlDataReader rdr = cmd.ExecuteReader();

            while(rdr.Read())
            {
                
                userReportList.Add(new UsersReporting()
                {Count = rdr.GetInt32(0), 
                apptReason= rdr.GetString(1),
                Year = rdr.GetInt32(2)});
            } 
            con.Close();
            return userReportList;
        } 
    }
}