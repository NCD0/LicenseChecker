CREATE DATABASE licenses;
USE licenses;
CREATE TABLE licenses (
    license_key CHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    license_type VARCHAR(50),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP
);
DELIMITER // 

CREATE TRIGGER set_expiry_date 
BEFORE INSERT ON licenses 
FOR EACH ROW 
BEGIN 
    IF NEW.license_type = 'monthly' THEN
        SET NEW.expiry_date = DATE_ADD(NEW.creation_date, INTERVAL 30 DAY);
    ELSEIF NEW.license_type = 'yearly' THEN
        SET NEW.expiry_date = DATE_ADD(NEW.creation_date, INTERVAL 1 YEAR);
    ELSEIF NEW.license_type = 'weekly' THEN
        SET NEW.expiry_date = DATE_ADD(NEW.creation_date, INTERVAL 7 DAY);
    ELSE
        SET NEW.expiry_date = NULL;
    END IF;
END;
// 

DELIMITER ;

-- inserting example licenses
INSERT INTO licenses (license_type) 
VALUES 
    ('monthly'),
    ('yearly'),
    ('weekly');

SELECT * FROM licenses;
--example license:
/*
 {
 license_key = "123e4567-e89b-12d3-a456-426614174000",
 license_type = "monthly",
 creation_date = "2021-01-01 00:00:00",
 expiry_date = "2021-01-31 00:00:00"
 }
 */