-- For preparing database i.e for localhost storage(mysql)
CREATE USER 'traveller'@'localhost' IDENTIFIED BY 'traveller';
CREATE DATABASE travel_planner;
GRANT ALL PRIVILEGES ON travel_planner.* TO 'traveller'@'localhost';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'traveller'@'localhost';
