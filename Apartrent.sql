USE [master]
GO
/****** Object:  Database [ApartRent]    Script Date: 21/02/2019 15:17:42 ******/
CREATE DATABASE [ApartRent]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ApartRent', FILENAME = N'D:\SQL\MSSQL14.SQLEXPRESS\MSSQL\DATA\ApartRent.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ApartRent_log', FILENAME = N'D:\SQL\MSSQL14.SQLEXPRESS\MSSQL\DATA\ApartRent_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [ApartRent] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ApartRent].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ApartRent] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ApartRent] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ApartRent] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ApartRent] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ApartRent] SET ARITHABORT OFF 
GO
ALTER DATABASE [ApartRent] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ApartRent] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ApartRent] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ApartRent] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ApartRent] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ApartRent] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ApartRent] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ApartRent] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ApartRent] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ApartRent] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ApartRent] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ApartRent] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ApartRent] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ApartRent] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ApartRent] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ApartRent] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ApartRent] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ApartRent] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ApartRent] SET  MULTI_USER 
GO
ALTER DATABASE [ApartRent] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ApartRent] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ApartRent] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ApartRent] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ApartRent] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ApartRent] SET QUERY_STORE = OFF
GO
USE [ApartRent]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [ApartRent]
GO
/****** Object:  Table [dbo].[Apartment]    Script Date: 21/02/2019 15:17:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Apartment](
	[ApartmentID] [int] IDENTITY(1,1) NOT NULL,
	[RenterUserName] [varchar](11) NOT NULL,
	[CountryID] [int] NOT NULL,
	[CategoryID] [int] NOT NULL,
	[Address] [varchar](50) NOT NULL,
	[PricePerDay] [float] NOT NULL,
	[AvailableFromDate] [bigint] NOT NULL,
	[AvailableToDate] [bigint] NOT NULL,
	[Description] [varchar](70) NULL,
 CONSTRAINT [PK_Apartment] PRIMARY KEY CLUSTERED 
(
	[ApartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApartmentCategories]    Script Date: 21/02/2019 15:17:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApartmentCategories](
	[CategoryID] [int] NOT NULL,
	[ApartmentType] [varchar](50) NOT NULL,
 CONSTRAINT [PK_ApartmentCategories] PRIMARY KEY CLUSTERED 
(
	[CategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApartmentFeatures]    Script Date: 21/02/2019 15:17:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApartmentFeatures](
	[FeaturesID] [int] IDENTITY(1,1) NOT NULL,
	[ApartmentID] [int] NOT NULL,
	[NumberOfGuests] [int] NOT NULL,
	[Shower] [bit] NOT NULL,
	[Bath] [bit] NOT NULL,
	[WIFI] [bit] NOT NULL,
	[TV] [bit] NOT NULL,
	[Cables] [bit] NOT NULL,
	[Satellite] [bit] NOT NULL,
	[Pets] [bit] NOT NULL,
	[NumberOfBedRooms] [int] NOT NULL,
	[LivingRoom] [bit] NOT NULL,
	[BedRoomDescription] [varchar](80) NOT NULL,
	[LivingRoomDescription] [varchar](80) NULL,
	[QueenSizeBed] [int] NOT NULL,
	[DoubleBed] [int] NOT NULL,
	[SingleBed] [int] NOT NULL,
	[SofaBed] [int] NOT NULL,
	[BedsDescription] [varchar](80) NULL,
 CONSTRAINT [PK_ApartmentFeatures] PRIMARY KEY CLUSTERED 
(
	[FeaturesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApartmentImages]    Script Date: 21/02/2019 15:17:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApartmentImages](
	[ApartmentID] [int] NOT NULL,
	[PrimeImage] [varbinary](max) NOT NULL,
	[Image1] [varbinary](max) NULL,
	[Image2] [varbinary](max) NULL,
	[Image3] [varbinary](max) NULL,
	[Image4] [varbinary](max) NULL,
	[PrimeImageType] [varchar](50) NOT NULL,
	[ImageType1] [varchar](50) NULL,
	[ImageType2] [varchar](50) NULL,
	[ImageType3] [varchar](50) NULL,
	[ImageType4] [varchar](50) NULL,
 CONSTRAINT [PK_ApartmentImages] PRIMARY KEY CLUSTERED 
(
	[ApartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Countries]    Script Date: 21/02/2019 15:17:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Countries](
	[CountryID] [int] NOT NULL,
	[CountryName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Countries] PRIMARY KEY CLUSTERED 
(
	[CountryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 21/02/2019 15:17:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](11) NOT NULL,
	[ApartmentID] [int] NULL,
	[Price] [float] NOT NULL,
	[OrderDate] [bigint] NOT NULL,
	[FromDate] [bigint] NOT NULL,
	[ToDate] [bigint] NOT NULL,
	[Approved] [bit] NULL,
	[RenterUserName] [varchar](10) NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reviews]    Script Date: 21/02/2019 15:17:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reviews](
	[ReviewID] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](100) NOT NULL,
	[UserName] [varchar](11) NOT NULL,
	[ApartmentID] [int] NOT NULL,
	[Rating] [smallint] NOT NULL,
 CONSTRAINT [PK_Reviews] PRIMARY KEY CLUSTERED 
(
	[ReviewID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [Aparmtnet_User_Reviews] UNIQUE NONCLUSTERED 
(
	[UserName] ASC,
	[ApartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 21/02/2019 15:17:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserName] [varchar](11) NOT NULL,
	[Password] [varchar](max) NOT NULL,
	[Gender] [bit] NOT NULL,
	[Address] [varchar](50) NOT NULL,
	[PhoneNumber] [varchar](17) NULL,
	[Email] [varchar](31) NOT NULL,
	[FirstName] [varchar](11) NOT NULL,
	[LastName] [varchar](11) NOT NULL,
	[LastLogin] [bigint] NULL,
	[LastOrder] [bigint] NULL,
	[CountryID] [int] NOT NULL,
	[Role] [int] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsersProfileImage]    Script Date: 21/02/2019 15:17:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersProfileImage](
	[UserName] [varchar](11) NOT NULL,
	[Image] [varbinary](max) NULL,
	[ImageType] [varchar](50) NULL,
 CONSTRAINT [PK_UsersProfileImage] PRIMARY KEY CLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF__Orders__UserName__1D7B6025]  DEFAULT ('User does not exists') FOR [UserName]
GO
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF__Orders__RenterUs__1E6F845E]  DEFAULT ('User does not exists') FOR [RenterUserName]
GO
ALTER TABLE [dbo].[Reviews] ADD  CONSTRAINT [DF__Reviews__Rating__607251E5]  DEFAULT ((1)) FOR [Rating]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_Role]  DEFAULT ((0)) FOR [Role]
GO
ALTER TABLE [dbo].[Apartment]  WITH CHECK ADD  CONSTRAINT [ApartmentCategories_Apartment] FOREIGN KEY([CategoryID])
REFERENCES [dbo].[ApartmentCategories] ([CategoryID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Apartment] CHECK CONSTRAINT [ApartmentCategories_Apartment]
GO
ALTER TABLE [dbo].[Apartment]  WITH CHECK ADD  CONSTRAINT [CountryIdToApartmentCountry] FOREIGN KEY([CountryID])
REFERENCES [dbo].[Countries] ([CountryID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Apartment] CHECK CONSTRAINT [CountryIdToApartmentCountry]
GO
ALTER TABLE [dbo].[Apartment]  WITH CHECK ADD  CONSTRAINT [User Primary key] FOREIGN KEY([RenterUserName])
REFERENCES [dbo].[Users] ([UserName])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Apartment] CHECK CONSTRAINT [User Primary key]
GO
ALTER TABLE [dbo].[ApartmentFeatures]  WITH CHECK ADD  CONSTRAINT [ApartmentIDToFeatures] FOREIGN KEY([ApartmentID])
REFERENCES [dbo].[Apartment] ([ApartmentID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ApartmentFeatures] CHECK CONSTRAINT [ApartmentIDToFeatures]
GO
ALTER TABLE [dbo].[ApartmentImages]  WITH CHECK ADD  CONSTRAINT [FK_ApartmentImages_Apartment] FOREIGN KEY([ApartmentID])
REFERENCES [dbo].[Apartment] ([ApartmentID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ApartmentImages] CHECK CONSTRAINT [FK_ApartmentImages_Apartment]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_UserName] FOREIGN KEY([UserName])
REFERENCES [dbo].[Users] ([UserName])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_UserName]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Users] FOREIGN KEY([UserName])
REFERENCES [dbo].[Users] ([UserName])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Users]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [User Country] FOREIGN KEY([CountryID])
REFERENCES [dbo].[Countries] ([CountryID])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [User Country]
GO
ALTER TABLE [dbo].[UsersProfileImage]  WITH CHECK ADD  CONSTRAINT [User_Image] FOREIGN KEY([UserName])
REFERENCES [dbo].[Users] ([UserName])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UsersProfileImage] CHECK CONSTRAINT [User_Image]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Users cant create more then 1 review on apartment' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Reviews', @level2type=N'CONSTRAINT',@level2name=N'Aparmtnet_User_Reviews'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'User Reviews' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Reviews', @level2type=N'CONSTRAINT',@level2name=N'FK_Reviews_Users'
GO
USE [master]
GO
ALTER DATABASE [ApartRent] SET  READ_WRITE 
GO
