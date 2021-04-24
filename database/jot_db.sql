-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 24, 2021 at 01:54 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jot_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `db_admin`
--

CREATE TABLE `db_admin` (
  `adminId` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `fName` varchar(50) NOT NULL,
  `dateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_admin`
--

INSERT INTO `db_admin` (`adminId`, `userName`, `password`, `fName`, `dateTime`, `status`) VALUES
(1, 'admin', 'pbkdf2$10000$0eac84fd234f1856de55910bcb145a8d02dbe26cb8a5126f132982689c389dbcfbbb358a3ce07751d27c152fc9e31600266841c66cb8b974be5e51d3f451a81a$3ea2e40143a99a3e16b920b38709c5a750990e2caeec93e63e619d421393f6d53e0c4c423ac2fd50e153b07fdfe977aeef0cd51129bf7b2a018fa52e31f30248', 'JJ Store', '2020-11-24 12:21:02', 1);

-- --------------------------------------------------------

--
-- Table structure for table `db_category`
--

CREATE TABLE `db_category` (
  `id` int(11) NOT NULL,
  `category` varchar(256) NOT NULL,
  `dateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_category`
--

INSERT INTO `db_category` (`id`, `category`, `dateTime`, `status`) VALUES
(1, 'Maskara', '2020-11-11 17:00:32', 1),
(2, 'Nail Polish', '2020-11-12 17:00:32', 1),
(3, 'Lip Stick', '2020-11-26 17:00:32', 1),
(4, 'Eye Lashes', '2020-11-28 17:00:32', 1),
(5, 'Eye Shadow', '2020-11-28 17:02:41', 1);

-- --------------------------------------------------------

--
-- Table structure for table `db_inventory`
--

CREATE TABLE `db_inventory` (
  `id` int(11) NOT NULL,
  `cat_fk` int(11) NOT NULL,
  `part_no` varchar(128) NOT NULL,
  `part_name` varchar(256) NOT NULL,
  `part_desc` text NOT NULL,
  `cost_price` varchar(32) NOT NULL,
  `quantity` int(11) NOT NULL,
  `part_image` varchar(256) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `manu_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_inventory`
--

INSERT INTO `db_inventory` (`id`, `cat_fk`, `part_no`, `part_name`, `part_desc`, `cost_price`, `quantity`, `part_image`, `date_time`, `status`, `manu_fk`) VALUES
(1, 2, 'PT-1', 'Screw Driver 1.5', '10.99 * 5', '10.99', 5, '2c570570457f59d9a9c691882eb5a1a711094.jpg', '2020-07-22 12:51:15', 1, 2),
(2, 1, 'PT-2', 'Drill', 'Drill 5 Bit', '15.58', 1, '2c570570457f59d9a9c691882eb5a1a739417.jpg', '2020-07-22 12:52:46', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `db_inv_category`
--

CREATE TABLE `db_inv_category` (
  `id` int(11) NOT NULL,
  `category` varchar(256) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_inv_category`
--

INSERT INTO `db_inv_category` (`id`, `category`, `status`) VALUES
(1, 'Maskara', 1),
(2, 'Nail Polish', 1),
(3, 'Lip Stick', 1),
(4, 'Eye Lashes', 1),
(5, 'Eye Shadow', 1);

-- --------------------------------------------------------

--
-- Table structure for table `db_manufacturer`
--

CREATE TABLE `db_manufacturer` (
  `id` int(11) NOT NULL,
  `manufacturer` varchar(128) NOT NULL,
  `dateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` smallint(6) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_manufacturer`
--

INSERT INTO `db_manufacturer` (`id`, `manufacturer`, `dateTime`, `status`) VALUES
(1, 'Sephora', '2020-11-09 11:38:58', 1),
(2, 'Coco Chanel', '2020-11-11 11:38:58', 1),
(3, 'Mac', '2020-11-16 11:38:58', 1),
(4, 'Huda Beauty', '2020-11-29 11:38:58', 1),
(5, 'Lakme', '2020-11-29 12:35:25', 1),
(6, 'Macss', '2020-12-17 21:02:36', 1);

-- --------------------------------------------------------

--
-- Table structure for table `db_products`
--

CREATE TABLE `db_products` (
  `id` int(11) NOT NULL,
  `cat_fk` int(11) NOT NULL,
  `manufacturer_fk` int(11) NOT NULL,
  `sku_no` varchar(256) NOT NULL,
  `p_name` varchar(256) NOT NULL,
  `p_description` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `alloted_quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `dateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_products`
--

INSERT INTO `db_products` (`id`, `cat_fk`, `manufacturer_fk`, `sku_no`, `p_name`, `p_description`, `quantity`, `alloted_quantity`, `price`, `status`, `dateTime`) VALUES
(1, 1, 2, '123Test', 'Test', 'This is for testing', 22, 25, 12, 1, '2020-11-30 20:20:21'),
(5, 1, 1, 'ad', 'fdafadfa', 'fadfa', 1, 22, 12, 1, '2020-12-17 21:52:25');

-- --------------------------------------------------------

--
-- Table structure for table `db_product_images`
--

CREATE TABLE `db_product_images` (
  `id` int(11) NOT NULL,
  `product_fk` int(11) NOT NULL,
  `product_image` varchar(256) NOT NULL,
  `dateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_product_images`
--

INSERT INTO `db_product_images` (`id`, `product_fk`, `product_image`, `dateTime`, `status`) VALUES
(1, 5, '90a05e23683092ffd65eef3a5f931b9048159.png', '2020-12-17 21:52:25', 1),
(2, 5, '90a05e23683092ffd65eef3a5f931b9011813.png', '2020-12-17 21:52:25', 1);

-- --------------------------------------------------------

--
-- Table structure for table `db_users`
--

CREATE TABLE `db_users` (
  `id` int(11) NOT NULL,
  `a_name` varchar(128) NOT NULL,
  `f_name` varchar(128) NOT NULL,
  `l_name` varchar(128) NOT NULL,
  `e_address` varchar(256) NOT NULL,
  `usr_pwd` text NOT NULL,
  `usr_role` smallint(6) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` smallint(6) NOT NULL DEFAULT '1' COMMENT '1 = active and 0 = deactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_users`
--

INSERT INTO `db_users` (`id`, `a_name`, `f_name`, `l_name`, `e_address`, `usr_pwd`, `usr_role`, `date_time`, `status`) VALUES
(1, 'jot', 'Balramjot', 'Saini', 'saini.balramjot@gmail.com', 'pbkdf2$10000$0eac84fd234f1856de55910bcb145a8d02dbe26cb8a5126f132982689c389dbcfbbb358a3ce07751d27c152fc9e31600266841c66cb8b974be5e51d3f451a81a$3ea2e40143a99a3e16b920b38709c5a750990e2caeec93e63e619d421393f6d53e0c4c423ac2fd50e153b07fdfe977aeef0cd51129bf7b2a018fa52e31f30248', 2, '2020-06-23 11:59:28', 1),
(23, 'bsaini', 'Bj', 'Saini', 'balramjot@gmail.com', 'pbkdf2$10000$0eac84fd234f1856de55910bcb145a8d02dbe26cb8a5126f132982689c389dbcfbbb358a3ce07751d27c152fc9e31600266841c66cb8b974be5e51d3f451a81a$3ea2e40143a99a3e16b920b38709c5a750990e2caeec93e63e619d421393f6d53e0c4c423ac2fd50e153b07fdfe977aeef0cd51129bf7b2a018fa52e31f30248', 1, '2020-07-06 12:34:07', 1);

-- --------------------------------------------------------

--
-- Table structure for table `db_user_roles`
--

CREATE TABLE `db_user_roles` (
  `id` int(11) NOT NULL,
  `roles` varchar(128) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_user_roles`
--

INSERT INTO `db_user_roles` (`id`, `roles`, `status`) VALUES
(1, 'CNC Programmer', 1),
(2, 'ShopFloor', 1),
(3, 'Management', 1),
(4, 'IT', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `db_admin`
--
ALTER TABLE `db_admin`
  ADD PRIMARY KEY (`adminId`);

--
-- Indexes for table `db_category`
--
ALTER TABLE `db_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `db_inventory`
--
ALTER TABLE `db_inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `db_inv_category`
--
ALTER TABLE `db_inv_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `db_manufacturer`
--
ALTER TABLE `db_manufacturer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `db_products`
--
ALTER TABLE `db_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `db_product_images`
--
ALTER TABLE `db_product_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `db_users`
--
ALTER TABLE `db_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `db_user_roles`
--
ALTER TABLE `db_user_roles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `db_admin`
--
ALTER TABLE `db_admin`
  MODIFY `adminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `db_category`
--
ALTER TABLE `db_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `db_inventory`
--
ALTER TABLE `db_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `db_inv_category`
--
ALTER TABLE `db_inv_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `db_manufacturer`
--
ALTER TABLE `db_manufacturer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `db_products`
--
ALTER TABLE `db_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `db_product_images`
--
ALTER TABLE `db_product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `db_users`
--
ALTER TABLE `db_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `db_user_roles`
--
ALTER TABLE `db_user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
