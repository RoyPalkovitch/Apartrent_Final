using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;
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

            public static bool ValidateRenter(string userName, string password, SqlConnection conn)
            {
                using (SqlCommand cmd = new SqlCommand("SELECT Role FROM Users WHERE UserName=@UserName AND Password=@Password", conn))
                {
                    cmd.Add("@UserName", userName);
                    cmd.Add("@Password", password);
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        dr.Read();
                        if (dr.GetInt32(0) == 1)
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
                        if (userDetails.Role == (int)Role.Renter)
                        {

                            cmd.CommandText = "SELECT Apartment.ApartmentID AS ApartmentID,CountryID,Apartment.CategoryID as CategoryID,[Address],PricePerDay,AvailableFromDate,AvailableToDate,[Description],NumberOfGuests,Shower,Bath,WIFI,TV,Cables,Satellite,Pets,NumberOfBedRooms,LivingRoom,BedRoomDescription,LivingRoomDescription,QueenSizeBed,DoubleBed,SingleBed,SofaBed,BedsDescription,ApartmentType FROM Apartment INNER JOIN ApartmentFeatures ON Apartment.ApartmentID = ApartmentFeatures.ApartmentID INNER JOIN ApartmentCategories ON Apartment.CategoryID = ApartmentCategories.CategoryID WHERE Apartment.RenterUserName = @UserName";
                            using (SqlDataReader dr = cmd.ExecuteReader())
                            {
                                List<Apartment> temp = new List<Apartment>();
                                while (dr.Read())
                                {
                                    Apartment apartment = new Apartment()
                                    {
                                        ApartmentID = dr.GetInt32(0),
                                        CountryID = dr.GetInt32(1),//can be localy
                                        CategoryID = dr.GetInt32(2),
                                        Address = dr.GetString(3),
                                        PricePerDay = dr.GetDouble(4),
                                        FromDate = new DateTime(dr.GetInt64(5)),
                                        ToDate = new DateTime(dr.GetInt64(6)),
                                        Description = dr.GetString(7),
                                        NumberOfGuests = dr.GetInt32(8),
                                        Shower = dr.GetBoolean(9),
                                        Bath = dr.GetBoolean(10),
                                        WIFI = dr.GetBoolean(11),
                                        TV = dr.GetBoolean(12),
                                        Cables = dr.GetBoolean(13),
                                        Satellite = dr.GetBoolean(14),
                                        Pets = dr.GetBoolean(15),
                                        NumberOfBedRooms = dr.GetInt32(16),
                                        LivingRoom = dr.GetBoolean(17),
                                        BedRoomDescription = dr.GetString(18),
                                        LivingRoomDescription = dr.GetString(19),
                                        QueenSizeBed = dr.GetInt32(20),
                                        DoubleBed = dr.GetInt32(21),
                                        SingleBed = dr.GetInt32(22),
                                        SofaBed = dr.GetInt32(23),
                                        BedsDescription = dr.GetString(24),
                                        ApartmentType = dr.GetString(25)

                                    };
                                    temp.Add(apartment);
                                }
                                userDetails.RenterApartments = temp;

                            }
                            return userDetails;
                        }

                    }
                    return null;
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
                        cmd.Add("@Role", (int)Role.Renter);
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
                        using (SqlCommand cmd = new SqlCommand("UPDATE Users SET Role=@Role WHERE UserName=@RenterUserName", conn))
                        {
                            cmd.Add("@RenterUserName", renter.UserName);
                            if (cmd.ExecuteNonQuery() == 1)
                            {
                                cmd.CommandText = "DELETE FROM Apartment WHERE RenterUserName=@RenterUserName";
                                cmd.Add("@Role", (int)Role.User);

                            }
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
                    using (SqlCommand cmd = new SqlCommand("SELECT Apartment.ApartmentID,RenterUserName,NumberOfBedRooms,QueenSizeBed,DoubleBed,SingleBed,SofaBed,Apartment.CategoryID AS CategoryID,ApartmentType,[Address],PricePerDay,AvailableFromDate,AvailableToDate,Apartment.[Description] FROM Apartment INNER JOIN ApartmentFeatures ON Apartment.ApartmentID=ApartmentFeatures.ApartmentID INNER JOIN ApartmentCategories ON Apartment.CategoryID=ApartmentCategories.CategoryID WHERE Apartment.ApartmentID NOT IN (SELECT Orders.ApartmentID FROM Orders WHERE (Orders.FromDate > @AvailableFromDate OR Orders.ToDate <@AvailableToDate)AND Orders.Approved=1) AND CountryID=@CountryID AND NumberOfGuests >= @NumberOfGuests AND AvailableFromDate<= @AvailableFromDate AND AvailableToDate >= @AvailableToDate", conn))
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
                                    NumberOfBedRooms = reader.GetInt32(2),
                                    QueenSizeBed = reader.GetInt32(3),
                                    DoubleBed = reader.GetInt32(4),
                                    SingleBed = reader.GetInt32(5),
                                    SofaBed = reader.GetInt32(6),
                                    CategoryID = reader.GetInt32(7),
                                    ApartmentType = reader.GetString(8),
                                    Address = reader.GetString(9),
                                    PricePerDay = reader.GetDouble(10),
                                    FromDate = fromDate.Date,
                                    ToDate = toDate.Date,
                                    Description = reader.GetString(13),
                                };
                                apartment.PriceForStaying = (toDate - fromDate).TotalDays > 0 ? (toDate - fromDate).TotalDays * apartment.PricePerDay : apartment.PricePerDay;
                                apartment.TotalNumberOfDays = (toDate - fromDate).TotalDays > 0 ? (toDate - fromDate).TotalDays : 1;
                                apartment.PricePerGuest = apartment.PriceForStaying / apartment.TotalNumberOfDays / numberOfGuests;
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
                    {
                        using (SqlCommand cmd = new SqlCommand("INSERT INTO Apartment(RenterUserName,CountryID,CategoryID,[Address],PricePerDay,AvailableFromDate,AvailableToDate,[Apartment].Description)output INSERTED.ApartmentID VALUES(@RenterUserName,@CountryID,@CategoryID,@Address,@PricePerDay,@AvailableFromDate,@AvailableToDate,@Description)", conn))
                        {
                            cmd.Add("@RenterUserName", userName);
                            cmd.Add("@CountryID", apartment.CountryID);
                            cmd.Add("@CategoryID", apartment.CategoryID);
                            cmd.Add("@Address", apartment.Address);
                            cmd.Add("@PricePerDay", apartment.PricePerDay);
                            cmd.Add("@AvailableFromDate", apartment.FromDate.Ticks);
                            cmd.Add("@AvailableToDate", apartment.ToDate.Ticks);
                            cmd.Add("@Description", apartment.Description);
                            apartment.ApartmentID = (int)cmd.ExecuteScalar();
                            if (AddApartmentFeature(apartment, conn))
                                return apartment.ApartmentID;
                            else
                            {
                                DeleteApartment(apartment.ApartmentID, userName, password);
                                return -1;
                            }
                        }
                    }
                    else
                    {
                        return -1;
                    }
                }
            }

            public static bool AddApartmentFeature(Apartment features, SqlConnection conn)
            {
                using (SqlCommand cmd = new SqlCommand("INSERT INTO ApartmentFeatures(ApartmentID,NumberOfGuests,Shower,Bath,WIFI,TV,Cables,Satellite,Pets,NumberOfBedRooms,LivingRoom,BedRoomDescription,LivingRoomDescription,QueenSizeBed,DoubleBed,SingleBed,SofaBed,BedsDescription)VALUES(@ApartmentID,@NumberOfGuests,@Shower,@Bath,@WIFI,@TV,@Cables,@Satellite,@Pets,@NumberOfBedRooms,@LivingRoom,@BedRoomDescription,@LivingRoomDescription,@QueenSizeBed,@DoubleBed,@SingleBed,@SofaBed,@BedsDescription)", conn))
                {
                    cmd.Add("@ApartmentID", features.ApartmentID);
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
                    return cmd.ExecuteNonQuery() == 1;
                }
            }

            public static bool DeleteApartment(int apartmentID, string userName, string password)
            {

                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();
                    if (!UsersDB.ValidateRenter(userName, password, conn))
                        return false;
                    using (SqlCommand cmd = new SqlCommand("DELETE FROM Apartment WHERE ApartmentID=@ApartmentID", conn))
                    {
                        cmd.Add("@ApartmentID", apartmentID);
                        return cmd.ExecuteNonQuery() == 1;
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
                    using (SqlCommand cmd = new SqlCommand("UPDATE Apartment SET CountryID=@CountryID,CategoryID=@CategoryID,[Address]=@Address,PricePerDay=@PricePerDay,AvailableFromDate=@AvailableFromDate,AvailableToDate=@AvailableToDate,Description=@Description WHERE ApartmentID=@ApartmentID AND RenterUserName=@UserName", conn))
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
                            cmd.CommandText = "Update ApartmentFeatures SET NumberOfGuests=@NumberOfGuests,Shower=@Shower,Bath=@Bath,WIFI=@WIFI,TV=@TV,Cables=@Cables,Satellite=@Satellite,Pets=@Pets,NumberOfBedRooms=@NumberOfBedRooms,LivingRoom=@LivingRoom,BedRoomDescription=@BedRoomDescription,LivingRoomDescription=@LivingRoomDescription,QueenSizeBed=@QueenSizeBed,DoubleBed=@DoubleBed,SingleBed=@SingleBed,SofaBed=@SofaBed,BedsDescription=@BedsDescription WHERE ApartmentID=@ApartmentID";
                            cmd.Add("@NumberOfGuests", apartment.NumberOfGuests);
                            cmd.Add("@Shower", apartment.Shower);
                            cmd.Add("@Bath", apartment.Bath);
                            cmd.Add("@WIFI", apartment.WIFI);
                            cmd.Add("@TV", apartment.TV);
                            cmd.Add("@Cables", apartment.Cables);
                            cmd.Add("@Satellite", apartment.Satellite);
                            cmd.Add("@Pets", apartment.Pets);
                            cmd.Add("@NumberOfBedRooms", apartment.NumberOfBedRooms);
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
                    using (SqlCommand cmd = new SqlCommand("SELECT RenterUserName,Apartment.CountryID,Apartment.CategoryID,Apartment.[Address],PricePerDay,AvailableFromDate,AvailableToDate,[Description],FirstName,LastName,NumberOfGuests,Shower,Bath,WIFI,TV,Cables,Satellite,Pets,NumberOfBedRooms,LivingRoom,BedRoomDescription,LivingRoomDescription,QueenSizeBed,DoubleBed,SingleBed,SofaBed,BedsDescription,ApartmentType FROM Apartment INNER JOIN Users ON Apartment.RenterUserName = Users.UserName INNER JOIN ApartmentFeatures ON Apartment.ApartmentID = ApartmentFeatures.ApartmentID INNER JOIN ApartmentCategories ON Apartment.CategoryID = ApartmentCategories.CategoryID WHERE Apartment.ApartmentID = @ApartmentID", conn))
                    {
                        cmd.Add("@ApartmentID", apartmentID);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                apartment.ApartmentID = apartmentID;
                                apartment.RenterUserName = reader.GetString(0);
                                apartment.CountryID = reader.GetInt32(1);//can be localy
                                apartment.CategoryID = reader.GetInt32(2);
                                apartment.Address = reader.GetString(3);
                                apartment.PricePerDay = reader.GetDouble(4);
                                apartment.FromDate = new DateTime(reader.GetInt64(5));
                                apartment.ToDate = new DateTime(reader.GetInt64(6));
                                apartment.Description = reader.GetString(7);
                                apartment.FirstName = reader.GetString(8);
                                apartment.LastName = reader.GetString(9);
                                apartment.NumberOfGuests = reader.GetInt32(10);
                                apartment.Shower = reader.GetBoolean(11);
                                apartment.Bath = reader.GetBoolean(12);
                                apartment.WIFI = reader.GetBoolean(13);
                                apartment.TV = reader.GetBoolean(14);
                                apartment.Cables = reader.GetBoolean(15);
                                apartment.Satellite = reader.GetBoolean(16);
                                apartment.Pets = reader.GetBoolean(17);
                                apartment.NumberOfBedRooms = reader.GetInt32(18);
                                apartment.LivingRoom = reader.GetBoolean(19);
                                apartment.BedRoomDescription = reader.GetString(20);
                                apartment.LivingRoomDescription = reader.GetString(21);
                                apartment.QueenSizeBed = reader.GetInt32(22);
                                apartment.DoubleBed = reader.GetInt32(23);
                                apartment.SingleBed = reader.GetInt32(24);
                                apartment.SofaBed = reader.GetInt32(25);
                                apartment.BedsDescription = reader.GetString(26);
                                apartment.ApartmentType = reader.GetString(27);
                            }

                        }
                        cmd.CommandText = "SELECT Rating,Description,UserName,ReviewID FROM Reviews WHERE ApartmentID = @ApartmentID";
                        try
                        {
                            using (SqlDataReader reader = cmd.ExecuteReader())
                            {
                                List<Reviews> temp = new List<Reviews>();
                                while (reader.Read())
                                {
                                    Reviews reviews = new Reviews()
                                    {
                                        Rating = reader.GetInt16(0),
                                        Description = reader.GetString(1),
                                        UserName = reader.GetString(2),
                                        ReviewID = reader.GetInt32(3)
                                    };
                                    reviews.ApartmentID = apartmentID;
                                    temp.Add(reviews);

                                }
                                apartment.Reviews = temp;
                            }
                        }
                        catch
                        {

                            apartment.Reviews = null;
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

        public static class ReviewsDB
        {

            public static int NewReview(Reviews reviews, string password)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING)) //NEED FIX!
                {
                    conn.Open();
                    if (!DB.UsersDB.ValidateUser(reviews.UserName, password, conn))
                    {
                        return -1;
                    }
                    using (SqlCommand cmd = new SqlCommand("IF NOT EXISTS (SELECT Apartment.RenterUserName FROM Apartment WHERE Apartment.ApartmentID = @ApartmentID AND Apartment.RenterUserName = @UserName) INSERT INTO Reviews(Rating,[Description],UserName,ApartmentID) output INSERTED.ReviewID VALUES (@Rating,@Description,@UserName,@ApartmentID)", conn))
                    {
                        try
                        {
                            cmd.Add("@Rating", reviews.Rating);
                            cmd.Add("@UserName", reviews.UserName);
                            cmd.Add("@Description", reviews.Description);
                            cmd.Add("@ApartmentID", reviews.ApartmentID);
                            return reviews.ReviewID = (int)cmd.ExecuteScalar();
                        }
                        catch
                        {
                            return -1;
                        }
                    };
                }
            }

            public static bool DeleteReview(Reviews reviews, string password)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();
                    if (!DB.UsersDB.ValidateUser(reviews.UserName, password, conn))
                        return false;
                    using (SqlCommand cmd = new SqlCommand("DELETE FROM Reviews WHERE ReviewID=@ReviewID AND UserName=@UserName AND ApartmentID=@ApartmentID", conn))
                    {
                        cmd.Add("@ReviewID", reviews.ReviewID);
                        cmd.Add("@ApartmentID", reviews.ApartmentID);
                        cmd.Add("@UserName", reviews.UserName);
                        return cmd.ExecuteNonQuery() == 1;
                    }
                }
            }

            public static bool EditReview(Reviews reviews, string password)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();
                    if (!DB.UsersDB.ValidateUser(reviews.UserName, password, conn))
                        return false;
                    using (SqlCommand cmd = new SqlCommand("UPDATE Reviews SET Rating=@Rating,[Description]=@Description WHERE ReviewID=@ReviewID AND UserName=@UserName AND ApartmentID=@ApartmentID", conn))
                    {
                        cmd.Add("@Rating", reviews.Rating);
                        cmd.Add("@Description", reviews.Description);
                        cmd.Add("@ReviewID", reviews.ReviewID);
                        cmd.Add("@ApartmentID", reviews.ApartmentID);
                        cmd.Add("@UserName", reviews.UserName);
                        return cmd.ExecuteNonQuery() == 1;
                    }
                }
            }

            public static List<Reviews> GetUserReviews(string userName, string password)
            {
                using (SqlConnection conn = new SqlConnection(CONN_STRING))
                {
                    conn.Open();
                    if (!UsersDB.ValidateUser(userName, password, conn))
                        return null;
                    using (SqlCommand cmd = new SqlCommand("SELECT ReviewID,ApartmentID,Rating,[Description] FROM Reviews WHERE UserName=@UserName", conn))
                    {
                        List<Reviews> reviews = new List<Reviews>();
                        cmd.Add("@UserName", userName);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Reviews review = new Reviews()
                                {
                                    ReviewID = reader.GetInt32(0),
                                    ApartmentID = reader.GetInt32(1),
                                    Rating = reader.GetInt16(2),
                                    Description = reader.GetString(3)
                                };
                                reviews.Add(review);
                            }
                            return reviews;
                        }
                    }
                }
            }

         

        }

         public static class OrdersDB
    {
        public static bool NewOrder(string password, Orders order)
        {
            using (SqlConnection conn = new SqlConnection(CONN_STRING))
            {
                conn.Open();
                if (!UsersDB.ValidateUser(order.UserName, password, conn))
                    return false;

                double totalDays = (order.ToDate - order.FromDate).TotalDays > 0 ? (order.ToDate - order.FromDate).TotalDays : 1;
                using (SqlCommand cmd = new SqlCommand("IF NOT EXISTS(SELECT Orders.OrderID FROM Orders WHERE (Orders.FromDate BETWEEN @FromDate AND @ToDate) OR (Orders.ToDate BETWEEN @FromDate AND @ToDate) AND Orders.UserName = @UserName AND Orders.ApartmentID = @ApartmentID) INSERT INTO Orders(ApartmentID,RenterUserName,UserName,Price,OrderDate,FromDate,ToDate)VALUES(@ApartmentID,@RenterUserName,@UserName,(SELECT Apartment.PricePerDay * @TotalDays FROM Apartment WHERE Apartment.ApartmentID = @ApartmentID),@OrderDate,@FromDate,@ToDate )", conn))
                {
                    cmd.Add("@UserName", order.UserName);
                    cmd.Add("@RenterUserName", order.RenterUserName);
                    cmd.Add("@ApartmentID", order.ApartmentID);
                    cmd.Add("@TotalDays", totalDays);
                    cmd.Add("@OrderDate", DateTime.Now.Ticks);
                    cmd.Add("@FromDate", order.FromDate.Ticks);
                    cmd.Add("@ToDate", order.ToDate.Ticks);
                    return cmd.ExecuteNonQuery() == 1;
                }
            }
        }

        public static List<Orders> GetUserOrders(string userName, string password)
        {
            using (SqlConnection conn = new SqlConnection(CONN_STRING))
            {
                conn.Open();
                if (!DB.UsersDB.ValidateUser(userName, password, conn))
                    return null;
                using (SqlCommand cmd = new SqlCommand("SELECT ApartmentID,RenterUserName,Price,OrderDate,FromDate,ToDate,Approved,OrderID FROM Orders WHERE UserName=@UserName", conn))
                {
                    cmd.Add("@UserName", userName);
                    List<Orders> orders = new List<Orders>();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Orders order = new Orders()
                            {
                                ApartmentID = reader.GetInt32(0),
                                RenterUserName = reader.GetString(1),
                                Price = reader.GetDouble(2),
                                OrderDate = new DateTime(reader.GetInt64(3)),
                                FromDate = new DateTime(reader.GetInt64(4)),
                                ToDate = new DateTime(reader.GetInt64(5)),
                                Approved = reader.IsDBNull(6) ? null : (bool?)reader.GetBoolean(6),
                                OrderID = reader.GetInt32(7)

                            };

                            orders.Add(order);
                        }
                        return orders;
                    }
                }
            }
        }

        public static List<Orders> GetPendingOrders(string userName, string password)
        {
            using (SqlConnection conn = new SqlConnection(CONN_STRING))
            {
                conn.Open();
                if (!DB.UsersDB.ValidateRenter(userName, password, conn))
                    return null;
                using (SqlCommand cmd = new SqlCommand("SELECT ApartmentID,UserName,Price,OrderDate,FromDate,ToDate,OrderID FROM Orders WHERE RenterUserName=@RenterUserName AND Approved IS NULL", conn))
                {
                    cmd.Add("@RenterUserName", userName);
                    List<Orders> orders = new List<Orders>();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Orders order = new Orders()
                            {
                                ApartmentID = reader.GetInt32(0),
                                UserName = reader.GetString(1),
                                Price = reader.GetDouble(2),
                                OrderDate = new DateTime(reader.GetInt64(3)),
                                FromDate = new DateTime(reader.GetInt64(4)),
                                ToDate = new DateTime(reader.GetInt64(5)),
                                OrderID = reader.GetInt32(6)
                            };

                            orders.Add(order);
                        }
                        return orders;
                    }
                }
            }
        }

        public static List<Orders> GetApartmentOrders(string userName, string password, int apartmentID)
        {
            using (SqlConnection conn = new SqlConnection(CONN_STRING))
            {
                conn.Open();
                if (!DB.UsersDB.ValidateRenter(userName, password, conn))
                    return null;
                using (SqlCommand cmd = new SqlCommand("SELECT OrderID,Price,FromDate,ToDate,OrderDate,Approved,UserName FROM Orders WHERE ApartmentID = @ApartmentID AND Approved = 1", conn))
                {
                    cmd.Add("@ApartmentID", apartmentID);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Orders> orders = new List<Orders>();
                        while (reader.Read())
                        {
                            Orders order = new Orders()
                            {
                                ApartmentID = apartmentID,
                                OrderID = reader.GetInt32(0),
                                Price = reader.GetDouble(1),
                                FromDate = new DateTime(reader.GetInt64(2)),
                                ToDate = new DateTime(reader.GetInt64(3)),
                                OrderDate = new DateTime(reader.GetInt64(4)),
                                Approved = reader.GetBoolean(5),
                                UserName = reader.GetString(6)
                            };
                            orders.Add(order);
                        }
                        return orders;
                    }
                }
            }
        }

        public static bool UpdateOrderStatus(string password, Orders orders)
        {
            using (SqlConnection conn = new SqlConnection(CONN_STRING))
            {
                conn.Open();
                if (!DB.UsersDB.ValidateRenter(orders.RenterUserName, password, conn))
                    return false;

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Add("@Approved", orders.Approved);
                    cmd.Add("@OrderID", orders.OrderID);
                    cmd.Add("@ApartmentID", orders.ApartmentID);
                    cmd.Connection = conn;
                    if ((bool)orders.Approved)
                    {
                        cmd.CommandText = "UPDATE Orders SET Approved = 1 WHERE Orders.ApartmentID = @ApartmentID AND Orders.OrderID = @OrderID UPDATE Orders SET Approved = 0 WHERE Orders.OrderID = (SELECT Orders.OrderID FROM Orders JOIN (SELECT Orders.FromDate,Orders.ToDate,OrderID,ApartmentID FROM Orders WHERE Orders.OrderID = @OrderID) AS Step1 ON Step1.ApartmentID = Orders.ApartmentID WHERE (Orders.Approved IS NULL OR Orders.Approved = 0) AND Orders.FromDate BETWEEN Step1.FromDate AND Step1.ToDate OR Orders.ToDate BETWEEN Step1.FromDate AND Step1.ToDate AND NOT Orders.OrderID = Step1.OrderID)";
                        return cmd.ExecuteNonQuery() > 0;

                    }
                    else if (!(bool)orders.Approved)
                    {
                        cmd.CommandText = "UPDATE Orders SET Approved = @Approved WHERE Orders.ApartmentID = @ApartmentID AND Orders.OrderID = @OrderID";
                        return cmd.ExecuteNonQuery() == 1;

                    }
                    return false;

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

