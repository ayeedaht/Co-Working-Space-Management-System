-- Co-Working Space System (Section 1)
-- 6488120 Suphavadee	Cheng
-- 6488176 Jidapa		Moolkaew
-- 6488179 Ponnapassorn	Iamborisut
-- 6488181 Thadeeya		Duangkaew
-- 6488204 Pimmada		Chompurat
-- 6488210 Ravikarn		Jarungjitvittawas

DROP DATABASE IF EXISTS coworking;
CREATE DATABASE IF NOT EXISTS `coworking`;
USE `coworking`;

CREATE TABLE `user` (
    `user_code` VARCHAR(3) PRIMARY KEY,
    `fname` VARCHAR(100) NOT NULL,
    `lname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255),
    `phone_number` VARCHAR(15),
    `password` VARCHAR(100) NOT NULL
);

CREATE TABLE `coworking_info` (
    `class_code` VARCHAR(10) PRIMARY KEY,
    `class_title` VARCHAR(200) NOT NULL,
    `class_img` TEXT(50000) NOT NULL,
    `class_desc` VARCHAR(500) NOT NULL,
    `class_price` INT NOT NULL,
    `num_people` INT NOT NULL,
    `facilities` TEXT,
    `floor` INT NOT NULL,
    CONSTRAINT `facilities_check` CHECK (CHAR_LENGTH(`facilities`) = 0 OR CHAR_LENGTH(`facilities`) > 1)
);

CREATE TABLE `booking` (
    `class_code` VARCHAR(10),
    `b_room` VARCHAR(200) NOT NULL,
    `b_img` TEXT(50000) NOT NULL,
    `b_desc` VARCHAR(500) NOT NULL,
    `b_date` DATE NOT NULL,
    `b_time` TIME NOT NULL,
    `b_need_equipment` VARCHAR(3) NOT NULL,
    `b_price` INT NOT NULL,
    `status` VARCHAR(20) DEFAULT 'available' NOT NULL, -- Set the default value to 'available'
    FOREIGN KEY (`class_code`) REFERENCES `coworking_info` (`class_code`)
);

CREATE TABLE `booking_equipment` (
    `class_code` VARCHAR(10), -- Foreign key referencing the booking table
    `b_equipment_name` VARCHAR(100),
    `b_equipment_price` INT,
    FOREIGN KEY (`class_code`) REFERENCES `booking` (`class_code`)
);

CREATE TABLE `materials` (
    `material_code` VARCHAR(10) PRIMARY KEY,
    `material_name` VARCHAR(200) NOT NULL,
    `material_description` VARCHAR(500),
    `material_price` INT NOT NULL,
    `material_quantity` INT NOT NULL,
    `material_category` VARCHAR(50) NOT NULL,
    `material_img`  TEXT(50000) NOT NULL
);


INSERT INTO `user` VALUES
("001", "Annie", "Che", "annie@example.com", "123 Main St, City", "123456789", "pass"),
("002", "Dew", "Moo", "dew@example.com", "212 Expo St, Country", "212224236", "pass"),
("003", "Paula", "Iam", "paula@example.com", "456 Oak St, Town", "987654321", "pass"),
("004", "May", "Dua", "may@example.com", "789 Pine St, Village", "555555555", "pass"),
("005", "Wha", "Cho", "wha@example.com", "428 Nestle St, Pacific", "313326339", "pass"),
("006", "Pam", "Jar", "pam@example.com", "541 Rubik St, World", "414428431", "pass");


INSERT INTO `coworking_info` (`class_code`, `class_title`, `class_img`, `class_desc`, `class_price`, `num_people`, `facilities`, `floor`)
VALUES
('C_01', 'Private Office', '/co-img/1.jpg', '2-8 Work Station', 5000, 8, 'Private office, High-speed Internet, Air conditioning', 1),
('C_02', 'Co-Working Space', '/co-img/2.jpg', 'Daily, Weekly, Monthly Usage', 4600, 30, 'Co-working desks, Meeting rooms, Kitchen', 2),
('C_03', 'Meeting Rooms', '/co-img/3.jpg', '6-10 Guests, Hourly Rent', 3800, 10, 'Meeting room, Projector, Whiteboard', 3);

INSERT INTO `materials` VALUES
('M_001', 'Laptop', 'High-performance laptop for professional use', 1200, 10, 'Electronics','/co-img/equip/e1.jpg'),
('M_002', 'Whiteboard', 'Large whiteboard for collaborative work', 150, 5, 'Office Supplies','/co-img/equip/e2.jpg'),
('M_003', 'Microphone', 'High-quality microphone for meetings and presentations', 200, 8, 'Audio Equipment','/co-img/equip/e3.jpg'),
('M_004', 'Pen', 'Black gel pens for smooth writing', 1, 100, 'Office Supplies','/co-img/equip/e4.jpg');

