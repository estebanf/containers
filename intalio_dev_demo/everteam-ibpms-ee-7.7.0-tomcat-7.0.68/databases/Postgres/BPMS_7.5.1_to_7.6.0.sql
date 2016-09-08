drop table IF exists pdfgen_data;

create table pdfgen_data (
id BIGSERIAL NOT NULL PRIMARY KEY,
process_id int8,
instance_id int8,
access_url varchar(255) NOT NULL,
content_type varchar(100) NOT NULL,
pdf_stream BYTEA,
insert_time  timestamp NOT NULL
);

create index PDFGEN_DATA_IDX on pdfgen_data (access_url);

CREATE TABLE tempo_shared_user (element VARCHAR(255), TASK_ID int8);
CREATE TABLE tempo_shared_role (element VARCHAR(255), TASK_ID int8);

CREATE TABLE global_attachment_map (TASK_ID int8, INSTANCE_ID VARCHAR(255), ELEMENT_ID int8);
CREATE INDEX I_GLOBAL__MP_ELEMENT ON global_attachment_map (ELEMENT_ID);
CREATE INDEX I_GLOBAL__MP_TASK_ID ON global_attachment_map (TASK_ID);

ALTER TABLE tempo_attachment_map RENAME COLUMN PATASK_ID TO TASK_ID;
ALTER TABLE tempo_pipa add column attachment_type boolean;
ALTER TABLE tempo_filter add column sharedTo VARCHAR(255);
ALTER TABLE tempo_task add column has_attachment boolean;

create table BPEL_EVENT_V2 (ID int8 not null, IID int8, PID int8, TYPE varchar(255), DETAIL text, SID int8, INSERT_TIME timestamp, 
 LINE_NO int8, TIME_STAMP timestamp, PROCESS_ID varchar(255), PROCESS_NAME varchar(255), PORT_TYPE varchar(255), OPERATION varchar(255), MEX_ID varchar(255),
 CORR_KEY_SET text, PROCESS_INSTANCE_ID int8, STARTTIME int8, COMPLETIONTIME int8, FAULT varchar(255), ROOTSCOPEID int8, SCOPEDECLARATIONID int8, 
 OLDSTATE integer, NEWSTATE integer, ASPECT  integer, PARENT_SCOPE_ID int8, SCOPE_NAME varchar(255), PARENT_SCOPES_NAMES varchar(255), ACTIVITY_NAME varchar(255), 
 ACTIVITY_TYPE varchar(255), ACTIVITY_DECLARATION_ID  integer, ACTIVITY_ID int8, REASON varchar(255), ACTION  varchar(255), CORRELATION_SET_NAME   varchar(255), 
 CORR_KEY   text, EXPRESSION  varchar(255), RESULT  varchar(255), P_LINK_NAME  varchar(255), SUCCESS bool , FAULT_LINE_NO integer, EXPLANATION  varchar(255), 
 VAR_NAME  varchar(255), NEW_VALUE  TEXT,
 MLOCK int4 not null, ADHOC_TASK_ID  varchar(255), PARENT_TASK_ID  varchar(255), primary key (ID));

create index IDX_EVENT_IID     on BPEL_EVENT_V2 (IID);
create index IDX_EVENT_PID ON BPEL_EVENT_V2 (PID);
create index IDX_EVENT_SID ON BPEL_EVENT_V2 (SID);
