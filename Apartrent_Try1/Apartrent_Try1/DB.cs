using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Apartrent_Try1
{
    public class DB
    {
        public static string CONN_STRING;


        public static class UsersDB
        {
            public static Users Login(Users user)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();

                    if (ValidateUser(user.UserName, user.Password, conn))
                    {
                        UpdateUserLastLogin(conn, user);
                        return GetUserProfile(user.UserName);
                    }

                    return null;
                }
            }

            public static bool SignUp(Users user)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT UserName From Users WHERE UserName=@UserName", conn))
                    {
                        cmd.Add("@UserName", user.UserName);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                return false;
                            }
                        }
                        cmd.CommandText = "INSERT INTO Users(UserName,Password,Gender,[Address],PhoneNumber,Email,FirstName,LastName,LastLogin,LastOrder,CountryID,Role) VALUES(@UserName,@Password,@Gender,@Address,@PhoneNumber,@Email,@FirstName,@LastName,@LastLogin,@LastOrder,@CountryID,@Role)";
                        cmd.Add("@Password", user.Password);
                        cmd.Add("@Gender", user.Gender);
                        cmd.Add("@Address", user.Address);
                        cmd.Add("@PhoneNumber", user.PhoneNumber);
                        cmd.Add("@Email", user.Email);
                        cmd.Add("@FirstName", user.FirstName);
                        cmd.Add("@LastName", user.LastName);
                        cmd.Add("@LastLogin", user.LastLogin);
                        cmd.Add("@LastOrder", user.LastOrder);
                        cmd.Add("@CountryID", user.CountryID);
                        cmd.Add("@Role", 0);
                        return cmd.ExecuteNonQuery() == 1;
                    }


                }
            }

            public static bool DeleteUser(Users user)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();
                    if (ValidateUser(user.UserName, user.Password, conn))
                    {
                        using (SqlCommand cmd = new SqlCommand("DELETE FROM Users WHERE UserName=@UserName", conn))
                        {
                            cmd.Add("@UserName", user.UserName);
                            return cmd.ExecuteNonQuery() == 1;
                        }
                    }
                    return false;
                }
            }

            public static bool EditUser(Users user)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();

                    using (SqlCommand cmd = new SqlCommand("UPDATE Users SET  Gender=@Gender,[Address]=@Address,PhoneNumber=@PhoneNumber,Email=@Email,FirstName=@FirstName,LastName=@LastName,CountryID=@CountryID WHERE UserName=@UserName", conn))
                    {
                        cmd.Add("@UserName", user.UserName);
                        cmd.Add("@Gender", user.Gender);
                        cmd.Add("@Address", user.Address);
                        cmd.Add("@PhoneNumber", user.PhoneNumber);
                        cmd.Add("@Email", user.Email);
                        cmd.Add("@FirstName", user.FirstName);
                        cmd.Add("@LastName", user.LastName);
                        cmd.Add("@LastLogin", user.LastLogin);
                        cmd.Add("@LastOrder", user.LastOrder);
                        cmd.Add("@CountryID", user.CountryID);
                        return cmd.ExecuteNonQuery() == 1;
                    }



                }
            }

            public static bool ValidateUser(string userName, string password, SqlConnection conn)
            {
                using (SqlCommand cmd = new SqlCommand("SELECT LastLogin FROM Users WHERE UserName=@UserName AND Password=@Password", conn))
                {
                    cmd.Add("@UserName", userName);
                    cmd.Add("@Password", password);
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        if (dr.Read())
                        {
                            return true;
                        }
                    }

                    return false;

                }
            }

            public static bool ValidateRenter(string userName,string password,SqlConnection conn)
            {
                using (SqlCommand cmd = new SqlCommand("SELECT Role FROM Users WHERE UserName=@UserName AND Password=@Password", conn))
                {
                    cmd.Add("@UserName", userName);
                    cmd.Add("@Password", password);
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        dr.Read();
                        if (dr.GetInt32(0) == 1 )
                        {
                            return true;
                        }
                    }

                    return false;

                }
            }

            public static void UpdateUserLastLogin(SqlConnection conn, Users user)
            {
                using (SqlCommand cmd = new SqlCommand("UPDATE Users SET LastLogin=@LastLogin WHERE UserName=@UserName AND Password=@Password", conn))
                {
                    cmd.Add("@LastLogin", DateTime.Now.Ticks);
                    cmd.Add("@UserName", user.UserName);
                    cmd.Add("@Password", user.Password);
                    cmd.ExecuteNonQuery();
                }
            }

            public static Users GetUserProfile(string userName)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT Gender,[Address],PhoneNumber,Email,FirstName,LastName,Users.CountryID AS CountryID,CountryName,Role FROM Users INNER JOIN Countries ON Users.CountryID=Countries.CountryID WHERE UserName=@UserName", conn))
                    {
                        cmd.Add("@UserName", userName);
                        Users userDetails;
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            dr.Read();
                            userDetails = new Users()
                            {
                                UserName = userName,
                                
                                Gender = dr.GetBoolean(0),
                                Address = dr.GetString(1),
                                PhoneNumber = dr.GetString(2),
                                Email = dr.GetString(3),
                                FirstName = dr.GetString(4),
                                LastName = dr.GetString(5),
                                CountryID = dr.GetInt32(6),
                                CountryName = dr.GetString(7),
                                Role = dr.GetInt32(8)
                            };
                            if (userDetails.Role == 0)
                                return userDetails;


                        }
                        if (userDetails.Role == 1)
                        {

                            cmd.CommandText = "SELECT ApartmentID,Apartment.FeaturesID AS FeaturesID,NumberOfBedRooms,QueenSizeBed,DoubleBed,SingleBed,SofaBed,Apartment.CountryID AS CountryID,CountryName,Apartment.CategoryID AS CategoryID,ApartmentType,[Address],PricePerDay,AvailableFromDate,AvailableToDate,[Description] FROM Apartment INNER JOIN ApartmentFeatures ON Apartment.FeaturesID = ApartmentFeatures.FeaturesID INNER JOIN Countries ON Apartment.CountryID = Countries.CountryID INNER JOIN ApartmentCategories ON Apartment.CategoryID = ApartmentCategories.CategoryID WHERE RenterUserName=@RenterUserName";
                            cmd.Add("@RenterUserName", userName);
                            using (SqlDataReader dr = cmd.ExecuteReader())
                            {
                                List<Apartment> temp = new List<Apartment>();
                                while (dr.Read())
                                {


                                    Apartment apartment = new Apartment()
                                    {
                                        ApartmentID = dr.GetInt32(0),
                                        FeaturesID = dr.GetInt32(1),
                                        NumberOfBedrooms = dr.GetInt32(2),
                                        QueenSizeBed = dr.GetInt32(3),
                                        DoubleBed = dr.GetInt32(4),
                                        SingleBed = dr.GetInt32(5),
                                        SofaBed = dr.GetInt32(6),
                                        CountryID = dr.GetInt32(7),
                                        CountryName = dr.GetString(8),
                                        CategoryID = dr.GetInt32(9),
                                        ApartmentType = dr.GetString(10),
                                        Address = dr.GetString(11),
                                        PricePerDay = dr.GetDouble(12),
                                        FromDate =new DateTime(dr.GetInt64(13)),
                                        ToDate =new DateTime(dr.GetInt64(14)),
                                        Description = dr.GetString(15)
                                    };
                                    temp.Add(apartment);
                                }
                                userDetails.RenterApartments = temp;
                                return userDetails;
                            }

                        }
                        return null;
                    }

                }





            }


        }



        public static class RenterDB
        {

            public static bool BecomeRenter(Users renter)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();
                    if (!UsersDB.ValidateUser(renter.UserName, renter.Password, conn))
                    {
                        return false;
                    }
                    using (SqlCommand cmd = new SqlCommand("UPDATE Users SET Role=@Role WHERE UserName=@RenterUserName AND Password=@Password", conn))
                    {
                        cmd.Add("@RenterUserName", renter.UserName);
                        cmd.Add("@Password", renter.Password);
                        cmd.Add("@Role", Role.Renter);
                        return cmd.ExecuteNonQuery() == 1;
                    }
                }
            }

            public static bool DeleteRenterStatus(Users renter)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING)) //need to delete apartments too
                {
                    conn.Open();
                    if (UsersDB.ValidateRenter(renter.UserName, renter.Password, conn))
                    {
                        using (SqlCommand cmd = new SqlCommand("DELETE FROM Users WHERE UserName=@RenterUserName AND Role=1", conn))
                        {
                            cmd.Add("@RenterUserName", renter.UserName);
                            return cmd.ExecuteNonQuery() == 1;
                        }
                    }
                    return false;
                }
            }





        }



        public static class ApartmentDB
        {
            public static List<Apartment> GetApartmentsForLocation(int countryID, int numberOfGuests, DateTime fromDate, DateTime toDate) // view Outside Of Page (After the search before choosing the apartment)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT ApartmentID,RenterUserName,Apartment.FeaturesID AS FeaturesID,NumberOfBedRooms,QueenSizeBed,DoubleBed,SingleBed,SofaBed,Apartment.CategoryID AS CategoryID,ApartmentType,[Address],PricePerDay,AvailableFromDate,AvailableToDate,Apartment.[Description] FROM Apartment INNER JOIN ApartmentFeatures ON Apartment.FeaturesID=ApartmentFeatures.FeaturesID INNER JOIN ApartmentCategories ON Apartment.CategoryID=ApartmentCategories.CategoryID WHERE CountryID=@CountryID AND NumberOfGuests >= @NumberOfGuests AND AvailableFromDate<= @AvailableFromDate AND AvailableToDate >= @AvailableToDate", conn))
                    {
                        List<Apartment> apartments = new List<Apartment>();
                        cmd.Add("@CountryID", countryID);
                        cmd.Add("@NumberOfGuests", numberOfGuests);
                        cmd.Add("@AvailableFromDate", fromDate.Ticks);
                        cmd.Add("@AvailableToDate", toDate.Ticks);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Apartment apartment = new Apartment()
                                {
                                    ApartmentID = reader.GetInt32(0),
                                    RenterUserName = reader.GetString(1),
                                    FeaturesID = reader.GetInt32(2),
                                    NumberOfBedrooms = reader.GetInt32(3),
                                    QueenSizeBed = reader.GetInt32(4),
                                    DoubleBed = reader.GetInt32(5),
                                    SingleBed = reader.GetInt32(6),
                                    SofaBed = reader.GetInt32(7),
                                    CategoryID = reader.GetInt32(8),
                                    ApartmentType = reader.GetString(9),
                                    Address = reader.GetString(10),
                                    PricePerDay = reader.GetDouble(11),
                                    FromDate = new DateTime(reader.GetInt64(12)),
                                    ToDate =new DateTime(reader.GetInt64(13)),
                                    Description = reader.GetString(14),
                                };
                                
                                apartments.Add(apartment);
                            }
                            return apartments;

                        }
                    }
                }
            }

            public static int AddApartment(Apartment apartment, string userName, string password)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();
                    if (UsersDB.ValidateRenter(userName, password, conn))
                        apartment.FeaturesID = AddApartmentFeature(apartment, conn);

                    using (SqlCommand cmd = new SqlCommand("INSERT INTO Apartment(RenterUserName,FeaturesID,CountryID,CategoryID,[Address],PricePerDay,AvailableFromDate,AvailableToDate,[Apartment].Description)output INSERTED.ApartmentID VALUES(@RenterUserName,@FeaturesID,@CountryID,@CategoryID,@Address,@PricePerDay,@AvailableFromDate,@AvailableToDate,@Description)", conn))
                    {
                        cmd.Add("@RenterUserName", userName);
                        cmd.Add("@FeaturesID", apartment.FeaturesID);
                        cmd.Add("@CountryID", apartment.CountryID);
                        cmd.Add("@CategoryID", apartment.CategoryID);
                        cmd.Add("@Address", apartment.Address);
                        cmd.Add("@PricePerDay", apartment.PricePerDay);
                        cmd.Add("@AvailableFromDate", apartment.FromDate.Ticks);
                        cmd.Add("@AvailableToDate", apartment.ToDate.Ticks);
                        cmd.Add("@Description", apartment.Description);
                        int apartmentID = (int)cmd.ExecuteScalar();
                        return apartmentID;
                    }
                }
            }

            public static int AddApartmentFeature(Apartment features, SqlConnection conn)
            {
                using (SqlCommand cmd = new SqlCommand("INSERT INTO ApartmentFeatures(NumberOfGuests,Shower,Bath,WIFI,TV,Cables,Satellite,Pets,NumberOfBedRooms,LivingRoom,BedRoomDescription,LivingRoomDescription,QueenSizeBed,DoubleBed,SingleBed,SofaBed,BedsDescription) output INSERTED.FeaturesID VALUES(@NumberOfGuests,@Shower,@Bath,@WIFI,@TV,@Cables,@Satellite,@Pets,@NumberOfBedRooms,@LivingRoom,@BedRoomDescription,@LivingRoomDescription,@QueenSizeBed,@DoubleBed,@SingleBed,@SofaBed,@BedsDescription)", conn))
                {
                    cmd.Add("@NumberOfGuests", features.NumberOfGuests);
                    cmd.Add("@Shower", features.Shower);
                    cmd.Add("@Bath", features.Bath);
                    cmd.Add("@WIFI", features.WIFI);
                    cmd.Add("@TV", features.TV);
                    cmd.Add("@Cables", features.Cables);
                    cmd.Add("@Satellite", features.Satellite);
                    cmd.Add("@Pets", features.Pets);
                    cmd.Add("@NumberOfBedRooms", features.NumberOfBedRooms);
                    cmd.Add("@LivingRoom", features.LivingRoom);
                    cmd.Add("@BedRoomDescription", features.BedRoomDescription);
                    cmd.Add("@LivingRoomDescription", features.LivingRoomDescription);
                    cmd.Add("@QueenSizeBed", features.QueenSizeBed);
                    cmd.Add("@DoubleBed", features.DoubleBed);
                    cmd.Add("@SingleBed", features.SingleBed);
                    cmd.Add("@SofaBed", features.SofaBed);
                    cmd.Add("@BedsDescription", features.BedsDescription);
                    int featuresID = (int)cmd.ExecuteScalar();
                    return featuresID;
                }
            }

            public static bool DeleteApartment(int apartmentID, string userName, string password)
            {

                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    if (!UsersDB.ValidateRenter(userName, password, conn))
                        return false;
                    int featureID;
                    using (SqlCommand cmd = new SqlCommand("SELECT FeaturesID FROM Apartments WHERE ApartmentID=@ApartmentID AND RenterUserName=@UserName", conn))
                    {
                        cmd.Add("@ApartmentID", apartmentID);
                        cmd.Add("@UserName", userName);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {

                            if (reader.Read())
                                featureID = reader.GetInt32(0);
                            else
                                return false;
                        }
                        cmd.CommandText = "DELETE FROM Apartments WHERE ApartmentID=@ApartmentID";
                        cmd.CommandText = "DELETE FROM ApartmentsFeature WHERE FeaturesID=@FeaturesID";

                        return cmd.ExecuteNonQuery() == 2;
                    }
                }
            }

            public static bool EditApartment(Apartment apartment, bool editFeature, string userName, string password)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();
                    if (!UsersDB.ValidateRenter(userName, password, conn))
                    {
                        return false;
                    }
                    using (SqlCommand cmd = new SqlCommand("UPDATE Apartment SET CountryID=@CountryID,CategoryID=@CategoryID,[Address]=@Address,PricePerDay=@PricePerDay,AvailableFromDate=@AvailableFromDate,AvailableToDate=@AvailableToDate,Description=@Description WHERE ApartmentID=@ApartmentID AND RenterUserName=@UserName"))
                    {
                        cmd.Add("@UserName", userName);
                        cmd.Add("@CountryID", apartment.CountryID);
                        cmd.Add("@CategoryID", apartment.CategoryID);
                        cmd.Add("@Address", apartment.Address);
                        cmd.Add("@PricePerDay", apartment.PricePerDay);
                        cmd.Add("@AvailabeFromDate", apartment.FromDate.Ticks);
                        cmd.Add("@AvailableToDate", apartment.ToDate.Ticks);
                        cmd.Add("@Description", apartment.Description);
                        cmd.Add("@ApartmentID", apartment.ApartmentID);
                        if (editFeature)
                        {
                            cmd.CommandText = "Update ApartmentFeatures SET NumberOfGuests=@NumberOfGuests,Shower=@Shower,Bath=@Bath,WIFI=@WIFI,TV=@TV,Cables=@Cables,Satellite=@Satellite,Pets=@Pets,NumberOfBedRooms=@NumberOfBedRooms,LivingRoom=@LivingRoom,BedRoomDescription=@BedRoomDescription,LivingRoomDescription=@LivingRoomDescription,QueenSizeBed=@QueenSizeBed,DoubleBed=@DoubleBed,SingleBed=@SingleBed,SofaBed=@SofaBed,BedsDescription=@BedsDescription WHERE FeaturesID=@FeaturesID";
                            cmd.Add("@FeaturesID", apartment.FeaturesID);
                            cmd.Add("@NumberOfGuests", apartment.NumberOfGuests);
                            cmd.Add("@Shower", apartment.Shower);
                            cmd.Add("@Bath", apartment.Bath);
                            cmd.Add("@WIFI", apartment.WIFI);
                            cmd.Add("@TV", apartment.TV);
                            cmd.Add("@Cables", apartment.Cables);
                            cmd.Add("@Satellite", apartment.Satellite);
                            cmd.Add("@Pets", apartment.Pets);
                            cmd.Add("@NumberOfBedRooms", apartment.NumberOfBedrooms);
                            cmd.Add("@LivingRoom", apartment.LivingRoom);
                            cmd.Add("@BedRoomDescription", apartment.BedRoomDescription);
                            cmd.Add("@LivingRoomDescription", apartment.LivingRoomDescription);
                            cmd.Add("@QueenSizeBed", apartment.QueenSizeBed);
                            cmd.Add("@DoubleBed", apartment.DoubleBed);
                            cmd.Add("@SingleBed", apartment.SingleBed);
                            cmd.Add("@SofaBed", apartment.SofaBed);
                            cmd.Add("@BedsDescription", apartment.BedsDescription);
                            return cmd.ExecuteNonQuery() == 1;
                        }
                        return cmd.ExecuteNonQuery() == 1;


                    }
                }
            }

            public static Apartment GetApartment(int apartmentID)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();
                    Apartment apartment = new Apartment();
                    using (SqlCommand cmd = new SqlCommand("SELECT RenterUserName,FeaturesID,CountryID,CategoryID,[Address],PricePerDay,AvailableFromDate,AvailableToDate,Description FROM Apartment WHERE ApartmentID=@ApartmentID", conn))
                    {
                        cmd.Add("@ApartmentID", apartment);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                apartment.RenterUserName = reader.GetString(0);
                                apartment.FeaturesID = reader.GetInt32(1);
                                apartment.CountryID = reader.GetInt32(2);//can be localy
                                apartment.CategoryID = reader.GetInt32(3);//can be locally
                                apartment.Address = reader.GetString(4);
                                apartment.PricePerDay = reader.GetFloat(5);
                                apartment.FromDate =new DateTime(reader.GetInt64(6));
                                apartment.ToDate =new DateTime(reader.GetInt64(7));
                                apartment.Description = reader.GetString(8);
                            }

                        }
                        cmd.CommandText = "SELECT NumberOfGuests,Shower,Bath,WIFI,TV,Cables,Satellite,Pets,NumberOfBedRooms,LivingRoom,BedRoomDescription,LivingRoomDescription,QueenSizeBed,DoubleBed,SingleBed,SofaBed,BedsDescription WHERE FeaturesID=@FeaturesID";
                        cmd.Add("@FeaturesID", apartment.FeaturesID);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                apartment.NumberOfGuests = reader.GetInt32(0);
                                apartment.Shower = reader.GetBoolean(1);
                                apartment.Bath = reader.GetBoolean(2);
                                apartment.WIFI = reader.GetBoolean(3);
                                apartment.TV = reader.GetBoolean(4);
                                apartment.Cables = reader.GetBoolean(5);
                                apartment.Satellite = reader.GetBoolean(6);
                                apartment.Pets = reader.GetBoolean(7);
                                apartment.NumberOfBedRooms = reader.GetInt32(8);
                                apartment.LivingRoom = reader.GetBoolean(9);
                                apartment.BedRoomDescription = reader.GetString(10);
                                apartment.LivingRoomDescription = reader.GetString(11);
                                apartment.QueenSizeBed = reader.GetInt32(12);
                                apartment.DoubleBed = reader.GetInt32(13);
                                apartment.SingleBed = reader.GetInt32(14);
                                apartment.SofaBed = reader.GetInt32(15);
                                apartment.BedsDescription = reader.GetString(16);
                            }
                        }
                        return apartment;
                    }
                }
            }

            public static List<ApartmentCategories> GetCategories()
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    List<ApartmentCategories> categories = new List<ApartmentCategories>();
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT CategoryID,ApartmentType FROM ApartmentCategories", conn))
                    {
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {

                            while (dr.Read())
                            {
                                ApartmentCategories category = new ApartmentCategories()
                                {
                                    CategoryID = dr.GetInt32(0),
                                    ApartmentType = dr.GetString(1)
                                };
                                categories.Add(category);

                            }

                            return categories;
                        }
                    }
                }
            } //will be added in js when clicking on add new apartment


        }



        public static class CountriesDB
        {
            public static List<Countries> GetCountries()
            {
                List<Countries> countries = new List<Countries>();
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT CountryID,CountryName FROM Countries", conn))
                    {
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Countries country = new Countries()
                                {
                                    CountryID = reader.GetInt32(0),
                                    CountryName = reader.GetString(1)
                                };
                                countries.Add(country);
                            }
                            return countries;
                        }
                    }
                }
            }
        }

    }

    static class SqlCommandExtensions
    {
        public static void Add(this SqlCommand cmd, string param, object value)
        {
            cmd.Parameters.AddWithValue(param, value == null ? DBNull.Value : value);
        }
    }
}
