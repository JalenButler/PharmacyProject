namespace PharmacyProject
{
    public class ConnectionString
    {
        public string cs {get; set;}


        public ConnectionString()
        {
            string server = "bv2rebwf6zzsv341.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "vooob59zvx9agxti";
            string port = "3306";
            string userName = "dosunuqu63juknnq";
            string password = "	eznj72x0oc6po91n";


            cs = $@"server = {server};user={userName};database={database};port={port};password={password};";
        }
    }
}