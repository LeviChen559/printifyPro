-- MySQL dump 10.13  Distrib 9.0.1, for macos14 (arm64)
--
-- Host: localhost    Database: printyfyPro
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `mylabels`
--

DROP TABLE IF EXISTS `mylabels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mylabels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_code` varchar(50) DEFAULT NULL,
  `product_name_en` varchar(100) NOT NULL,
  `product_name_zh` varchar(100) DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `weight_unit` enum('g/tray','g/bag','pcs/tray','container','g/piece','ml/bottle') DEFAULT 'g/tray',
  `case_quantity` int unsigned DEFAULT NULL,
  `case_unit` enum('tray','bag','piece','container','bottle') DEFAULT 'tray',
  `storage_requirements` varchar(150) DEFAULT NULL,
  `shelf_life` varchar(50) DEFAULT NULL,
  `case_gtin` char(14) DEFAULT NULL,
  `ingredient_info` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `item_code` (`item_code`),
  UNIQUE KEY `case_gtin` (`case_gtin`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mylabels`
--

LOCK TABLES `mylabels` WRITE;
/*!40000 ALTER TABLE `mylabels` DISABLE KEYS */;
INSERT INTO `mylabels` VALUES (1,'1002','Fresh Rice Noodle','鮮河粉',680.00,'g/tray',6,'tray','Cooler','9 days','06710213435-4',''),(2,'1008','Sha He Rice Noodle','沙河粉',680.00,'g/tray',6,'tray','Cooler','9 days','06710213601-3',''),(3,'1004','Rice Noodle (Uncut)','鮮河粉(原塊)',550.00,'g/tray',6,'tray','Cooler','9 days','06710213602-0',''),(4,'8501','Silver Pin Noodle','銀針粉',454.00,'g/tray',6,'tray','Cooler','9 days','06710213603-7',''),(5,'1054','Plain Rice Roll','齋腸粉',650.00,'g/tray',6,'tray','Cooler','9 days','06710213434-7',''),(6,'1052','Rice Roll w/ Dried Shrimp + Green Onion','豬腸粉',650.00,'g/tray',6,'tray','Cooler','9 days','06710213436-1',''),(7,'1055','Rice Roll w/ Seasoning','豬腸粉(附醬料)',725.00,'g/tray',6,'tray','Cooler','9 days','06710213437-6',''),(8,'7087','Pre-Cut Plain Rice Roll w/ Seasoning','齋腸粉(附醬料)',680.00,'g/tray',6,'tray','Freezer/Cooler','90/9 days','06710213650-1',''),(9,'1092','Guangdong Style Lai Fen','廣東瀨粉',454.00,'g/tray',8,'tray','Freezer/Cooler','90/15 days','06710213449-1',''),(10,'1023','Yunnan Style Mi Xian','雲南米線',454.00,'g/tray',8,'tray','Freezer/Cooler','90/15 days','06710213604-4',''),(11,'1082','Shanghai White Thick Noodles','熟上海粗麵',550.00,'g/tray',6,'tray','Freezer/Cooler','180/15 days','06710213433-0',''),(12,'1086','Shanghai White Thin Noodles','熟上海幼麵',550.00,'g/tray',6,'tray','Freezer/Cooler','180/15 days','06710213606-8',''),(13,'1084','Shanghai Oil Noodles','熟上海油麵',550.00,'g/tray',6,'tray','Freezer/Cooler','180/15 days','06710213432-3',''),(14,'7086','Hokkien Stir Fry Noodles','上海粗炒',550.00,'g/tray',6,'tray','Freezer/Cooler','180/15 days','06710213649-5',''),(15,'1078','Uncooked Shanghai Noodles (Thick)','生上海粗麵',550.00,'g/tray',6,'tray','Freezer/Cooler','180/15 days','06710213605-1',''),(16,'1076','Uncooked Shanghai Noodles (Thin)','生上海幼麵',550.00,'g/tray',6,'tray','Freezer/Cooler','180/15 days','06710213451-4',''),(17,'1130','Chow Mein','全蛋炒麵',454.00,'g/bag',12,'bag','Freezer/Cooler','180/21 days','06710213431-6',''),(18,'1213','Ribbon Chow Mein','寬條炒麵',454.00,'g/bag',12,'bag','Freezer/Cooler','180/21 days','06710213448-4',''),(19,'1072','Wun-Tun Thin Noodles','全蛋雲吞麵',340.00,'g/tray',8,'tray','Freezer/Cooler','180/15 days','06710213438-5',''),(20,'1074','Wun-Tun Thick Noodles','全蛋雲吞粗麵',340.00,'g/tray',8,'tray','Freezer/Cooler','180/15 days','06710213450-7',''),(21,'1406','Dumpling Wrappers','餃子皮',227.00,'g/bag',12,'bag','Freezer/Cooler','180/28 days','06710213452-1',''),(22,'1295','Wun-Tun Wrappers','雲吞皮',227.00,'g/bag',12,'bag','Freezer/Cooler','180/28 days','06710213439-2',''),(23,'8552','Sunning Pho Noodle 1lb x 30bags','新鮮潮洲粿條',454.00,'g/bag',30,'bag','Freezer/Cooler','180/60 days','06710213469-9',''),(24,'8553','Sunning Pho Noodle 2lb x 15bags','新鮮潮洲粿條',908.00,'g/bag',15,'bag','Freezer/Cooler','180/60 days','06710213468-2',''),(25,'8554','Sunning Pho Noodle 5lb x 6bags','新鮮潮洲粿條',2270.00,'g/bag',6,'bag','Freezer/Cooler','180/30 days','06710213467-5',''),(26,'8551','Sunning Pho Noodle 10lb x 3bags','新鮮潮洲粿條',4540.00,'g/bag',3,'bag','Freezer/Cooler','180/15 days','06710213607-5',''),(27,'8560','Sunning Pad Thai','新鮮泰式粿條',454.00,'g/bag',30,'bag','Freezer/Cooler','180/60 days','06710213608-2',''),(28,'1112','Yee Mein','長壽伊麵',228.00,'g/piece',8,'piece','Cooler','28 days','06710213609-9',''),(29,'1504','Vegetarian Potsticker 825g (28g x 30 pcs)','菜餃子 825g',825.00,'g/bag',10,'bag','Freezer','270 days','06710213443-9',''),(30,'1501','Pork & Vegetable Potsticker 825g (28g x 30pcs)','豬肉餃子 825g',825.00,'g/bag',10,'bag','Freezer','270 days','06710213442-2',''),(31,'1503','Chicken & Vegetable Potsticker 825g (28g x 30pcs)','雞肉餃子 825g',825.00,'g/bag',10,'bag','Freezer','270 days','06710213441-5','');
/*!40000 ALTER TABLE `mylabels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user','guest') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'levi.cyj@gmail.com','Levi','$2a$10$wF5RUQtjdqPcP7WaVO7XJuZVieekOslUTSpGlEBPKk4a8SPW4cdw2','admin','2024-10-27 01:01:58');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-26 18:15:05
