drop table IF exists analytics_pi;
drop table IF exists analytics_report;
drop table IF exists analytics_report_props;
drop table IF exists analytics_process;

create table analytics_pi (
id BIGSERIAL NOT NULL PRIMARY KEY,
process_id varchar(255) NOT NULL,
instance_id  int8  NOT NULL,
start_time timestamp NOT NULL,
end_time timestamp NOT NULL,
duration DOUBLE PRECISION  NOT NULL,
insert_time timestamp NOT NULL
);

create table analytics_report (
process_id varchar(255) NOT NULL PRIMARY KEY,
ps_mean  DOUBLE PRECISION  NOT NULL,
ps_median  DOUBLE PRECISION  NOT NULL,
ps_mode  varchar(255)  NOT NULL,
ps_range varchar(255) NOT NULL,
instance_count  int8  NOT NULL,
insert_time timestamp NOT NULL,
update_time timestamp NOT NULL,
description varchar(255) NOT NULL
);

create table analytics_report_props (
id SERIAL NOT NULL PRIMARY KEY,
process_id varchar(255) NOT NULL,
param varchar(255) NOT NULL,
value varchar(255) NOT NULL
);

create table analytics_process (
id SERIAL NOT NULL PRIMARY KEY,
process_id varchar(255) UNIQUE NOT NULL,
last_pi_completed timestamp NOT NULL,
last_report_calculated timestamp NULL,
calculate_ps boolean NOT NULL,
report_props_updated boolean NOT NULL
);

create index ANALYTICS_PI_IDX on analytics_pi (process_id);
create index ANALYTICS_PROPS_IDX on analytics_report_props (process_id);
