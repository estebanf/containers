drop table IF exists pdfgen_data;

create table pdfgen_data (
id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
process_id bigint,
instance_id bigint,
access_url varchar(255) NOT NULL,
content_type varchar(100) NOT NULL,
pdf_stream BLOB,
insert_time datetime NOT NULL
)ENGINE=InnoDB;

create index PDFGEN_DATA_IDX on pdfgen_data (access_url);

CREATE TABLE tempo_shared_user (element VARCHAR(255) BINARY, TASK_ID BIGINT) ENGINE=InnoDB;
CREATE TABLE tempo_shared_role (element VARCHAR(255) BINARY, TASK_ID BIGINT) ENGINE=InnoDB;

CREATE TABLE global_attachment_map (TASK_ID BIGINT, INSTANCE_ID VARCHAR(255), ELEMENT_ID BIGINT) ENGINE=InnoDB;
CREATE INDEX I_GLOBAL__MP_ELEMENT ON global_attachment_map (ELEMENT_ID);
CREATE INDEX I_GLOBAL__MP_TASK_ID ON global_attachment_map (TASK_ID);

ALTER TABLE tempo_attachment_map CHANGE PATASK_ID TASK_ID BIGINT;
ALTER TABLE tempo_pipa add column attachment_type tinyint(1) NOT NULL;
ALTER TABLE tempo_filter add column sharedTo VARCHAR(255);
ALTER TABLE tempo_task add column has_attachment tinyint(1) NOT NULL;

create table BPEL_EVENT_V2 (ID bigint not null auto_increment, IID bigint, PID bigint, TYPE varchar(255), DETAIL text, SID bigint, INSERT_TIME datetime, 
 LINE_NO bigint, TIME_STAMP datetime, PROCESS_ID varchar(255), PROCESS_NAME varchar(255), PORT_TYPE varchar(255), OPERATION varchar(255), MEX_ID varchar(255),
 CORR_KEY_SET text, PROCESS_INSTANCE_ID bigint, STARTTIME bigint, COMPLETIONTIME bigint, FAULT varchar(255), ROOTSCOPEID bigint, SCOPEDECLARATIONID bigint, 
 OLDSTATE integer, NEWSTATE integer, ASPECT  integer, PARENT_SCOPE_ID bigint, SCOPE_NAME varchar(255), PARENT_SCOPES_NAMES varchar(255), ACTIVITY_NAME varchar(255), 
 ACTIVITY_TYPE varchar(255), ACTIVITY_DECLARATION_ID  integer, ACTIVITY_ID bigint, REASON varchar(255), ACTION  varchar(255), CORRELATION_SET_NAME   varchar(255), 
 CORR_KEY   text, EXPRESSION  varchar(255), RESULT  varchar(255), P_LINK_NAME  varchar(255), SUCCESS bit , FAULT_LINE_NO integer, EXPLANATION  varchar(255), 
 VAR_NAME  varchar(255), NEW_VALUE  TEXT,
 MLOCK integer not null, ADHOC_TASK_ID  varchar(255), PARENT_TASK_ID  varchar(255), primary key (ID)) TYPE=InnoDB;

create index IDX_EVENT_IID ON BPEL_EVENT_V2 (IID);
create index IDX_EVENT_PID ON BPEL_EVENT_V2(PID);
create index IDX_EVENT_SID ON BPEL_EVENT_V2(SID);
