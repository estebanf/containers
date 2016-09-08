create table pdfgen_data (
id numeric(19,0) identity NOT NULL PRIMARY KEY,
process_id integer,
instance_id integer,
access_url varchar(255) NOT NULL,
content_type varchar(100) NOT NULL,
pdf_stream IMAGE,
insert_time datetime NOT NULL
);

create index PDFGEN_DATA_IDX on pdfgen_data (access_url);

CREATE TABLE tempo_shared_user (element VARCHAR(255), TASK_ID BIGINT);
CREATE TABLE tempo_shared_role (element VARCHAR(255), TASK_ID BIGINT);

CREATE TABLE global_attachment_map (TASK_ID BIGINT, INSTANCE_ID VARCHAR(255), ELEMENT_ID BIGINT);
CREATE INDEX I_GLOBAL__MP_ELEMENT ON global_attachment_map (ELEMENT_ID);
CREATE INDEX I_GLOBAL__MP_TASK_ID ON global_attachment_map (TASK_ID);

EXEC sp_RENAME 'tempo_attachment_map.PATASK_ID', 'TASK_ID', 'COLUMN';
ALTER TABLE tempo_pipa add attachment_type BIT NOT NULL;
ALTER TABLE tempo_filter add sharedTo VARCHAR(255);
ALTER TABLE tempo_task add has_attachment BIT NOT NULL;

create table BPEL_EVENT_V2 (ID numeric(19,0) identity not null, IID numeric(19,0) null, PID numeric(19,0) null, TYPE varchar(255) null, DETAIL text null, SID numeric(19,0) null, INSERT_TIME datetime null, 
 LINE_NO numeric(19,0), TIME_STAMP datetime, PROCESS_ID varchar(255), PROCESS_NAME varchar(255), PORT_TYPE varchar(255), OPERATION varchar(255), MEX_ID varchar(255),
 CORR_KEY_SET text, PROCESS_INSTANCE_ID numeric(19,0), STARTTIME numeric(19,0), COMPLETIONTIME numeric(19,0), FAULT varchar(255), ROOTSCOPEID numeric(19,0), SCOPEDECLARATIONID numeric(19,0), 
 OLDSTATE integer, NEWSTATE integer, ASPECT  integer, PARENT_SCOPE_ID numeric(19,0), SCOPE_NAME varchar(255), PARENT_SCOPES_NAMES varchar(255), ACTIVITY_NAME varchar(255), 
 ACTIVITY_TYPE varchar(255), ACTIVITY_DECLARATION_ID  integer, ACTIVITY_ID numeric(19,0), REASON varchar(255), ACTION  varchar(255), CORRELATION_SET_NAME   varchar(255), 
 CORR_KEY   text, EXPRESSION  varchar(255), RESULT  varchar(255), P_LINK_NAME  varchar(255), SUCCESS tinyint , FAULT_LINE_NO integer, EXPLANATION  varchar(255), 
 VAR_NAME  varchar(255), NEW_VALUE  text,
 MLOCK int not null, ADHOC_TASK_ID  varchar(255), PARENT_TASK_ID  varchar(255), primary key (ID));

create index IDX_EVENT_IID     on BPEL_EVENT_V2 (IID);
create index IDX_EVENT_PID ON BPEL_EVENT_V2 (PID);
create index IDX_EVENT_SID ON BPEL_EVENT_V2 (SID);
