-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: kitchen_manager
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

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
-- Table structure for table `delivery_note_items`
--

DROP TABLE IF EXISTS `delivery_note_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_note_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `delivery_note_id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `supplier_product_code` varchar(50) DEFAULT NULL,
  `product_family` varchar(20) DEFAULT NULL,
  `product_category` varchar(50) DEFAULT NULL,
  `description` text,
  `unit_type` varchar(10) DEFAULT NULL,
  `quantity` decimal(10,3) DEFAULT NULL,
  `remaining_quantity` decimal(10,3) DEFAULT NULL,
  `status` enum('full','partial','empty') DEFAULT 'full',
  `weight_per_unit` decimal(10,3) DEFAULT NULL,
  `total_weight` decimal(10,3) DEFAULT NULL,
  `unit_price` decimal(10,4) DEFAULT NULL,
  `net_price` decimal(10,2) DEFAULT NULL,
  `tax_rate` decimal(5,2) DEFAULT NULL,
  `mer_rate` decimal(5,2) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `batch_number` varchar(50) DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `ean13_code` varchar(13) DEFAULT NULL,
  `temperature_requirements` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `delivery_note_id` (`delivery_note_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `delivery_note_items_ibfk_1` FOREIGN KEY (`delivery_note_id`) REFERENCES `delivery_notes` (`id`),
  CONSTRAINT `delivery_note_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_note_items`
--

LOCK TABLES `delivery_note_items` WRITE;
/*!40000 ALTER TABLE `delivery_note_items` DISABLE KEYS */;
INSERT INTO `delivery_note_items` VALUES (3,8,221,NULL,NULL,NULL,NULL,'UNI',1.000,NULL,'full',NULL,NULL,5.2600,NULL,NULL,NULL,NULL,'242641.7','2025-09-20',NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(4,8,222,NULL,NULL,NULL,NULL,'UNI',3.000,NULL,'full',NULL,NULL,6.1090,NULL,NULL,NULL,NULL,'24310B','2028-08-12',NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(5,8,223,NULL,NULL,NULL,NULL,'UNI',3.000,NULL,'full',NULL,NULL,6.2830,NULL,NULL,NULL,NULL,'24278B','2029-12-31',NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(6,8,224,NULL,NULL,NULL,NULL,'UNI',1.000,NULL,'full',NULL,NULL,3.1400,NULL,NULL,NULL,NULL,'E24106','2026-04-08',NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(7,8,225,NULL,NULL,NULL,NULL,'UNI',1.000,NULL,'full',NULL,NULL,8.7540,NULL,NULL,NULL,NULL,'624290105','2028-10-01',NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(8,8,226,NULL,NULL,NULL,NULL,'CAJ',1.000,NULL,'full',NULL,NULL,8.9380,NULL,NULL,NULL,NULL,'PI180503A','2025-09-18',NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(9,8,227,NULL,NULL,NULL,NULL,'CAJ',2.000,NULL,'full',NULL,NULL,13.2590,NULL,NULL,NULL,NULL,'22231024','2026-02-05',NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(10,8,228,NULL,NULL,NULL,NULL,'CAJ',1.000,NULL,'full',NULL,NULL,3.7290,NULL,NULL,NULL,NULL,'22230424','2026-04-30',NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(11,8,229,NULL,NULL,NULL,NULL,'UNI',1.000,NULL,'full',NULL,NULL,5.8700,NULL,NULL,NULL,NULL,'2810202B','2028-10-28',NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(12,9,230,NULL,NULL,NULL,NULL,'CAJ',19.000,NULL,'full',NULL,NULL,7.6910,NULL,NULL,NULL,NULL,'20241129','2025-04-27',NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(13,9,231,NULL,NULL,NULL,NULL,'CAJ',1.000,NULL,'full',NULL,NULL,9.0630,NULL,NULL,NULL,NULL,'20241111','2025-04-09',NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(14,9,232,NULL,NULL,NULL,NULL,'CAJ',2.000,NULL,'full',NULL,NULL,10.1130,NULL,NULL,NULL,NULL,'20240415','2025-01-09',NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(15,9,233,NULL,NULL,NULL,NULL,'CAJ',1.000,NULL,'full',NULL,NULL,10.7810,NULL,NULL,NULL,NULL,'20240315','2024-12-09',NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(16,9,234,NULL,NULL,NULL,NULL,'UNI',1.000,NULL,'full',NULL,NULL,19.4990,NULL,NULL,NULL,NULL,'422101291L','2026-02-01',NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(17,9,235,NULL,NULL,NULL,NULL,'UNI',1.000,NULL,'full',NULL,NULL,9.0500,NULL,NULL,NULL,NULL,'542350','2027-08-01',NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(18,9,236,NULL,NULL,NULL,NULL,'UNI',1.000,NULL,'full',NULL,NULL,28.3930,NULL,NULL,NULL,NULL,'542600','2027-09-16',NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(19,9,237,NULL,NULL,NULL,NULL,'CAJ',1.000,NULL,'full',NULL,NULL,72.1070,NULL,NULL,NULL,NULL,'N596','2025-11-01',NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(20,9,238,NULL,NULL,NULL,NULL,'UNI',1.000,NULL,'full',NULL,NULL,18.5710,NULL,NULL,NULL,NULL,'M598','2025-10-01',NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(21,9,239,NULL,NULL,NULL,NULL,'UNI',1.000,NULL,'full',NULL,NULL,18.5700,NULL,NULL,NULL,NULL,'2844.','2025-06-01',NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(22,10,240,NULL,NULL,NULL,NULL,'CAJ',2.000,NULL,'full',NULL,NULL,15.5000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-03 17:27:11','2025-05-03 17:27:11'),(23,10,70,NULL,NULL,NULL,NULL,'L',1.000,NULL,'full',NULL,NULL,25.7500,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-03 17:27:11','2025-05-03 17:27:11'),(24,10,241,NULL,NULL,NULL,NULL,'KG',3.000,NULL,'full',NULL,NULL,12.3000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-03 17:27:11','2025-05-03 17:27:11');
/*!40000 ALTER TABLE `delivery_note_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_notes`
--

DROP TABLE IF EXISTS `delivery_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int NOT NULL,
  `supplier_delivery_note_number` varchar(20) DEFAULT NULL,
  `external_reference` varchar(50) DEFAULT NULL,
  `expedition_number` varchar(50) DEFAULT NULL,
  `client_number` varchar(20) DEFAULT NULL,
  `delivery_date` date NOT NULL,
  `delivery_location` text,
  `total_packages` int DEFAULT NULL,
  `total_weight` decimal(10,2) DEFAULT NULL,
  `temperature_zone` varchar(20) DEFAULT NULL,
  `delivery_schedule` varchar(100) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `sales_rep_id` varchar(20) DEFAULT NULL,
  `total_net_amount` decimal(10,2) DEFAULT NULL,
  `total_tax_amount` decimal(10,2) DEFAULT NULL,
  `total_mer_amount` decimal(10,2) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `delivery_notes_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_notes`
--

LOCK TABLES `delivery_notes` WRITE;
/*!40000 ALTER TABLE `delivery_notes` DISABLE KEYS */;
INSERT INTO `delivery_notes` VALUES (8,1,NULL,NULL,NULL,NULL,'2024-12-30',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(9,1,NULL,NULL,NULL,NULL,'2024-12-30',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(10,5,'TEST-001',NULL,NULL,NULL,'2025-05-03',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-03 17:27:11','2025-05-03 17:27:11');
/*!40000 ALTER TABLE `delivery_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dish_products`
--

DROP TABLE IF EXISTS `dish_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dish_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dish_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` decimal(10,3) NOT NULL,
  `unit_id` int NOT NULL,
  `batch_number` varchar(100) DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `dish_id` (`dish_id`),
  KEY `product_id` (`product_id`),
  KEY `unit_id` (`unit_id`),
  CONSTRAINT `dish_products_ibfk_1` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `dish_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `dish_products_ibfk_3` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish_products`
--

LOCK TABLES `dish_products` WRITE;
/*!40000 ALTER TABLE `dish_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `dish_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dishes`
--

DROP TABLE IF EXISTS `dishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dishes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `category` varchar(50) NOT NULL,
  `description` text,
  `allergens` text,
  `is_suitable_cold` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dishes`
--

LOCK TABLES `dishes` WRITE;
/*!40000 ALTER TABLE `dishes` DISABLE KEYS */;
INSERT INTO `dishes` VALUES (1,'Patatas Riojana','Primero','Plato tradicional de patatas',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(2,'Lentejas estofadas','Primero','Legumbres',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(3,'Puchero andaluz de arroz','Primero','Plato tradicional andaluz',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(4,'Tallarines italiana','Primero','Pasta',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(5,'Fideos a la cazuela','Primero','Pasta',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(6,'Berza rehogadas','Primero','Verdura',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(7,'Ensalada verde con atún','Primero','Ensalada',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(8,'Solomillo de Pollo asado con miel, pimienta y limón','Segundo','Carne de pollo',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(9,'Abadejo con ajo y perejil','Segundo','Pescado',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(10,'Huevos fritos','Segundo','Huevos',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(11,'Lomo de cerdo asado','Segundo','Carne de cerdo',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(12,'Tortilla de patatas y cebolla','Segundo','Huevos y patatas',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(13,'Albóndigas en salsa','Segundo','Carne',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(14,'Fiduá','Segundo','Pasta con pescado',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(15,'Tomate asado','Guarnición','Verdura',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(16,'Ensalada de lechuga, zanahoria y maíz','Guarnición','Ensalada',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(17,'Patatas fritas','Guarnición','Patatas',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(18,'Verduritas','Guarnición','Verduras variadas',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(19,'Ensalada de lechuga, tomate, maíz y zanahoria','Guarnición','Ensalada',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(20,'Arroz salteado','Guarnición','Arroz',NULL,0,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(21,'Ensalada de arroz con manzana y surimi','Primero','Ensalada',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(22,'Ensalada de pasta con jamón York','Primero','Ensalada',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(23,'Ensalada completa','Primero','Ensalada',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(24,'Acelgas rehogadas','Primero','Verdura',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(25,'Sopa Minestrone','Primero','Sopa',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(26,'Crema de Calabaza y puerro','Primero','Crema',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(27,'Sopa Hortelana','Primero','Sopa',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(28,'Huevos revueltos','Segundo','Huevos',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(29,'Bacalao horno en salsa','Segundo','Pescado',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(30,'Pinchitos de pollo adobados','Segundo','Carne de pollo',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(31,'Croquetas de Pollo','Segundo','Carne de pollo',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(32,'Hamburguesa de pollo completa','Segundo','Carne de pollo',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(33,'Merluza a las finas hierbas','Segundo','Pescado',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(34,'Pizza de jamón york y champiñones','Segundo','Pizza',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(35,'Ensalada de lechuga y tomate','Guarnición','Ensalada',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(36,'Judías verdes Rehogadas','Guarnición','Verdura',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(37,'Guisantes salteados','Guarnición','Verdura',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(38,'Ensaladilla rusa','Guarnición','Ensalada',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(39,'Patatas hervidas al laurel','Guarnición','Patatas',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(40,'Ensalada de tomate','Guarnición','Ensalada',NULL,0,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(41,'Potaje de garbanzos','Primero','Legumbres',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(42,'Arroz caldoso con verduras','Primero','Arroz',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(43,'Alubias blancas con verduras','Primero','Legumbres',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(44,'Fideos a la marinera','Primero','Pasta',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(45,'Macarrones Napolitana','Primero','Pasta',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(46,'Patatas a la Navarra','Primero','Patatas',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(47,'Lomo de adobado en salsa','Segundo','Carne de cerdo',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(48,'Albóndigas de ave en salsa de tomate','Segundo','Carne de ave',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(49,'Buñuelos de bacalao','Segundo','Pescado',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(50,'Magro de cerdo en salsa de tomate','Segundo','Carne de cerdo',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(51,'Chuleta de rape a la siciliana','Segundo','Pescado',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(52,'Tortilla Francesa','Segundo','Huevos',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(53,'Paella mixta con pollo','Segundo','Arroz con carne',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(54,'Ensalada de lechuga, cebolla y zanahoria','Guarnición','Ensalada',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(55,'Ensaladilla al vapor','Guarnición','Verduras',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(56,'Arroz pilaf','Guarnición','Arroz',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(57,'Brócoli al limón','Guarnición','Verdura',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(58,'Calabacín salteado con cebolla y tomillo','Guarnición','Verdura',NULL,0,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(59,'Tabulé','Primero','Ensalada',NULL,0,'2025-02-19 19:59:06','2025-02-19 19:59:06'),(60,'Sopa de marisco','Primero','Sopa',NULL,0,'2025-02-19 19:59:06','2025-02-19 19:59:06'),(61,'Ensalada aliñada con zanahoria, maíz y atún','Primero','Ensalada',NULL,0,'2025-02-19 19:59:06','2025-02-19 19:59:06'),(62,'Crema de zanahoria con picatostes','Primero','Crema',NULL,0,'2025-02-19 19:59:06','2025-02-19 19:59:06'),(63,'Ensalada canaria','Primero','Ensalada',NULL,0,'2025-02-19 19:59:06','2025-02-19 19:59:06'),(64,'Sopa juliana','Primero','Sopa',NULL,0,'2025-02-19 19:59:06','2025-02-19 19:59:06'),(65,'Crema de verduras','Primero','Crema',NULL,0,'2025-02-19 19:59:06','2025-02-19 19:59:06'),(66,'Huevos revueltos con tomate y cebolla','Segundo','Huevos',NULL,0,'2025-02-19 19:59:06','2025-02-19 19:59:06'),(67,'Contramuslo de pollo al horno','Segundo','Carne de pollo',NULL,0,'2025-02-19 19:59:06','2025-02-19 19:59:06'),(68,'Wrap de pollo con guacamole','Segundo','Carne de pollo',NULL,0,'2025-02-19 19:59:06','2025-02-19 19:59:06'),(69,'Merluza al horno','Segundo','Pescado',NULL,0,'2025-02-19 19:59:06','2025-02-19 19:59:06'),(70,'Hamburguesa de ave empanada','Segundo','Carne de ave',NULL,0,'2025-02-19 19:59:06','2025-02-19 19:59:06'),(71,'Salchichas frescas de ave a la plancha','Segundo','Carne de ave',NULL,0,'2025-02-19 19:59:06','2025-02-19 19:59:06'),(72,'Judías verdes','Guarnición','Verdura',NULL,0,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(73,'Patatas y champiñón al vapor con laurel','Guarnición','Patatas y verduras',NULL,0,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(74,'Guisantes salteados con cebolla','Guarnición','Verdura',NULL,0,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(75,'Ensalada de lechuga, tomate, zanahoria, cebolla y maíz','Guarnición','Ensalada',NULL,0,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(76,'Menestra de verduras','Guarnición','Verdura',NULL,0,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(77,'Patatas asada con ajo y perejil','Guarnición','Patatas',NULL,0,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(78,'Patata y zanahoria al vapor','Guarnición','Verduras',NULL,0,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(79,'Lentejas con verduras','Primero','Legumbres',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(80,'Cazuela de fideos','Primero','Pasta',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(81,'Cocido malagueño','Primero','Cocido',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(82,'Espaguetis italiana','Primero','Pasta',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(83,'Sopa de picadillo','Primero','Sopa',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(84,'Carne de lomo al ajillo','Segundo','Carne de cerdo',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(85,'Abadejo al ajoperejil','Segundo','Pescado',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(86,'Calamares a la romana','Segundo','Pescado',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(87,'Magro de cerdo encebollado','Segundo','Carne de cerdo',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(88,'Hervido de judías verdes','Guarnición','Verdura',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(89,'Guisantes con cebolla salteados','Guarnición','Verdura',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(90,'Arroz blanco con tomate','Guarnición','Arroz',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(91,'Ensaladilla de verduras','Guarnición','Verdura',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(92,'Patatas dado horno','Guarnición','Patatas',NULL,0,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(93,'Menestra natural de brócoli, zanahoria y patata','Primero','Verduras',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(94,'Crema de puerros','Primero','Crema',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(95,'Ensalada de pasta','Primero','Ensalada',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(96,'Sopa Castellana','Primero','Sopa',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(97,'Arroz salteado al curry','Primero','Arroz',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(98,'Salteado de pollo asado','Segundo','Carne de pollo',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(99,'Merluza en salsa verde','Segundo','Pescado',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(100,'Revuelto de jamón york','Segundo','Huevos',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(101,'Salmón teriyaki','Segundo','Pescado',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(102,'Alitas pollo al horno','Segundo','Carne de pollo',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(103,'Hamburguesa de ave plancha','Segundo','Carne de ave',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(104,'Quiche de york y puerro','Segundo','Huevos y verduras',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(105,'Brócoli rehogado','Guarnición','Verdura',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(106,'Tomate grill','Guarnición','Verdura',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(107,'Ensalada de lechuga y remolacha','Guarnición','Ensalada',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(108,'Berenjena y tomate asado','Guarnición','Verdura',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(109,'Ensalada lechuga y maíz','Guarnición','Ensalada',NULL,0,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(110,'Macarrones boloñesa','Primero','Pasta',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(111,'Lentejas a la jardinera','Primero','Legumbres',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(112,'Patatas guisadas con verduras','Primero','Patatas',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(113,'Fideos al ajillo','Primero','Pasta',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(114,'Potaje de garbanzos y berza','Primero','Legumbres',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(115,'Ensalada de col y manzana','Primero','Ensalada',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(116,'Cinta de lomo adobada','Segundo','Carne de cerdo',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(117,'Albóndigas jardinera','Segundo','Carne',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(119,'Ragout de pollo','Segundo','Carne de pollo',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(120,'Fritura variada','Segundo','Variado',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(121,'Rotti de pavo a la naranja','Segundo','Carne de pavo',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(122,'Paella mixta','Segundo','Arroz',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(124,'Ensalada de lechuga y zanahoria','Guarnición','Ensalada',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(125,'Patatas panadera','Guarnición','Patatas',NULL,0,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(126,'Sopa de puchero','Primero','Sopa',NULL,0,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(127,'Arroz con verduras y surimi','Primero','Arroz',NULL,0,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(129,'Sopa de pescadilla','Primero','Sopa',NULL,0,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(130,'Coliflor a la gallega','Primero','Verdura',NULL,0,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(132,'Croquetas de jamón','Segundo','Varios',NULL,0,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(133,'Fajita de ternera a la mostaza','Segundo','Carne de ternera',NULL,0,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(134,'Cinta de lomo al ajillo','Segundo','Carne de cerdo',NULL,0,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(135,'Hamburguesa de ave completa','Segundo','Carne de ave',NULL,0,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(136,'San jacobos caseros','Segundo','Varios',NULL,0,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(137,'Judías verdes y zanahoria','Guarnición','Verdura',NULL,0,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(138,'Ensalada mixta','Guarnición','Ensalada',NULL,0,'2025-02-19 20:33:36','2025-02-19 20:33:36');
/*!40000 ALTER TABLE `dishes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_dishes`
--

DROP TABLE IF EXISTS `menu_dishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_dishes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `menu_id` int NOT NULL,
  `dish_id` int NOT NULL,
  `day_of_week` int NOT NULL,
  `week_number` int NOT NULL,
  `dish_order` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `menu_id` (`menu_id`),
  KEY `dish_id` (`dish_id`),
  CONSTRAINT `menu_dishes_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE,
  CONSTRAINT `menu_dishes_ibfk_2` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `menu_dishes_chk_1` CHECK ((`week_number` between 1 and 4)),
  CONSTRAINT `menu_dishes_chk_2` CHECK ((`day_of_week` between 1 and 7)),
  CONSTRAINT `menu_dishes_chk_3` CHECK ((`dish_order` between 1 and 3))
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_dishes`
--

LOCK TABLES `menu_dishes` WRITE;
/*!40000 ALTER TABLE `menu_dishes` DISABLE KEYS */;
INSERT INTO `menu_dishes` VALUES (1,1,1,1,1,1,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(2,1,8,1,1,2,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(3,1,15,1,1,3,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(4,1,2,2,1,1,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(5,1,9,2,1,2,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(6,1,16,2,1,3,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(7,1,3,3,1,1,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(8,1,10,3,1,2,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(9,1,17,3,1,3,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(10,1,4,4,1,1,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(11,1,11,4,1,2,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(12,1,18,4,1,3,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(13,1,5,5,1,1,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(14,1,12,5,1,2,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(15,1,19,5,1,3,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(16,1,6,6,1,1,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(17,1,13,6,1,2,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(18,1,20,6,1,3,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(19,1,7,7,1,1,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(20,1,14,7,1,2,'2025-02-19 19:45:55','2025-02-19 19:45:55'),(21,2,21,1,1,1,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(22,2,28,1,1,2,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(23,2,35,1,1,3,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(24,2,22,2,1,1,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(25,2,29,2,1,2,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(26,2,36,2,1,3,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(27,2,23,3,1,1,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(28,2,30,3,1,2,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(29,2,37,3,1,3,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(30,2,24,4,1,1,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(31,2,31,4,1,2,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(32,2,38,4,1,3,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(33,2,25,5,1,1,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(34,2,32,5,1,2,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(35,2,39,5,1,3,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(36,2,26,6,1,1,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(37,2,33,6,1,2,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(38,2,40,6,1,3,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(39,2,27,7,1,1,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(40,2,34,7,1,2,'2025-02-19 19:50:43','2025-02-19 19:50:43'),(41,1,41,1,2,1,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(42,1,47,1,2,2,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(43,1,54,1,2,3,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(44,1,42,2,2,1,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(45,1,48,2,2,2,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(46,1,55,2,2,3,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(47,1,43,3,2,1,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(48,1,49,3,2,2,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(49,1,44,4,2,1,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(50,1,50,4,2,2,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(51,1,56,4,2,3,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(52,1,45,5,2,1,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(53,1,51,5,2,2,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(54,1,57,5,2,3,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(55,1,46,6,2,1,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(56,1,52,6,2,2,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(57,1,58,6,2,3,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(58,1,23,7,2,1,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(59,1,53,7,2,2,'2025-02-19 19:54:58','2025-02-19 19:54:58'),(60,2,59,1,2,1,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(61,2,66,1,2,2,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(62,2,72,1,2,3,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(63,2,60,2,2,1,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(64,2,67,2,2,2,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(65,2,73,2,2,3,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(66,2,61,3,2,1,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(67,2,68,3,2,2,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(68,2,74,3,2,3,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(69,2,62,4,2,1,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(70,2,75,4,2,3,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(71,2,63,5,2,1,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(72,2,69,5,2,2,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(73,2,76,5,2,3,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(74,2,64,6,2,1,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(75,2,70,6,2,2,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(76,2,77,6,2,3,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(77,2,65,7,2,1,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(78,2,71,7,2,2,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(79,2,78,7,2,3,'2025-02-19 19:59:07','2025-02-19 19:59:07'),(80,1,79,1,3,1,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(81,1,12,1,3,2,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(82,1,80,2,3,1,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(83,1,17,2,3,3,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(84,1,81,3,3,1,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(85,1,84,3,3,2,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(86,1,88,3,3,3,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(87,1,82,4,3,1,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(88,1,85,4,3,2,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(89,1,89,4,3,3,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(90,1,23,5,3,1,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(91,1,10,5,3,2,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(92,1,90,5,3,3,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(93,1,43,6,3,1,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(94,1,86,6,3,2,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(95,1,91,6,3,3,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(96,1,83,7,3,1,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(97,1,87,7,3,2,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(98,1,92,7,3,3,'2025-02-19 20:04:17','2025-02-19 20:04:17'),(99,2,60,1,3,1,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(100,2,98,1,3,2,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(101,2,76,1,3,3,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(102,2,99,2,3,2,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(103,2,105,2,3,3,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(104,2,93,3,3,1,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(105,2,100,3,3,2,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(106,2,106,3,3,3,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(107,2,94,4,3,1,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(108,2,101,4,3,2,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(109,2,107,4,3,3,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(110,2,95,5,3,1,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(111,2,102,5,3,2,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(112,2,108,5,3,3,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(113,2,96,6,3,1,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(114,2,103,6,3,2,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(115,2,109,6,3,3,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(116,2,97,7,3,1,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(117,2,104,7,3,2,'2025-02-19 20:20:35','2025-02-19 20:20:35'),(118,1,110,1,4,1,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(119,1,116,1,4,2,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(120,1,107,1,4,3,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(121,1,111,2,4,1,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(122,1,117,2,4,2,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(123,1,56,2,4,3,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(124,1,112,3,4,1,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(125,1,69,3,4,2,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(128,1,76,3,4,3,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(129,1,113,4,4,1,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(130,1,119,4,4,2,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(131,1,18,4,4,3,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(134,1,114,5,4,1,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(135,1,120,5,4,2,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(136,1,124,5,4,3,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(137,1,60,6,4,1,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(138,1,121,6,4,2,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(139,1,125,6,4,3,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(140,1,115,7,4,1,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(141,1,122,7,4,2,'2025-02-19 20:27:33','2025-02-19 20:27:33'),(142,2,126,1,4,1,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(143,2,12,1,4,2,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(144,2,106,1,4,3,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(145,2,59,2,4,1,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(146,2,132,2,4,2,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(147,2,127,3,4,1,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(148,2,133,3,4,2,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(149,2,35,3,4,3,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(150,2,65,4,4,1,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(153,2,12,4,4,2,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(154,2,57,4,4,3,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(155,2,129,5,4,1,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(156,2,134,5,4,2,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(157,2,137,5,4,3,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(158,2,130,6,4,1,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(159,2,135,6,4,2,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(160,2,35,6,4,3,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(161,2,94,7,4,1,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(164,2,136,7,4,2,'2025-02-19 20:33:36','2025-02-19 20:33:36'),(165,2,138,7,4,3,'2025-02-19 20:33:36','2025-02-19 20:33:36');
/*!40000 ALTER TABLE `menu_dishes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `season` varchar(50) NOT NULL,
  `service_type` enum('comida','cena') NOT NULL,
  `total_weeks` int DEFAULT '4',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (1,'Menú Invierno 2025 - Comidas','invierno','comida',4,'2025-01-01','2025-03-31',1,'2025-02-19 19:36:36','2025-02-19 19:36:36'),(2,'Menú Invierno 2025 - Cenas','invierno','cena',4,'2025-01-01','2025-03-31',1,'2025-02-19 19:36:36','2025-02-19 19:36:36');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_types`
--

DROP TABLE IF EXISTS `product_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_types`
--

LOCK TABLES `product_types` WRITE;
/*!40000 ALTER TABLE `product_types` DISABLE KEYS */;
INSERT INTO `product_types` VALUES (1,'CONGELADO','2025-02-18 18:00:53','2025-02-18 18:00:53'),(2,'FRESCO','2025-02-18 18:00:53','2025-02-18 18:00:53'),(3,'SECO','2025-02-18 18:00:53','2025-02-18 18:00:53'),(4,'CONSERVA','2025-02-18 18:00:53','2025-02-18 18:00:53'),(5,'LIMPIEZA','2025-02-18 18:22:48','2025-02-18 18:22:48');
/*!40000 ALTER TABLE `product_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `type_id` int DEFAULT NULL,
  `purchase_unit_id` int DEFAULT NULL,
  `unit_quantity` decimal(10,2) DEFAULT NULL,
  `base_unit_id` int DEFAULT NULL,
  `theoretical_stock` decimal(10,3) DEFAULT NULL,
  `actual_stock` decimal(10,3) DEFAULT NULL,
  `minimum_stock` decimal(10,3) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `last_count_date` date DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  KEY `purchase_unit_id` (`purchase_unit_id`),
  KEY `base_unit_id` (`base_unit_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `product_types` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`purchase_unit_id`) REFERENCES `units` (`id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`base_unit_id`) REFERENCES `units` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=242 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (5,NULL,'ALBONDIGAS AVE 25GR CONGELADO C-6KG',1,2,6.00,1,9.500,NULL,NULL,22.56,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(6,NULL,'ANILLA POTON ROMANA 40/60 CONG.C-6K',1,2,6.00,1,2.800,NULL,NULL,27.53,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(7,NULL,'ARITOS POTA REBOZADOS 0% GLASEO CJ 4KG',1,2,4.00,1,8.000,NULL,NULL,23.24,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(8,NULL,'AVE RAGOUT CONG C-5KG',1,2,5.00,1,8.000,NULL,NULL,23.67,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(9,NULL,'BACALAO LOMO CONGELADO 600/800 C-5KG',1,2,5.00,1,6.000,NULL,NULL,14.54,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(10,NULL,'BACALAO PUNTO SAL 300/500 C-5KG',1,2,5.00,1,5.000,NULL,NULL,18.07,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(11,NULL,'BACALAO PUNTO SAL 500/800 C-5KG',1,2,5.00,1,5.000,NULL,NULL,73.80,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(12,NULL,'BERENJENA PLANCHA CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,14.03,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(13,NULL,'BOCADITOS MERLUZA CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(14,NULL,'BROCOLI CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(15,NULL,'CALABACIN RODAJAS CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,6.95,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(16,NULL,'CALAMAR PATAGONICA LIMPIO CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,7.07,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(17,NULL,'CALAMAR PLANCHA CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(18,NULL,'CALAMAR ROMANA CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,19.14,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(19,NULL,'CARDO CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(20,NULL,'CARRILLADA CERDO S/H CONG C-5KG',1,2,5.00,1,5.000,NULL,NULL,23.67,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(21,NULL,'CEBOLLA JULIANA CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,19.29,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(22,NULL,'CERDO RAGOUT CONG C-5KG',1,2,5.00,1,5.000,NULL,NULL,20.34,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(23,NULL,'CHOCO LIMPIO CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,22.91,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(24,NULL,'COLIFLOR CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,6.61,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(25,NULL,'CROQUETAS BACALAO 40GR CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(26,NULL,'CROQUETAS JAMON 35GR CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,20.96,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(27,NULL,'EMPANADILLAS ATUN 85GR CONG C-3KG',1,2,3.00,1,3.000,NULL,NULL,15.82,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(28,NULL,'ESPINACAS HOJA CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,5.91,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(29,NULL,'GAMBA PELADA 40/60 CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,18.47,NULL,NULL,'2025-02-18 18:08:29','2025-02-18 18:08:29'),(30,NULL,'GAMBA PELADA 60/80 CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,17.34,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(31,NULL,'GUISANTE CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,5.91,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(32,NULL,'HAMBURGUESA MIXTA 100GR CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,14.03,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(33,NULL,'HAMBURGUESA POLLO 100GR CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,14.03,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(34,NULL,'HAMBURGUESA TERNERA 100GR CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,17.34,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(35,NULL,'JUDIAS VERDES PLANAS CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,5.91,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(36,NULL,'LANGOSTINO 40/60 CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(37,NULL,'LANGOSTINO COCIDO 40/60 CONG C-3KG',1,2,3.00,1,3.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(38,NULL,'MEDALLONES MERLUZA CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(39,NULL,'MENESTRA VERDURAS CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,5.91,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(40,NULL,'MERLUZA FILETE S/P 100/120 CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(41,NULL,'MERLUZA FILETE S/P 120/160 CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(42,NULL,'MERLUZA FILETE S/P 160/200 CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(43,NULL,'MERLUZA LOMO 120/160 CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(44,NULL,'MERLUZA TRONCO S/C 1500/2500 CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(45,NULL,'MIXTO PAELLA CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(46,NULL,'PATATA CORTE CASERO CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(47,NULL,'PATATA GAJOS CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(48,NULL,'PAVO RAGOUT CONG C-5KG',1,2,5.00,1,5.000,NULL,NULL,14.03,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(49,NULL,'PECHUGA POLLO FILETEADA CONG C-5KG',1,2,5.00,1,5.000,NULL,NULL,14.03,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(50,NULL,'PESCADILLA S/C 2 CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,14.03,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(51,NULL,'PIMIENTO ROJO TIRAS CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,6.95,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(52,NULL,'PIMIENTO TRICOLOR CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,6.95,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(53,NULL,'PIMIENTO VERDE TIRAS CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,6.95,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(54,NULL,'POLLO TROCEADO CONG C-5KG',1,2,5.00,1,5.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:11:32','2025-02-18 18:11:32'),(55,NULL,'PULPO COCIDO CONG C-3KG',1,2,3.00,1,3.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(56,NULL,'RAPE COLA CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(57,NULL,'RAPE COLAS N3 300/500 CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(58,NULL,'ROSADA FILETE 170/220 CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(59,NULL,'SALMON FILETE C/P CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,23.67,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(60,NULL,'SALMON SUPREMAS CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,23.67,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(61,NULL,'SAN JACOBO 130GR CONG C-6KG',1,2,6.00,1,6.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(62,NULL,'SEPIA LIMPIA CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,22.91,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(63,NULL,'SOLOMILLO CERDO CONG C-5KG',1,2,5.00,1,5.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(64,NULL,'SOPA JULIANA CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,5.91,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(65,NULL,'SUPREMAS MERLUZA 170/220 CONG C-7KG',1,2,7.00,1,7.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(66,NULL,'TERNERA RAGOUT CONG C-5KG',1,2,5.00,1,5.000,NULL,NULL,23.67,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(67,NULL,'ZANAHORIA BABY CONG C-2.5KG',1,2,2.50,1,2.500,NULL,NULL,5.91,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(70,'AOV-002','ACEITE OLIVA VIRGEN EXTRA 5L',3,3,5.00,3,5.000,1.000,NULL,25.75,'2025-05-03',NULL,'2025-02-18 18:13:03','2025-05-03 17:27:11'),(71,NULL,'ACEITUNA NEGRA RODAJA 3KG',4,1,3.00,1,3.000,NULL,NULL,14.03,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(72,NULL,'ACEITUNA RELLENA ANCHOA 1.9KG',4,1,1.90,1,1.900,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(73,NULL,'ACEITUNA VERDE RODAJA 3KG',4,1,3.00,1,3.000,NULL,NULL,14.03,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(74,NULL,'AGUA MINERAL 1.5L',3,3,1.50,3,1.500,NULL,NULL,0.52,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(75,NULL,'AGUA MINERAL 33CL',3,3,0.33,3,0.330,NULL,NULL,0.42,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(76,NULL,'AGUA MINERAL 50CL',3,3,0.50,3,0.500,NULL,NULL,0.42,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(77,NULL,'AGUA MINERAL 5L',3,3,5.00,3,5.000,NULL,NULL,1.05,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(78,NULL,'AGUA MINERAL CON GAS 1L',3,3,1.00,3,1.000,NULL,NULL,1.05,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(79,NULL,'AGUA MINERAL S/GAS 1L',3,3,1.00,3,1.000,NULL,NULL,0.84,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(80,NULL,'AJOS GRANULADO 1KG',3,1,1.00,1,1.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:13:03','2025-02-18 18:13:03'),(81,NULL,'ALCAPARRAS 1KG',4,1,1.00,1,1.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(82,NULL,'ALMIDON MAIZ 1KG',3,1,1.00,1,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(83,NULL,'ANCHOA SALADA 1KG',4,1,1.00,1,1.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(84,NULL,'ARROZ BOMBA 1KG',3,1,1.00,1,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(85,NULL,'ARROZ LARGO 1KG',3,1,1.00,1,1.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(86,NULL,'ATUN ACEITE RO-1000',4,1,1.00,1,1.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(87,NULL,'AZUCAR BLANCO 1KG',3,1,1.00,1,1.000,NULL,NULL,1.75,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(88,NULL,'AZUCAR MORENO 1KG',3,1,1.00,1,1.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(89,NULL,'BACALAO DESMIGADO 1KG',3,1,1.00,1,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(90,NULL,'BICARBONATO SODICO 1KG',3,1,1.00,1,1.000,NULL,NULL,3.50,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(91,NULL,'CALDO CARNE POLVO 1KG',3,1,1.00,1,1.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(92,NULL,'CALDO PESCADO POLVO 1KG',3,1,1.00,1,1.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(93,NULL,'CALDO POLLO POLVO 1KG',3,1,1.00,1,1.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(94,NULL,'CANELA MOLIDA 1KG',3,1,1.00,1,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(95,NULL,'CANELA RAMA 1KG',3,1,1.00,1,1.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(96,NULL,'CEBOLLA FRITA 1KG',3,1,1.00,1,1.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(97,NULL,'CHAMPIÑON LAMINADO 3KG',4,1,3.00,1,3.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(98,NULL,'CHOCOLATE COBERTURA 1KG',3,1,1.00,1,1.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(99,NULL,'CHOCOLATE POSTRES 1KG',3,1,1.00,1,1.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(100,NULL,'CLAVO ENTERO 1KG',3,1,1.00,1,1.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(101,NULL,'COLORANTE ALIMENTARIO 1KG',3,1,1.00,1,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(102,NULL,'COMINO MOLIDO 1KG',3,1,1.00,1,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(103,NULL,'CURRY 1KG',3,1,1.00,1,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(104,NULL,'ESPARRAGOS BLANCOS 6/9 3KG',4,1,3.00,1,3.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(105,NULL,'ESPARRAGOS BLANCOS 9/12 3KG',4,1,3.00,1,3.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(106,NULL,'ESPARRAGOS TROZOS 3KG',4,1,3.00,1,3.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:14:44','2025-02-18 18:14:44'),(107,NULL,'FIDEOS 1KG',3,1,1.00,1,1.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(108,NULL,'FLAN HUEVO POLVO 1KG',3,1,1.00,1,1.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(109,NULL,'GALLETA MARIA 5KG',3,1,5.00,1,5.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(110,NULL,'GARBANZOS COCIDOS 3KG',4,1,3.00,1,3.000,NULL,NULL,6.95,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(111,NULL,'GUISANTES MUY FINOS 3KG',4,1,3.00,1,3.000,NULL,NULL,6.95,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(112,NULL,'HARINA TRIGO 1KG',3,1,1.00,1,1.000,NULL,NULL,1.75,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(113,NULL,'HIERBAS PROVENZA 1KG',3,1,1.00,1,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(114,NULL,'HUEVO LIQUIDO 2L',2,3,2.00,3,2.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(115,NULL,'JUDIAS BLANCAS COCIDAS 3KG',4,1,3.00,1,3.000,NULL,NULL,6.95,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(116,NULL,'LAUREL HOJA 1KG',3,1,1.00,1,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(117,NULL,'LECHE ENTERA 1L',2,3,1.00,3,1.000,NULL,NULL,1.75,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(118,NULL,'LECHE UHT ENTERA 1L',3,3,1.00,3,1.000,NULL,NULL,1.75,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(119,NULL,'LENTEJAS COCIDAS 3KG',4,1,3.00,1,3.000,NULL,NULL,6.95,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(120,NULL,'LEVADURA POLVO 1KG',3,1,1.00,1,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(121,NULL,'MACARRONES 5KG',3,1,5.00,1,5.000,NULL,NULL,14.03,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(122,NULL,'MAICENA 1KG',3,1,1.00,1,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(123,NULL,'MAIZ DULCE 3KG',4,1,3.00,1,3.000,NULL,NULL,6.95,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(124,NULL,'MANTEQUILLA 1KG',2,1,1.00,1,1.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(125,NULL,'MARGARINA VEGETAL 1KG',2,1,1.00,1,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(126,NULL,'MAYONESA 3.6KG',4,1,3.60,1,3.600,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(127,NULL,'MELOCOTON ALMIBAR 3KG',4,1,3.00,1,3.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(128,NULL,'MERMELADA FRESA 3.8KG',4,1,3.80,1,3.800,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(129,NULL,'MERMELADA MELOCOTON 3.8KG',4,1,3.80,1,3.800,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(130,NULL,'MOSTAZA 1KG',4,1,1.00,1,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(131,NULL,'NATA LIQUIDA 1L',2,3,1.00,3,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:16:02','2025-02-18 18:16:02'),(132,NULL,'NUEZ MOSCADA MOLIDA 1KG',3,1,1.00,1,1.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(133,NULL,'OREGANO 1KG',3,1,1.00,1,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(134,NULL,'PALITOS CANGREJO 1KG',2,1,1.00,1,1.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(135,NULL,'PAN RALLADO 5KG',3,1,5.00,1,5.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(136,NULL,'PASTA BRICK 250GR',3,1,0.25,1,0.250,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(137,NULL,'PIMENTON DULCE 1KG',3,1,1.00,1,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(138,NULL,'PIMENTON PICANTE 1KG',3,1,1.00,1,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(139,NULL,'PIMIENTA BLANCA MOLIDA 1KG',3,1,1.00,1,1.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(140,NULL,'PIMIENTA NEGRA GRANO 1KG',3,1,1.00,1,1.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(141,NULL,'PIMIENTA NEGRA MOLIDA 1KG',3,1,1.00,1,1.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(142,NULL,'PIÑA RODAJAS 3KG',4,1,3.00,1,3.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(143,NULL,'PURE PATATA COPOS 5KG',3,1,5.00,1,5.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(144,NULL,'QUESO RALLADO 1KG',2,1,1.00,1,1.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(145,NULL,'ROMERO 1KG',3,1,1.00,1,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(146,NULL,'SAL FINA 1KG',3,1,1.00,1,1.000,NULL,NULL,0.70,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(147,NULL,'SAL GORDA 1KG',3,1,1.00,1,1.000,NULL,NULL,0.70,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(148,NULL,'SALSA BARBACOA 2L',4,3,2.00,3,2.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(149,NULL,'SALSA BECHAMEL 1L',4,3,1.00,3,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(150,NULL,'SALSA BRAVA 2L',4,3,2.00,3,2.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(151,NULL,'SALSA CESAR 1L',4,3,1.00,3,1.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(152,NULL,'SALSA COCKTAIL 2L',4,3,2.00,3,2.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(153,NULL,'SALSA CURRY 2L',4,3,2.00,3,2.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(154,NULL,'SALSA ESPAÑOLA 1L',4,3,1.00,3,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(155,NULL,'SALSA KETCHUP 2L',4,3,2.00,3,2.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(156,NULL,'SALSA ROQUEFORT 1L',4,3,1.00,3,1.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(157,NULL,'SALSA TARTARA 2L',4,3,2.00,3,2.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:17:23','2025-02-18 18:17:23'),(158,NULL,'SALSA TERIYAKI 1L',4,3,1.00,3,1.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(159,NULL,'SALSA TOMATE 3KG',4,1,3.00,1,3.000,NULL,NULL,6.95,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(160,NULL,'SALSA WORCESTER 1L',4,3,1.00,3,1.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(161,NULL,'SETAS TROCEADAS 3KG',4,1,3.00,1,3.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(162,NULL,'SOJA SALSA 1L',4,3,1.00,3,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(163,NULL,'SPAGHETTI 5KG',3,1,5.00,1,5.000,NULL,NULL,14.03,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(164,NULL,'TABASCO 60ML',4,3,0.06,3,0.060,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(165,NULL,'TALLARINES 5KG',3,1,5.00,1,5.000,NULL,NULL,14.03,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(166,NULL,'TAPIOCA 1KG',3,1,1.00,1,1.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(167,NULL,'TOMILLO 1KG',3,1,1.00,1,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(168,NULL,'TOMATE FRITO 3KG',4,1,3.00,1,3.000,NULL,NULL,6.95,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(169,NULL,'TOMATE NATURAL TRITURADO 3KG',4,1,3.00,1,3.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(170,NULL,'TOMATE NATURAL TROCEADO 3KG',4,1,3.00,1,3.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(171,NULL,'VINAGRE BALSAMICO 1L',4,3,1.00,3,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(172,NULL,'VINAGRE BLANCO 5L',4,3,5.00,3,5.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(173,NULL,'VINAGRE JEREZ 1L',4,3,1.00,3,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(174,NULL,'VINAGRE MODENA 1L',4,3,1.00,3,1.000,NULL,NULL,8.63,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(175,NULL,'VINO BLANCO COCINA 1L',4,3,1.00,3,1.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(176,NULL,'VINO TINTO COCINA 1L',4,3,1.00,3,1.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:18:43','2025-02-18 18:18:43'),(177,NULL,'YOGUR NATURAL 1KG',2,1,1.00,1,1.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:21:02','2025-02-18 18:21:02'),(178,NULL,'ZANAHORIA RALLADA 3KG',4,1,3.00,1,3.000,NULL,NULL,6.95,NULL,NULL,'2025-02-18 18:21:02','2025-02-18 18:21:02'),(179,NULL,'ZUMO MANZANA 1L',4,3,1.00,3,1.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:21:02','2025-02-18 18:21:02'),(180,NULL,'ZUMO MELOCOTON 1L',4,3,1.00,3,1.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:21:02','2025-02-18 18:21:02'),(181,NULL,'ZUMO NARANJA 1L',4,3,1.00,3,1.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:21:02','2025-02-18 18:21:02'),(182,NULL,'ZUMO PIÑA 1L',4,3,1.00,3,1.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:21:02','2025-02-18 18:21:02'),(183,'','ABRILLANTADOR LAVAVAJILLAS 10L',5,3,20.00,3,10.000,0.000,0.000,51.53,'2025-05-04','','2025-02-18 18:23:09','2025-05-04 17:58:13'),(184,NULL,'ALCOHOL 96º 1L',5,3,1.00,3,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(185,NULL,'AMBIENTADOR SPRAY 750ML',5,3,0.75,3,0.750,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(186,NULL,'AMONIACO PERFUMADO 2L',5,3,2.00,3,2.000,NULL,NULL,3.50,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(187,NULL,'BAYETA AMARILLA',5,7,1.00,7,1.000,NULL,NULL,1.05,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(188,NULL,'BAYETA AZUL',5,7,1.00,7,1.000,NULL,NULL,1.05,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(189,NULL,'BAYETA VERDE',5,7,1.00,7,1.000,NULL,NULL,1.05,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(190,NULL,'BOBINA INDUSTRIAL',5,7,1.00,7,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(191,NULL,'BOLSA BASURA 52X60',5,7,1.00,7,1.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(192,NULL,'BOLSA BASURA 85X105',5,7,1.00,7,1.000,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(193,NULL,'DESENGRASANTE 5L',5,3,5.00,3,5.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(194,NULL,'DETERGENTE LAVADORA 10KG',5,1,10.00,1,10.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(195,NULL,'DETERGENTE LAVAVAJILLAS 12KG',5,1,12.00,1,12.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(196,NULL,'ESTROPAJO VERDE',5,7,1.00,7,1.000,NULL,NULL,0.70,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(197,NULL,'FREGASUELOS 5L',5,3,5.00,3,5.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(198,NULL,'GEL HIDROALCOHOLICO 5L',5,3,5.00,3,5.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(199,NULL,'GEL LAVAMANOS 5L',5,3,5.00,3,5.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(200,NULL,'GUANTES LATEX TALLA L',5,7,100.00,7,100.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(201,NULL,'GUANTES LATEX TALLA M',5,7,100.00,7,100.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(202,NULL,'GUANTES NITRILO TALLA L',5,7,100.00,7,100.000,NULL,NULL,14.03,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(203,NULL,'GUANTES NITRILO TALLA M',5,7,100.00,7,100.000,NULL,NULL,14.03,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(204,NULL,'JABON LAVAVAJILLAS 5L',5,3,5.00,3,5.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(205,NULL,'LAVAVAJILLAS MANUAL 5L',5,3,5.00,3,5.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(206,NULL,'LEJIA 5L',5,3,5.00,3,5.000,NULL,NULL,6.95,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(207,NULL,'LIMPIADOR MULTIUSOS 5L',5,3,5.00,3,5.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(208,NULL,'PAPEL ALUMINIO 300M',5,7,1.00,7,1.000,NULL,NULL,51.53,NULL,NULL,'2025-02-18 18:23:09','2025-02-18 18:23:09'),(209,NULL,'PAPEL FILM 300M',5,7,1.00,7,1.000,NULL,NULL,19.81,NULL,NULL,'2025-02-18 18:24:29','2025-02-18 18:24:29'),(210,NULL,'PAPEL HIGIENICO',5,7,1.00,7,1.000,NULL,NULL,0.42,NULL,NULL,'2025-02-18 18:24:29','2025-02-18 18:24:29'),(211,NULL,'PAPEL HORNO 40X60',5,7,1.00,7,1.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:24:29','2025-02-18 18:24:29'),(212,NULL,'PAPEL MANOS',5,7,1.00,7,1.000,NULL,NULL,1.75,NULL,NULL,'2025-02-18 18:24:29','2025-02-18 18:24:29'),(213,NULL,'PASTILLA LAVAVAJILLAS',5,7,1.00,7,1.000,NULL,NULL,0.21,NULL,NULL,'2025-02-18 18:24:29','2025-02-18 18:24:29'),(214,NULL,'QUITAGRASAS 750ML',5,3,0.75,3,0.750,NULL,NULL,4.91,NULL,NULL,'2025-02-18 18:24:29','2025-02-18 18:24:29'),(215,NULL,'ROLLO COCINA',5,7,1.00,7,1.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:24:29','2025-02-18 18:24:29'),(216,NULL,'SAL LAVAVAJILLAS 2KG',5,1,2.00,1,2.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:24:29','2025-02-18 18:24:29'),(217,NULL,'SERVILLETA 30X30',5,7,100.00,7,100.000,NULL,NULL,2.45,NULL,NULL,'2025-02-18 18:24:29','2025-02-18 18:24:29'),(218,NULL,'SUAVIZANTE 5L',5,3,5.00,3,5.000,NULL,NULL,11.90,NULL,NULL,'2025-02-18 18:24:29','2025-02-18 18:24:29'),(221,'105088','Salsa Cesar Ybarra Botella 1L x1',NULL,NULL,NULL,NULL,NULL,1.000,NULL,NULL,NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(222,'102867','Uni. Tomate Triturado Dantza 5K -',NULL,NULL,NULL,NULL,NULL,3.000,NULL,NULL,NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(223,'83153','Uni. Tomate Entero Don Ciriaco 5K',NULL,NULL,NULL,NULL,NULL,3.000,NULL,NULL,NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(224,'110461','Lenteja Pardina Extra Grueso 10k x1',NULL,NULL,NULL,NULL,NULL,1.000,NULL,NULL,NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(225,'102970','Caldo Pescado Horeca Muñoz Pujan.1k',NULL,NULL,NULL,NULL,NULL,1.000,NULL,NULL,NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(226,'110516','Compota Manzana-Pera tarr. 100g 36u',NULL,NULL,NULL,NULL,NULL,1.000,NULL,NULL,NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(227,'102847','Galletas M° Gullon Catering 180u P4',NULL,NULL,NULL,NULL,NULL,2.000,NULL,NULL,NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(228,'102849','Gallet Gullon Diet Int.S/A 180u P4',NULL,NULL,NULL,NULL,NULL,1.000,NULL,NULL,NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(229,'103241','Paté Higado Cerdo Louriño L/B40gx1',NULL,NULL,NULL,NULL,NULL,1.000,NULL,NULL,NULL,NULL,'2025-05-02 18:58:54','2025-05-02 18:58:54'),(230,'23002','Leche Desnatada Campesina Br. 1Lx6',NULL,NULL,NULL,NULL,NULL,19.000,4.000,NULL,NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:09:27'),(231,'23012','Leche Entera Campesina Br.1L x6',NULL,NULL,NULL,NULL,NULL,1.000,NULL,NULL,NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(232,'211660','Nectar Piña Disfruta D.Simon 1.5Lx6',NULL,NULL,NULL,NULL,NULL,2.000,NULL,NULL,NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(233,'211670','Nectar Melo. Disfruta D.Simon 1.5Lx6',NULL,NULL,NULL,NULL,NULL,1.000,NULL,NULL,NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(234,'103096','Cacao Soluble Nesquik 3Kx1',NULL,NULL,NULL,NULL,NULL,1.000,NULL,NULL,NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(235,'105779','Fideua Bondore 5K x1',NULL,NULL,NULL,NULL,NULL,1.000,NULL,NULL,NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(236,'82418','Fideos n?0 Bondore 5K x1',NULL,NULL,NULL,NULL,NULL,1.000,NULL,NULL,NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(237,'110830','Aceite Girasol Carrion Pet 5Lx3',3,3,5.00,3,NULL,1.000,0.000,0.00,'2025-05-04','','2025-05-02 19:00:46','2025-05-04 18:00:26'),(238,'110834','Aceite Orujo Carrion Pet 5L x3',3,3,5.00,3,NULL,1.000,0.000,0.00,'2025-05-04','','2025-05-02 19:00:46','2025-05-04 18:04:05'),(239,'110227','Mayonesa Profesional Heinz 5k x1',NULL,NULL,NULL,NULL,NULL,1.000,NULL,NULL,NULL,NULL,'2025-05-02 19:00:46','2025-05-02 19:00:46'),(240,'ACG-001','Aceite Girasol Pet 5L x3',5,2,15.00,2,NULL,2.000,NULL,15.50,'2025-05-03',NULL,'2025-05-03 17:27:11','2025-05-03 17:27:11'),(241,'ANR-003','ACEITUNA NEGRA RODAJA 3KG CONSERVA',4,1,3.00,1,NULL,3.000,NULL,12.30,'2025-05-03',NULL,'2025-05-03 17:27:11','2025-05-03 17:27:11');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_movements`
--

DROP TABLE IF EXISTS `stock_movements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_movements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `delivery_note_item_id` int NOT NULL,
  `dish_product_id` int DEFAULT NULL,
  `movement_type` enum('in','out','adjustment') NOT NULL,
  `quantity` decimal(10,3) NOT NULL,
  `remaining_quantity` decimal(10,3) NOT NULL,
  `movement_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `delivery_note_item_id` (`delivery_note_item_id`),
  KEY `dish_product_id` (`dish_product_id`),
  CONSTRAINT `stock_movements_ibfk_1` FOREIGN KEY (`delivery_note_item_id`) REFERENCES `delivery_note_items` (`id`),
  CONSTRAINT `stock_movements_ibfk_2` FOREIGN KEY (`dish_product_id`) REFERENCES `dish_products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_movements`
--

LOCK TABLES `stock_movements` WRITE;
/*!40000 ALTER TABLE `stock_movements` DISABLE KEYS */;
INSERT INTO `stock_movements` VALUES (3,3,NULL,'in',1.000,1.000,'2025-05-02 18:58:54',NULL,NULL,'2025-05-02 18:58:54'),(4,4,NULL,'in',3.000,3.000,'2025-05-02 18:58:54',NULL,NULL,'2025-05-02 18:58:54'),(5,5,NULL,'in',3.000,3.000,'2025-05-02 18:58:54',NULL,NULL,'2025-05-02 18:58:54'),(6,6,NULL,'in',1.000,1.000,'2025-05-02 18:58:54',NULL,NULL,'2025-05-02 18:58:54'),(7,7,NULL,'in',1.000,1.000,'2025-05-02 18:58:54',NULL,NULL,'2025-05-02 18:58:54'),(8,8,NULL,'in',1.000,1.000,'2025-05-02 18:58:54',NULL,NULL,'2025-05-02 18:58:54'),(9,9,NULL,'in',2.000,2.000,'2025-05-02 18:58:54',NULL,NULL,'2025-05-02 18:58:54'),(10,10,NULL,'in',1.000,1.000,'2025-05-02 18:58:54',NULL,NULL,'2025-05-02 18:58:54'),(11,11,NULL,'in',1.000,1.000,'2025-05-02 18:58:54',NULL,NULL,'2025-05-02 18:58:54'),(12,12,NULL,'in',19.000,19.000,'2025-05-02 19:00:46',NULL,NULL,'2025-05-02 19:00:46'),(13,13,NULL,'in',1.000,1.000,'2025-05-02 19:00:46',NULL,NULL,'2025-05-02 19:00:46'),(14,14,NULL,'in',2.000,2.000,'2025-05-02 19:00:46',NULL,NULL,'2025-05-02 19:00:46'),(15,15,NULL,'in',1.000,1.000,'2025-05-02 19:00:46',NULL,NULL,'2025-05-02 19:00:46'),(16,16,NULL,'in',1.000,1.000,'2025-05-02 19:00:46',NULL,NULL,'2025-05-02 19:00:46'),(17,17,NULL,'in',1.000,1.000,'2025-05-02 19:00:46',NULL,NULL,'2025-05-02 19:00:46'),(18,18,NULL,'in',1.000,1.000,'2025-05-02 19:00:46',NULL,NULL,'2025-05-02 19:00:46'),(19,19,NULL,'in',1.000,1.000,'2025-05-02 19:00:46',NULL,NULL,'2025-05-02 19:00:46'),(20,20,NULL,'in',1.000,1.000,'2025-05-02 19:00:46',NULL,NULL,'2025-05-02 19:00:46'),(21,21,NULL,'in',1.000,1.000,'2025-05-02 19:00:46',NULL,NULL,'2025-05-02 19:00:46'),(22,22,NULL,'in',2.000,2.000,'2025-05-03 17:27:11',NULL,NULL,'2025-05-03 17:27:11'),(23,23,NULL,'in',1.000,1.000,'2025-05-03 17:27:11',NULL,NULL,'2025-05-03 17:27:11'),(24,24,NULL,'in',3.000,3.000,'2025-05-03 17:27:11',NULL,NULL,'2025-05-03 17:27:11');
/*!40000 ALTER TABLE `stock_movements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(20) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `tax_id` varchar(20) DEFAULT NULL,
  `address` text,
  `contact_phone` varchar(20) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `delivery_schedule` text,
  `temperature_requirements` text,
  `sales_rep_name` varchar(100) DEFAULT NULL,
  `sales_rep_id` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,NULL,'DISBESA',NULL,NULL,NULL,'SECO',NULL,NULL,NULL,NULL,'2025-02-20 18:44:37','2025-02-20 18:44:37'),(2,NULL,'LOGIFREST',NULL,NULL,NULL,'CONGELADO',NULL,NULL,NULL,NULL,'2025-02-20 18:44:37','2025-02-20 18:44:37'),(3,NULL,'ABASTHOSUR',NULL,NULL,NULL,'FRESCO',NULL,NULL,NULL,NULL,'2025-02-20 18:44:37','2025-02-20 18:44:37'),(4,NULL,'',NULL,NULL,NULL,'general',NULL,NULL,NULL,NULL,'2025-03-02 14:55:35','2025-03-02 14:55:35'),(5,NULL,'Distribuciones Test',NULL,NULL,NULL,'general',NULL,NULL,NULL,NULL,'2025-05-03 17:27:11','2025-05-03 17:27:11');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tax_summary`
--

DROP TABLE IF EXISTS `tax_summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tax_summary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `delivery_note_id` int NOT NULL,
  `tax_base` decimal(10,2) DEFAULT NULL,
  `tax_rate` decimal(5,2) DEFAULT NULL,
  `tax_amount` decimal(10,2) DEFAULT NULL,
  `mer_amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `delivery_note_id` (`delivery_note_id`),
  CONSTRAINT `tax_summary_ibfk_1` FOREIGN KEY (`delivery_note_id`) REFERENCES `delivery_notes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tax_summary`
--

LOCK TABLES `tax_summary` WRITE;
/*!40000 ALTER TABLE `tax_summary` DISABLE KEYS */;
/*!40000 ALTER TABLE `tax_summary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temperature_logs`
--

DROP TABLE IF EXISTS `temperature_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temperature_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `delivery_note_id` int NOT NULL,
  `temperature` decimal(5,2) DEFAULT NULL,
  `logged_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `delivery_note_id` (`delivery_note_id`),
  CONSTRAINT `temperature_logs_ibfk_1` FOREIGN KEY (`delivery_note_id`) REFERENCES `delivery_notes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temperature_logs`
--

LOCK TABLES `temperature_logs` WRITE;
/*!40000 ALTER TABLE `temperature_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `temperature_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `abbreviation` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,'Kilogramo','KG','2025-02-18 18:00:53','2025-02-18 18:00:53'),(2,'Caja','CAJ','2025-02-18 18:00:53','2025-02-18 18:00:53'),(3,'Litro','L','2025-02-18 18:00:53','2025-02-18 18:00:53'),(4,'Unidad','UD','2025-02-18 18:00:53','2025-02-18 18:00:53'),(5,'Bolsa','BOL','2025-02-18 18:00:53','2025-02-18 18:00:53'),(6,'Paquete','PAQ','2025-02-18 18:00:53','2025-02-18 18:00:53'),(7,'Unidad','UN','2025-02-18 18:22:59','2025-02-18 18:22:59');
/*!40000 ALTER TABLE `units` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-04 21:45:02
