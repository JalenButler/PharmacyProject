using api.Interfaces;
using System.Collections.Generic;
using api;
using api.Models;
using MySql.Data.MySqlClient;
namespace api.Database
{
    public class AvailabilityUtility: IHandleAvailability
    {
         public void Create(Availability avlb)
         {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"INSERT INTO availability(startDateTime, endDateTime, userId) VALUES(@startDateTime, @endDateTime, @userID)";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@startDateTime", avlb.startDateTime);
            cmd.Parameters.AddWithValue("@endDateTime", avlb.endDateTime);
            cmd.Parameters.AddWithValue("@userID", avlb.userId);
 
            cmd.Prepare();

            cmd.ExecuteNonQuery();
            
        }

         
         public void Delete(int id)
         {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();
            
            string stm = @"DELETE FROM availability WHERE availID= " + id;
            using var cmd = new MySqlCommand(stm, con);

            cmd.ExecuteNonQuery();
         }

         public List<Availability> GetAll()
         {
        
            List<Availability> available = new List<Availability>();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"Select * from availability";

            using var cmd = new MySqlCommand(stm, con);
            MySqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                available.Add(new Availability()
                {
                    startDateTime = reader.GetDateTime(0),
                    endDateTime = reader.GetDateTime(1),
                    userId = reader.GetInt32(2),
                    availID = reader.GetInt32(3)
                });
            }
            con.Close();
            return available;
         }
         public Availability GetOne(int ID)
         {
            Availability available = new Availability();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"Select * from availability where availID= " + ID;

            using var cmd = new MySqlCommand(stm, con);
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                    available.startDateTime = reader.GetDateTime(0);
                    available.endDateTime = reader.GetDateTime(1);
                    available.userId = reader.GetInt32(2);
                    available.availID = reader.GetInt32(3);
            }
            return available;

         }
         public void Update(Availability avlb)
         {
            // ConnectionString myConnection = new ConnectionString();
            // string cs = myConnection.cs;

            // using var con = new MySqlConnection(cs);
            // con.Open();

            // string stm = @"UPDATE availability
            // SET SongTitle = @SongTitle, Deleted = @SongDeleted, Favorited = @Favorited WHERE id = @ID";

            // using var cmd = new MySqlCommand(stm, con);

            // cmd.Parameters.AddWithValue("@SongTitle", song.SongTitle);
            // cmd.Parameters.AddWithValue("@SongDeleted", song.Deleted);
            // cmd.Parameters.AddWithValue("@Favorited", song.Favorited);
            // cmd.Parameters.AddWithValue("@id", song.ID);

            // cmd.Prepare();

            // cmd.ExecuteNonQuery(); 
         }
    }
}