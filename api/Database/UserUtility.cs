using api.Interfaces;
using System.Collections.Generic;
using api;
using api.Models;
using MySql.Data.MySqlClient;
namespace api.Database
{
    public class UserUtility: IHandleUser
    {
        public void Create(User user){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"INSERT INTO users(userGender, userBirthdate, userType, userName, userPassword, FirstName, LastName) VALUES(@userGender, @userBirthdate, @usertype, @userName, @userPassword, @FirstName, @LastName)";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@userGender", user.UserGender);
            cmd.Parameters.AddWithValue("@userBirthdate", user.userBirthdate);
            cmd.Parameters.AddWithValue("@usertype", user.UserType);
            cmd.Parameters.AddWithValue("@userName", user.UserName);
            cmd.Parameters.AddWithValue("@userPassword", user.UserPassword);
            cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
            cmd.Parameters.AddWithValue("@LastName", user.LastName);


            cmd.Prepare();

            cmd.ExecuteNonQuery();
        }
         public void Delete(int id){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();
            
            string stm = @"DELETE FROM users WHERE userId= " + id;
            using var cmd = new MySqlCommand(stm, con);

            cmd.ExecuteNonQuery();
         }
         public List<User> GetAll(){
            List<User> users = new List<User>();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"Select * from users";

            using var cmd = new MySqlCommand(stm, con);
            MySqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                users.Add(new User()
                {
                    UserId = reader.GetInt32(0),
                    UserGender = reader.GetString(1),
                    userBirthdate = reader.GetString(2),
                    UserType = int.Parse(reader.GetString(3)),
                    UserName = reader.GetString(4),
                    UserPassword = reader.GetString(5),
                    FirstName = reader.GetString(6),
                    LastName = reader.GetString(7)
                });
            }
            con.Close();
            return users;
         }
         public List<UsersReporting> GetOne(int id){
             List<UsersReporting> user = new List<UsersReporting>();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"select ifnull(count(*),0) as Count, apptReason, ifnull(year(endDateTime),0) 
                            from appointment
                            where custID = " + id +  " and year(endDateTime) = 2022 group by apptReason";

            using var cmd = new MySqlCommand(stm, con);
            MySqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                user.Add(new UsersReporting()
                {
                Count = rdr.GetInt32(0), 
                apptReason= rdr.GetString(1),
                Year = rdr.GetInt32(2)
                });
            }
            con.Close();
            return user;
         }
         public void Update(User user){

         }

        //  select ifnull(count(*),0) as Count, apptReason, ifnull(year(endDateTime),0)
        //  from appointment
        // where custID = 5 and year(endDateTime) = 2022
        // group by apptReason;
    }
}