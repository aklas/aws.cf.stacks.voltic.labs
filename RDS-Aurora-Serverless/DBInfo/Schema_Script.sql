-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema LiveworksDB
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `LiveworksDB` ;

-- -----------------------------------------------------
-- Schema LiveworksDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `LiveworksDB` DEFAULT CHARACTER SET utf8 ;
USE `LiveworksDB` ;

-- -----------------------------------------------------
-- Table `LiveworksDB`.`venue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiveworksDB`.`venue` ;

CREATE TABLE IF NOT EXISTS `LiveworksDB`.`venue` (
  `username` VARCHAR(40) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `business_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LiveworksDB`.`worker`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiveworksDB`.`worker` ;

CREATE TABLE IF NOT EXISTS `LiveworksDB`.`worker` (
  `username` VARCHAR(40) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LiveworksDB`.`employs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiveworksDB`.`employs` ;

CREATE TABLE IF NOT EXISTS `LiveworksDB`.`employs` (
  `venue_username` VARCHAR(40) NOT NULL,
  `worker_username` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`venue_username`, `worker_username`),
  INDEX `worker_username_idx` (`worker_username` ASC),
  CONSTRAINT `venue_username`
    FOREIGN KEY (`venue_username`)
    REFERENCES `LiveworksDB`.`venue` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `worker_username`
    FOREIGN KEY (`worker_username`)
    REFERENCES `LiveworksDB`.`worker` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LiveworksDB`.`job`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiveworksDB`.`job` ;

CREATE TABLE IF NOT EXISTS `LiveworksDB`.`job` (
  `date` DATE NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `hourly_rate` DECIMAL(4,2) UNSIGNED NOT NULL,
  `type` ENUM('PERM', 'TEMP') NOT NULL,
  `venue_username` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`date`, `title`, `venue_username`),
  INDEX `fk_Job_venue1_idx` (`venue_username` ASC),
  CONSTRAINT `fk_Job_venue1`
    FOREIGN KEY (`venue_username`)
    REFERENCES `LiveworksDB`.`venue` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LiveworksDB`.`shift`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiveworksDB`.`shift` ;

CREATE TABLE IF NOT EXISTS `LiveworksDB`.`shift` (
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `positions_required` INT UNSIGNED NOT NULL,
  `job_date` DATE NOT NULL,
  `job_title` VARCHAR(45) NOT NULL,
  `job_venue_username` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`start_time`, `end_time`, `job_date`, `job_title`, `job_venue_username`),
  INDEX `fk_shift_job1_idx` (`job_date` ASC, `job_title` ASC, `job_venue_username` ASC),
  CONSTRAINT `fk_shift_job1`
    FOREIGN KEY (`job_date` , `job_title` , `job_venue_username`)
    REFERENCES `LiveworksDB`.`job` (`date` , `title` , `venue_username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LiveworksDB`.`worker_applies_for_shift`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiveworksDB`.`worker_applies_for_shift` ;

CREATE TABLE IF NOT EXISTS `LiveworksDB`.`worker_applies_for_shift` (
  `worker_username` VARCHAR(32) NOT NULL,
  `shift_start_time` TIME NOT NULL,
  `shift_end_time` TIME NOT NULL,
  `shift_job_date` DATE NOT NULL,
  `shift_job_title` VARCHAR(45) NOT NULL,
  `shift_job_venue_username` VARCHAR(32) NOT NULL,
  `status` ENUM('APPLIED', 'APPROVED', 'CANCELED') NOT NULL,
  PRIMARY KEY (`worker_username`, `shift_start_time`, `shift_end_time`, `shift_job_date`, `shift_job_title`, `shift_job_venue_username`),
  INDEX `fk_worker_has_shift_shift1_idx` (`shift_start_time` ASC, `shift_end_time` ASC, `shift_job_date` ASC, `shift_job_title` ASC, `shift_job_venue_username` ASC),
  INDEX `fk_worker_has_shift_worker1_idx` (`worker_username` ASC),
  CONSTRAINT `fk_worker_has_shift_worker1`
    FOREIGN KEY (`worker_username`)
    REFERENCES `LiveworksDB`.`worker` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_worker_has_shift_shift1`
    FOREIGN KEY (`shift_start_time` , `shift_end_time` , `shift_job_date` , `shift_job_title` , `shift_job_venue_username`)
    REFERENCES `LiveworksDB`.`shift` (`start_time` , `end_time` , `job_date` , `job_title` , `job_venue_username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;