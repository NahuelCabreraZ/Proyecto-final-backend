CREATE DATABASE  IF NOT EXISTS `dbweb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dbweb`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: dbweb
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `abogados`
--

DROP TABLE IF EXISTS `abogados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abogados` (
  `idabogados` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `matricula` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`idabogados`),
  UNIQUE KEY `idabogados_UNIQUE` (`idabogados`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abogados`
--

LOCK TABLES `abogados` WRITE;
/*!40000 ALTER TABLE `abogados` DISABLE KEYS */;
INSERT INTO `abogados` VALUES (1,'Nahuel Octavio','Cabrera Zembrunski','mp156687','cabrera.nahueloctavio@gmail.com','3764695163','A'),(2,'Jorge Raul','Carballo','mp145551','jorgecarballo@gmail.com','3764899811','A'),(3,'Matias','Obregon','19887531','camerumb@gmail.com','3764552211','A'),(4,'Sebastian','Martinez','mp1455796','sebamartinez@gmail.com','3764123545','A');
/*!40000 ALTER TABLE `abogados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `abogadosxclientes`
--

DROP TABLE IF EXISTS `abogadosxclientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abogadosxclientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_abogado` int NOT NULL,
  `id_cliente` int NOT NULL,
  `fecha` date NOT NULL,
  `estado` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `abogaos_idabogados_idx` (`id_abogado`),
  KEY `clientes_idclientes_idx` (`id_cliente`),
  CONSTRAINT `abogados_idabogados` FOREIGN KEY (`id_abogado`) REFERENCES `abogados` (`idabogados`),
  CONSTRAINT `clientes_idclientes` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`idclientes`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abogadosxclientes`
--

LOCK TABLES `abogadosxclientes` WRITE;
/*!40000 ALTER TABLE `abogadosxclientes` DISABLE KEYS */;
INSERT INTO `abogadosxclientes` VALUES (1,1,1,'2023-02-13',1);
/*!40000 ALTER TABLE `abogadosxclientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `idclientes` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `domicilio` varchar(45) NOT NULL,
  `estado` varchar(1) DEFAULT 'A',
  `fecha_creacion` datetime DEFAULT NULL,
  PRIMARY KEY (`idclientes`),
  UNIQUE KEY `idclientes_UNIQUE` (`idclientes`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'14552668','Jorge','Pereyra','jorgito@gmail.com','3764695588','Allain 3221','A',NULL),(2,'35446887','Juan Gabriel','Garnizo','juancitovalorantpro@gmail.com','3764154578','Allain 4433','B','2023-02-27 19:23:33'),(3,'37599533','Juan Martin','Estigarribia','juanmartin@gmail.com','3755152585','Pedro Mendez 4487','B','2023-03-01 17:09:30');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultas`
--

DROP TABLE IF EXISTS `consultas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultas` (
  `idconsultas` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `domicilio` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `texto` longtext,
  `abogado_vinculado` int DEFAULT NULL,
  `estado` int DEFAULT '1',
  `fecha` timestamp NOT NULL,
  PRIMARY KEY (`idconsultas`),
  KEY `abogado_vinculado_causa_idx` (`abogado_vinculado`),
  CONSTRAINT `abogado_vinculado_causa` FOREIGN KEY (`abogado_vinculado`) REFERENCES `abogados` (`idabogados`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultas`
--

LOCK TABLES `consultas` WRITE;
/*!40000 ALTER TABLE `consultas` DISABLE KEYS */;
/*!40000 ALTER TABLE `consultas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `idlogin` int NOT NULL AUTO_INCREMENT,
  `user` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `id_login_abogado` int DEFAULT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A',
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`idlogin`),
  UNIQUE KEY `idlogin_UNIQUE` (`idlogin`),
  UNIQUE KEY `user_UNIQUE` (`user`),
  UNIQUE KEY `password_UNIQUE` (`password`),
  KEY `id_login_lawyer_idx` (`id_login_abogado`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (6,'nahuel','$2b$10$d60b3XR5xN3XsmWv/iYxF.0k5nwl.TXCnYfUmZD9VeMqTN8w6KnlS',1,'A','2023-02-27 11:34:42'),(7,'jorge','$2b$10$btyLCrqjEMN20IfRKT9u1OSC8Bm0CNfkg9Owgqr5j6AMyuyPMy8TS',1,'A','2023-02-28 14:17:16');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noticias`
--

DROP TABLE IF EXISTS `noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `noticias` (
  `idnoticias` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) NOT NULL,
  `descripcion` longtext,
  `fecha` timestamp NOT NULL,
  `estado` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idnoticias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticias`
--

LOCK TABLES `noticias` WRITE;
/*!40000 ALTER TABLE `noticias` DISABLE KEYS */;
/*!40000 ALTER TABLE `noticias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resoluciones`
--

DROP TABLE IF EXISTS `resoluciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resoluciones` (
  `idresoluciones` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  `texto` longtext NOT NULL,
  `fecha` timestamp NOT NULL,
  `id_abogado_caso` int NOT NULL,
  `estado` int DEFAULT '1',
  PRIMARY KEY (`idresoluciones`),
  KEY `abogado_resoluciones_idx` (`id_abogado_caso`),
  CONSTRAINT `abogado_resoluciones` FOREIGN KEY (`id_abogado_caso`) REFERENCES `abogados` (`idabogados`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resoluciones`
--

LOCK TABLES `resoluciones` WRITE;
/*!40000 ALTER TABLE `resoluciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `resoluciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacaciones`
--

DROP TABLE IF EXISTS `vacaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacaciones` (
  `idvacaciones` int NOT NULL AUTO_INCREMENT,
  `abogado_vacaciones` int DEFAULT NULL,
  `estado` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idvacaciones`),
  KEY `lawyer_holydays_idx` (`abogado_vacaciones`),
  CONSTRAINT `lawyer_holydays` FOREIGN KEY (`abogado_vacaciones`) REFERENCES `abogados` (`idabogados`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacaciones`
--

LOCK TABLES `vacaciones` WRITE;
/*!40000 ALTER TABLE `vacaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `vacaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'dbweb'
--

--
-- Dumping routines for database 'dbweb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-02 16:16:32
