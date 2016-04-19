CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `sex` varchar(1) NOT NULL,
  `age` int(11) NOT NULL,
  `diabetes` tinyint(1) NOT NULL,
  `heartattack` tinyint(1) NOT NULL,
  `highbloodpressure` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `provider` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO `ibpms`.`provider` (`id`,`name`,`phone`) VALUES (1,'Memorial Hospital Jacksonville','9046734321');
INSERT INTO `ibpms`.`provider` (`id`,`name`,`phone`) VALUES (2,'Baptist Medical Center Jacksonville','9041231232');
INSERT INTO `ibpms`.`provider` (`id`,`name`,`phone`) VALUES (3,'Wolfson Children hospital','9045667788');
INSERT INTO `ibpms`.`provider` (`id`,`name`,`phone`) VALUES (4,'Nemours','9045621212');
DROP TABLE IF EXISTS MemberActions;
CREATE TABLE MemberActions (ID VARCHAR(250), MEMBERID VARCHAR(250), SEX VARCHAR(250), AGE INTEGER, DIABETES BOOLEAN, HIGHBLOODPRESSURE BOOLEAN, HEARTATTACK BOOLEAN, EDUCATION BOOLEAN, EDUCATIONSTARTDATE DATETIME, EDUCATIONENDDATE DATETIME, PRIMARYCARE BOOLEAN, PRIMARYSTARTDATE DATETIME, PRIMARYENDDATE DATETIME, REFERRAL BOOLEAN, REFERRALSTARTDATE DATETIME, REFERRALENDDATE DATETIME) ENGINE = innodb;
CREATE INDEX MemberActions_KEYS ON MemberActions (ID);
