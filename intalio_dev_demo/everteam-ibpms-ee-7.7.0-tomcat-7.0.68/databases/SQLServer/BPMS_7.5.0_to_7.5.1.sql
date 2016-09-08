create table analytics_pi (
id numeric(19,0) identity NOT NULL PRIMARY KEY,
process_id varchar(255) NOT NULL,
instance_id  numeric(19,0)  NOT NULL,
start_time datetime NOT NULL,
end_time datetime NOT NULL,
duration DOUBLE PRECISION  NOT NULL,
insert_time datetime NOT NULL
);

create table analytics_report (
process_id varchar(255) NOT NULL PRIMARY KEY,
ps_mean  DOUBLE PRECISION  NOT NULL,
ps_median  DOUBLE PRECISION  NOT NULL,
ps_mode  varchar(255)  NOT NULL,
ps_range varchar(255) NOT NULL,
instance_count numeric(19,0) NOT NULL,
insert_time datetime NOT NULL,
update_time datetime NOT NULL,
description varchar(255) NOT NULL
);

create table analytics_report_props (
id INT identity NOT NULL PRIMARY KEY,
process_id varchar(255) NOT NULL,
param varchar(255) NOT NULL,
value varchar(255) NOT NULL,
);

create table analytics_process (
id numeric(19,0) identity NOT NULL PRIMARY KEY,
process_id varchar(255) UNIQUE NOT NULL,
last_pi_completed datetime NOT NULL,
last_report_calculated datetime,
calculate_ps tinyint NOT NULL,
report_props_updated tinyint NOT NULL
);

create index ANALYTICS_PI_IDX on analytics_pi (process_id);
create index ANALYTICS_PROPS_IDX on analytics_report_props (process_id);
