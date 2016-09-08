CREATE SEQUENCE ID_analytics_pi MINVALUE 1 START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE ID_analytics_report_props MINVALUE 1 START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE ID_analytics_process MINVALUE 1 START WITH 1 INCREMENT BY 1;

create table analytics_pi (
id number(19,0) NOT NULL PRIMARY KEY,
process_id varchar(255) NOT NULL,
instance_id  number(19,0)  NOT NULL,
start_time timestamp NOT NULL,
end_time timestamp NOT NULL,
duration NUMBER  NOT NULL,
insert_time timestamp NOT NULL
);

create table analytics_report (
process_id varchar(255) NOT NULL PRIMARY KEY,
ps_mean  NUMBER  NOT NULL,
ps_median  NUMBER  NOT NULL,
ps_mode  varchar(255)  NOT NULL,
ps_range varchar(255)  NOT NULL,
instance_count number(19,0) NOT NULL,
insert_time timestamp NOT NULL,
update_time timestamp NOT NULL,
description varchar(255) NOT NULL
);

create table analytics_report_props (
id number(19,0) NOT NULL PRIMARY KEY,
process_id varchar(255) NOT NULL,
param varchar(255) NOT NULL,
value varchar(255) NOT NULL
);

create table analytics_process (
id number(19,0) NOT NULL  PRIMARY KEY,
process_id varchar(255) UNIQUE NOT NULL,
last_pi_completed timestamp NOT NULL,
last_report_calculated timestamp NULL,
calculate_ps NUMBER(2,0) NOT NULL,
report_props_updated NUMBER(2,0) NOT NULL
);

create index ANALYTICS_PI_IDX on analytics_pi (process_id);
create index ANALYTICS_PROPS_IDX on analytics_report_props (process_id);
