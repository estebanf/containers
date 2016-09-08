drop table IF exists analytics_pi;
drop table IF exists analytics_report;
drop table IF exists analytics_report_props;
drop table IF exists analytics_process;

create table analytics_pi (
id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
process_id varchar(255) NOT NULL,
instance_id  BIGINT  NOT NULL,
start_time datetime NOT NULL,
end_time datetime NOT NULL,
duration DOUBLE  NOT NULL,
insert_time datetime NOT NULL
)ENGINE=InnoDB;

create table analytics_report (
process_id varchar(255) NOT NULL PRIMARY KEY,
ps_mean  DOUBLE  NOT NULL,
ps_median  DOUBLE  NOT NULL,
ps_mode  varchar(255)  NOT NULL,
ps_range varchar(255)  NOT NULL,
instance_count  BIGINT  NOT NULL,
insert_time datetime NOT NULL,
update_time datetime NOT NULL,
description varchar(255) NOT NULL
)ENGINE=InnoDB;

create table analytics_report_props (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
process_id varchar(255) NOT NULL,
param varchar(255) NOT NULL,
value varchar(255) NOT NULL
)ENGINE=InnoDB;

create table analytics_process (
id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
process_id varchar(255) UNIQUE NOT NULL,
last_pi_completed datetime NOT NULL,
last_report_calculated datetime NULL,
calculate_ps TINYINT(1) NOT NULL,
report_props_updated TINYINT(1) NOT NULL
)ENGINE=InnoDB;

create index ANALYTICS_PI_IDX on analytics_pi (process_id);
create index ANALYTICS_PROPS_IDX on analytics_report_props (process_id);
