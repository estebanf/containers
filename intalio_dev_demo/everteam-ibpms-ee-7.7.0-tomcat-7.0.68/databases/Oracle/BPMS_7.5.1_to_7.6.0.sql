CREATE SEQUENCE ID_pdfgen_data MINVALUE 1 START WITH 1 INCREMENT BY 1;

create table pdfgen_data (
id number(19,0) NOT NULL PRIMARY KEY,
process_id number(19,0),
instance_id number(19,0),
access_url varchar(255) NOT NULL,
content_type varchar(100) NOT NULL,
pdf_stream BLOB,
insert_time timestamp NOT NULL
);

create index PDFGEN_DATA_IDX on pdfgen_data (access_url);

CREATE TABLE tempo_shared_user (element VARCHAR(255), TASK_ID NUMBER);
CREATE TABLE tempo_shared_role (element VARCHAR(255), TASK_ID NUMBER);

CREATE TABLE global_attachment_map (TASK_ID NUMBER, INSTANCE_ID VARCHAR(255), ELEMENT_ID NUMBER);
CREATE INDEX I_GLOBAL__MP_ELEMENT ON global_attachment_map (ELEMENT_ID);
CREATE INDEX I_GLOBAL__MP_TASK_ID ON global_attachment_map (TASK_ID);

ALTER TABLE tempo_attachment_map RENAME COLUMN PATASK_ID TO TASK_ID;
ALTER TABLE tempo_pipa add attachment_type NUMBER(1) NOT NULL;
ALTER TABLE tempo_filter add sharedTo VARCHAR(255);

ALTER TABLE tempo_generic ADD temp VARCHAR2(4000);
UPDATE tempo_generic
  SET temp = DBMS_LOB.SUBSTR (value, 4000),
      value = NULL;

ALTER TABLE tempo_generic DROP COLUMN value;
ALTER TABLE tempo_generic RENAME COLUMN temp TO value;
ALTER TABLE tempo_task add has_attachment NUMBER(1) NOT NULL;

create table BPEL_EVENT_V2 (ID number(19,0) not null, IID number(19,0), PID number(19,0), TYPE varchar2(255 char), DETAIL clob, SID number(19,0), INSERT_TIME timestamp, 
 LINE_NO number(19,0), TIME_STAMP timestamp, PROCESS_ID varchar2(255 char), PROCESS_NAME varchar2(255 char), PORT_TYPE varchar2(255 char), OPERATION varchar2(255 char), MEX_ID varchar2(255 char),
 CORR_KEY_SET clob, PROCESS_INSTANCE_ID number(19,0), STARTTIME number(19,0), COMPLETIONTIME number(19,0), FAULT varchar2(255 char), ROOTSCOPEID number(19,0), SCOPEDECLARATIONID number(19,0), 
 OLDSTATE number(10,0), NEWSTATE number(10,0), ASPECT  number(10,0), PARENT_SCOPE_ID number(19,0), SCOPE_NAME varchar2(255 char), PARENT_SCOPES_NAMES varchar2(255 char), ACTIVITY_NAME varchar2(255 char), 
 ACTIVITY_TYPE varchar2(255 char), ACTIVITY_DECLARATION_ID  number(10,0), ACTIVITY_ID number(19,0), REASON varchar2(255 char), ACTION  varchar2(255 char), CORRELATION_SET_NAME   varchar2(255 char), 
 CORR_KEY   clob, EXPRESSION  varchar2(255 char), RESULT  varchar2(255 char), P_LINK_NAME  varchar2(255 char), SUCCESS number(1,0) , FAULT_LINE_NO number(10,0), EXPLANATION  varchar2(255 char), 
 VAR_NAME  varchar2(255 char), NEW_VALUE  clob,
 MLOCK number(10,0) not null, ADHOC_TASK_ID varchar2(255), PARENT_TASK_ID  varchar2(255), primary key (ID));
 
create index IDX_EVENT_IID     on BPEL_EVENT_V2 (IID);
create index IDX_EVENT_PID ON BPEL_EVENT_V2 (PID);
create index IDX_EVENT_SID ON BPEL_EVENT_V2 (SID);

