-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: librarymanagement
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `isbn` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `num_pages` int DEFAULT NULL,
  `rating` decimal(10,5) DEFAULT NULL,
  `stock` int DEFAULT '50',
  PRIMARY KEY (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES ('0061094153','Imajica: The Reconciliation','Clive Barker','HarperTorch',544,4.42000,92),('0140285210','English Passengers','Matthew Kneale','Penguin',462,4.06000,59),('0143038311','The Bar on the Seine','Georges Simenon/David Watson','Penguin Books',160,3.69000,57),('0307237699','The Audacity of Hope: Thoughts on Reclaiming the American Dream','Barack Obama','Crown',375,3.75000,52),('0399244913','Eats  Shoots & Leaves: Why  Commas Really Do Make a Difference!','Lynne Truss/Bonnie Timmons','G.P. Putnam\'s Sons Books for Young Readers',32,4.15000,49),('0684854279','Merde!: The Real French You Were Never Taught at School','Geneviève/Michael    Heath','Gallery Books',112,3.96000,11);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pnum` bigint DEFAULT NULL,
  `debt` int DEFAULT '0',
  `spent` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'Varun Gazula','varung@gmail.com',9854125632,100,500),(2,'Jyothika Gazula','jyo31@gmail.com',7854125632,0,100),(3,'Sanjay Yadav','sanjay@gmail.com',8456355555,0,100),(4,'Rishi Raut','rishi@gmail.com',8745125554,100,0),(5,'Sanket Deshmukh','sanketd@gmail.com',8745215633,0,100);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `trans_id` varchar(255) NOT NULL,
  `mem_id` int DEFAULT NULL,
  `b_id` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`trans_id`),
  KEY `mem_id` (`mem_id`),
  KEY `b_id` (`b_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `members` (`id`),
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`b_id`) REFERENCES `books` (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES ('1',1,'0061094153','Returned','2021-05-05'),('10',1,'0684854279','Returned','2021-05-07'),('2',2,'0061094153','Returned','2021-05-07'),('3',1,'0061094153','Returned','2021-05-07'),('4',3,'0061094153','Returned','2021-05-07'),('5',1,'0061094153','Returned','2021-05-05'),('6',4,'0061094153','Rent','2020-06-30'),('7',1,'0399244913','Rent','2020-04-30'),('9',1,'0307237699','Returned','2021-05-07');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-07 19:10:45
