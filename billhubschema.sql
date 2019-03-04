-- MySQL dump 10.13  Distrib 8.0.15, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: billhub
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `summary` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `proposed` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_action` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tracking_count` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (2,'Suppl Approp Dept Treasury','Supplemental appropriations are made to the department of the treasury Note: This summary applies to the reengrossed version of this bill as introduced in the second house','CO','2019-02-08','Introduced In House - Assigned to Appropriations','0'),(3,'Relative to the Reverend Dr. Martin Luther King, Jr.','This measure would honor the late Reverend Dr. Martin Luther King, Jr. and commemorate Dr. Martin Luther King, Jr. Day. ','CA','2019-01-10','Introduced. To print','0'),(10,'General Appropriations Bill','Distributing money to all our lobbyists\' business ties.','TX','2019-01-15','Received by the Secretary of the Senate','0'),(11,'Grand Junction Regional Center Campus','The bill gives the department of human services other options by authorizing the department to either list all or a portion of the Grand Junction regional center campus for sale','MN','2019-02-11','Referred to Health and Human Services Finance and Policy','0'),(12,'CDOT Colorado Department Of Transportation Consulting Engineer Contracts','The bill requires the CDOT to procure construction management and construction engineering services to be provided by a consulting engineer for a CDOT construction project','CO','2019-01-11','','0'),(13,'Transfer Of GOCO Great Outdoors Colorado Money To State Education Fund','The resolution allows the transfer of available net proceeds minus any money required to pay bonds issued by law by the GOCO trust fund board of every state-supervised lottery game ','CO','2019-02-14','','0'),(14,'Scope Of Manufactured Home Sales Tax Exemption','The bill clarifies the scope of the sales tax exemption by allowing it for \"manufactured homes\", a term that a specifically referenced statute defines broadly to include homes designed to be installed on either temporary or permanent foundations.','CO','2019-01-08','','0'),(15,'Prohibit Use Restriction On School District Property','The bill prohibits a board of education from including a use restriction on the sale, conveyance, lease, or rental of any district property that restricts the property from being used as a public or nonpublic school for any grade','CO','2019-02-14','','0');
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'nick','$2a$10$iJa6WteU23KYgWj2k1wjWu2AJNHNRlWJbXwHb1gVS9FEpgqDPdFOi'),(2,'tester','$2a$10$KZUJP44qBonlIyInFp5nNO4q1QagdUQtu3ZhOuaUhOYYNgyn0lASW'),(5,'marvB','$2a$10$VgUQqO1Zw4TSwlnNNJ8qEOwniDIwueOzdFpykGOR4KyMqV04WBSDq'),(6,'butters','$2a$10$1PoEBzBIwcfmhSCftuCa2uOc0kGRlA3sPCPJckw8nwfbrODxOMzbm'),(7,'jones','$2a$10$kqcLTYz27bfwbVWJIidvguU3XtByXqCchEHjWqEvsD5Pr0iatXbrm'),(8,'bob','$2a$10$56y8H1MwUO1fnIcSHBX4qedLJ.vlEs9PHAdLS/o44ZwfKJ9tIR5vu'),(9,'bill','$2a$10$73RXsOvVx1IxDbefY6XeTuiB7sq9z0HcRh3wM7x9HAOQNoV0/KPhu'),(10,'mike','$2a$10$8WSGSwTi0mlzpjpBxr7GaOcAYywEjCTDPIjIz.d6d7vhn.S9zxbpi'),(11,'jim','$2a$10$gzV06252cihrTRhg7DySlOQoXp2uu.3/o8h2rw6xrnx2OQ7MYufn2');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_track_bills`
--

DROP TABLE IF EXISTS `users_track_bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users_track_bills` (
  `bill_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  KEY `fk_bill_has_user_user1_idx` (`user_id`),
  KEY `fk_bill_has_user_bill_idx` (`bill_id`),
  CONSTRAINT `fk_bill_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_track_bills`
--

LOCK TABLES `users_track_bills` WRITE;
/*!40000 ALTER TABLE `users_track_bills` DISABLE KEYS */;
INSERT INTO `users_track_bills` VALUES (2,9),(3,9),(11,9),(10,9),(3,10),(10,10),(2,10),(12,10),(15,9),(13,9),(14,9),(15,10),(11,10),(14,10),(2,11),(3,11);
/*!40000 ALTER TABLE `users_track_bills` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-01 14:56:21
