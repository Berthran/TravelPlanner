-- For preparing database i.e for localhost storage(mysql)
CREATE USER IF NOT EXISTS 'traveller'@'localhost' IDENTIFIED BY 'Trave@ller47ss';
CREATE DATABASE IF NOT EXISTS travel_planner;
GRANT ALL PRIVILEGES ON travel_planner.* TO 'traveller'@'localhost';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'traveller'@'localhost';
