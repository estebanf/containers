create table filterprocesses (id number(19,0) not null, processName varchar2(255 char), filterId number(19,0) not null, primary key (id));

create table filterproperties (id number(19,0) not null, name varchar2(255 char), value varchar2(255 char), filterId number(19,0) not null, primary key (id));

create table filters (filterId number(19,0) not null, createdAfter varchar2(255 char), createdBefore varchar2(255 char), lastActiveAfter varchar2(255 char), lastActiveBefore varchar2(255 char), anyProcess number(8,0), anyState number(8,0), name varchar2(50), userName varchar2(50), primary key (filterId));

create table filterstates (id number(19,0) not null, stateId number(19,0) not null, filterId number(19,0) not null, primary key (id));

create table adminauditlog (id number(19,0) not null, processid varchar(255 char),  packagename varchar(255 char), version number(19,0), action varchar(50 char), username varchar(50 char), clientipaddress varchar(255 char), created timestamp, primary key (id));

create table states (id number(19,0), name varchar2(255 char), primary key (id));

create table intalio_audit( value varchar2(2000 char));

alter table filterprocesses add constraint FKD2D7E6E5B5873866 foreign key (filterId) references filters (filterId);
alter table filterproperties add constraint FK37C862ABB5873866 foreign key (filterId) references filters (filterId);
alter table filterstates add constraint FKB5BE1F7AB5873866 foreign key (filterId) references filters (filterId);
alter table filterstates add constraint FKB5BE1F7AA82EC42 foreign key (stateId) references states (id);

alter table filters add processState varchar2(20) default '';
alter table filters add isProcess number(2,0) default 0;

insert into states(ID, NAME) values(1, 'Active');
insert into states(ID, NAME) values(2, 'Suspended');
insert into states(ID, NAME) values(3, 'Terminated');
insert into states(ID, NAME) values(4, 'Completed');
insert into states(ID, NAME) values(5, 'Failed');
insert into states(ID, NAME) values(6, 'Failure');

create table ahr_report(report_id NUMBER NOT NULL, name VARCHAR(100) NOT NULL, description VARCHAR(1000), location VARCHAR(1000) NOT NULL, created_on TIMESTAMP NOT NULL, modified_on TIMESTAMP NOT NULL, is_executable NUMBER(2,0) NOT NULL, owner VARCHAR(100) NOT NULL, PRIMARY KEY(report_id));
create table ahr_shared_report(access_id NUMBER NOT NULL, shared_to VARCHAR(100) NOT NULL, report_id NUMBER NOT NULL, is_role NUMBER(2,0) NOT NULL, PRIMARY KEY(access_id));
CREATE TABLE tempo_acl (id NUMBER NOT NULL, action VARCHAR2(255), DTYPE VARCHAR2(255), PRIMARY KEY (id));
CREATE TABLE tempo_acl_map (TASK_ID NUMBER, ELEMENT_ID NUMBER);
CREATE TABLE tempo_attachment (id NUMBER NOT NULL, payload_url VARCHAR2(255), METADATA_ID NUMBER, PRIMARY KEY (id));
CREATE TABLE tempo_attachment_map (PATASK_ID NUMBER, ELEMENT_ID NUMBER);
CREATE TABLE tempo_attachment_meta (id NUMBER NOT NULL, creation_date TIMESTAMP, description VARCHAR2(255), file_name VARCHAR2(255), mime_type VARCHAR2(255), title VARCHAR2(255), widget VARCHAR2(255), PRIMARY KEY (id));
CREATE TABLE tempo_notification (id NUMBER NOT NULL, failure_code VARCHAR2(255), failure_reason VARCHAR2(255), input_xml CLOB, instanceId VARCHAR2(255), priority NUMBER, process_id VARCHAR2(255), state NUMBER, PRIMARY KEY (id));
CREATE TABLE tempo_pa (id NUMBER NOT NULL, complete_soap_action VARCHAR2(255), deadline TIMESTAMP, failure_code VARCHAR2(255), failure_reason VARCHAR2(255), input_xml CLOB, instance_id VARCHAR2(255), is_chained_before NUMBER, output_xml CLOB, previous_task_id VARCHAR2(255), priority NUMBER, process_id VARCHAR2(255), state NUMBER, ctm_xml CLOB, PRIMARY KEY (id));
CREATE TABLE tempo_pipa (id NUMBER NOT NULL, init_message VARCHAR2(255), init_soap VARCHAR2(255), process_endpoint VARCHAR2(1024), PRIMARY KEY (id),process_state NUMBER);
CREATE TABLE tempo_role (ACL_ID NUMBER, element VARCHAR2(255), TASK_ID NUMBER);
CREATE TABLE tempo_task (id NUMBER NOT NULL, creation_date TIMESTAMP, description VARCHAR2(255), form_url VARCHAR2(255), taskid VARCHAR2(255), internal_id NUMBER, PRIMARY KEY (id));
CREATE TABLE tempo_user (ACL_ID NUMBER, element VARCHAR2(255), TASK_ID NUMBER);
CREATE TABLE tempo_generic (ACL_ID NUMBER, key0 VARCHAR2(255), value VARCHAR2(4000), PATASK_ID NUMBER);
CREATE TABLE tempo_custom_column (id NUMBER NOT NULL, custom_column_name VARCHAR2(45), project_name VARCHAR2(45), project_namespace VARCHAR2(45), PRIMARY KEY (id));
CREATE TABLE tempo_pipa_output (id NUMBER NOT NULL, task_id VARCHAR2(255) NOT NULL, user_owner VARCHAR2(255) NOT NULL,  output_xml CLOB, PRIMARY KEY (id));
CREATE TABLE tempo_audit(id NUMBER NOT NULL, action_performed VARCHAR(255), audit_date TIMESTAMP, task_id VARCHAR(255), user_name VARCHAR(255), updated_description VARCHAR(255), updated_priority VARCHAR(255), assigned_users VARCHAR(255), assigned_roles VARCHAR(255), updated_state VARCHAR(255), instance_id NUMBER, PRIMARY KEY (id));
CREATE TABLE tempo_prev_owners (TASK_ID VARCHAR(255) NOT NULL, prev_users VARCHAR(255), prev_roles VARCHAR(255));
CREATE TABLE tempo_adhoc (TASK_ID NUMBER NOT NULL, PATASK_ID NUMBER NOT NULL, formType NUMBER, placement NUMBER, note VARCHAR2(4000));
CREATE INDEX I_TMPO_CL_DTYPE ON tempo_acl (DTYPE);
CREATE INDEX I_TMP__MP_ELEMENT ON tempo_acl_map (ELEMENT_ID);
CREATE INDEX I_TMP__MP_TASK_ID ON tempo_acl_map (TASK_ID);
CREATE INDEX I_TMP_MNT_METADATA ON tempo_attachment (METADATA_ID);
CREATE INDEX I_TMP__MP_ELEMENT1 ON tempo_attachment_map (ELEMENT_ID);
CREATE INDEX I_TMP__MP_PATASK_ID ON tempo_attachment_map (PATASK_ID);
CREATE INDEX I_TMP_ROL_ACL_ID ON tempo_role (ACL_ID);
CREATE INDEX I_TMP_ROL_TASK_ID ON tempo_role (TASK_ID);
CREATE INDEX I_TMP_USR_ACL_ID ON tempo_user (ACL_ID);
CREATE INDEX I_TMP_USR_TASK_ID ON tempo_user (TASK_ID);
CREATE INDEX I_TMP_TG_PATASK_ID ON tempo_generic (PATASK_ID);
CREATE INDEX I_TMP_OWNR_TASK_ID ON tempo_prev_owners (TASK_ID);
CREATE INDEX I_TMP_PA_PIID on tempo_pa (instance_id);
CREATE INDEX I_TMP_ADHOC_ID ON tempo_adhoc (TASK_ID);
alter table tempo_audit ADD (variable_name VARCHAR(255),prev_var_data blob,new_var_data  blob,audit_type VARCHAR(25));
alter table tempo_task ADD last_active_date TIMESTAMP;
alter table tempo_task ADD last_assigned_date TIMESTAMP;

CREATE TABLE tempo_filter (filter_id NUMBER NOT NULL, filter_name VARCHAR(255) NOT NULL, states VARCHAR(255), priorities VARCHAR(255), users VARCHAR(1000), roles VARCHAR(1000), project_name VARCHAR(255), custom_column NUMBER, created_user VARCHAR(255) NOT NULL, deadline VARCHAR(255),process_id VARCHAR(255),creation_date VARCHAR(255), PRIMARY KEY (filter_id));
CREATE INDEX I_TMP_FILTER_USER ON tempo_filter(created_user);

create table tempo_pending_task(taskID varchar(255) PRIMARY KEY, status smallint default 0, insert_time timestamp default CURRENT_TIMESTAMP, last_updated timestamp);
CREATE TABLE tempo_shared_user (element VARCHAR(255), TASK_ID NUMBER);
CREATE TABLE tempo_shared_role (element VARCHAR(255), TASK_ID NUMBER);

CREATE TABLE global_attachment_map (TASK_ID NUMBER, INSTANCE_ID VARCHAR(255), ELEMENT_ID NUMBER);
CREATE INDEX I_GLOBAL__MP_ELEMENT ON global_attachment_map (ELEMENT_ID);
CREATE INDEX I_GLOBAL__MP_TASK_ID ON global_attachment_map (TASK_ID);

ALTER TABLE tempo_attachment_map RENAME COLUMN PATASK_ID TO TASK_ID;
ALTER TABLE tempo_pipa add attachment_type NUMBER(1) NOT NULL;
ALTER TABLE tempo_filter add sharedTo VARCHAR(255);
ALTER TABLE tempo_task add has_attachment NUMBER(1) NOT NULL;
ALTER TABLE tempo_pa add isAdhoc NUMBER(1) NOT NULL DEFAULT 0;
ALTER TABLE tempo_pa add allowAdhoc NUMBER(1) NOT NULL DEFAULT 1;
ALTER TABLE tempo_pa add adhocIndex NUMBER NOT NULL DEFAULT 0;

ALTER TABLE tempo_audit add is_adhoc NUMBER(1) NOT NULL DEFAULT 0;

create table intalio_config(
		configId NUMBER,
		groupType varchar2(100) NOT NULL,
		name  varchar2(100) NOT NULL,
		value varchar2(100),
		primary key (configId)
	);

create table intalio_user_profile(
		userId varchar2(100),
		salutation NUMBER,
		name varchar2(200),
		dob  DATE,
		gender NUMBER,
		department varchar2(200),
		email varchar2(100),
		secondaryEmail varchar2(100),
		mobile varchar2(50),
		phone varchar2(50),
		street varchar2(100),
		address varchar2(100),
		city  varchar2(100),
		state  varchar2(100),
		country NUMBER,
		zip varchar2(10),
		image blob,
		imageContentType varchar2(50),
		skills varchar2(1000),
		loginTime TIMESTAMP,
		primary key (userId)
	);

create table intalio_user_preferences(
		userId varchar2(200),
		fixedHeader NUMBER,
		topMenu NUMBER,
		fontStyle varchar2(100),
		dateFormat varchar2(50),
		theme varchar2(50),
		primary key (userId)
	);

create index INTALIO_CONFIG_NAME_IDX on intalio_config (name);

insert into intalio_config(configId,groupType,name,value) values(1,'User Profile','userId','false');
insert into intalio_config(configId,groupType,name,value) values(2,'User Profile','salutation','true');
insert into intalio_config(configId,groupType,name,value) values(3,'User Profile','name','false');
insert into intalio_config(configId,groupType,name,value) values(4,'User Profile','dob','true');
insert into intalio_config(configId,groupType,name,value) values(5,'User Profile','gender','true');
insert into intalio_config(configId,groupType,name,value) values(6,'User Profile','department','false');
insert into intalio_config(configId,groupType,name,value) values(7,'User Profile','email','true');
insert into intalio_config(configId,groupType,name,value) values(8,'User Profile','secondaryEmail','true');
insert into intalio_config(configId,groupType,name,value) values(9,'User Profile','mobile','true');
insert into intalio_config(configId,groupType,name,value) values(10,'User Profile','phone','true');
insert into intalio_config(configId,groupType,name,value) values(11,'User Profile','address','true');
insert into intalio_config(configId,groupType,name,value) values(12,'User Profile','street','true');
insert into intalio_config(configId,groupType,name,value) values(13,'User Profile','city','true');
insert into intalio_config(configId,groupType,name,value) values(14,'User Profile','state','true');
insert into intalio_config(configId,groupType,name,value) values(15,'User Profile','country','true');
insert into intalio_config(configId,groupType,name,value) values(16,'User Profile','zip','true');
insert into intalio_config(configId,groupType,name,value) values(17,'User Profile','image','true');
insert into intalio_config(configId,groupType,name,value) values(18,'User Profile','skills','true');
insert into intalio_config(configId,groupType,name,value) values(19,'User Profile','lastLogin','false');
insert into intalio_config(configId,groupType,name,value) values(20,'User Profile','roles','false');
insert into intalio_config(configId,groupType,name,value) values(21,'User Profile','manager','false');

create table intalio_salutation(id NUMBER , value varchar2(10) NOT NULL, primary key (id));
create table intalio_gender(id NUMBER , value varchar2(10) NOT NULL, primary key (id));
create table intalio_country(id NUMBER , value varchar2(100) NOT NULL, primary key (id));

insert into intalio_salutation(id, value) values(1,'Mr');
insert into intalio_salutation(id, value) values(2,'Ms');
insert into intalio_salutation(id, value) values(3,'Mrs');
insert into intalio_salutation(id, value) values(4,'Dr');
insert into intalio_salutation(id, value) values(5,'Prof');
insert into intalio_salutation(id, value) values(6,'Sir');

insert into intalio_gender(id, value) values(1,'Male');
insert into intalio_gender(id, value) values(2,'Female');
insert into intalio_gender(id, value) values(3,'Others');

insert into intalio_country(id, value) values(1,'Australia');
insert into intalio_country(id, value) values(2,'Brazil');
insert into intalio_country(id, value) values(3,'India');
insert into intalio_country(id, value) values(4,'United Kingdom');
insert into intalio_country(id, value) values(5,'United States');

create table collab_repository (
	id number(11,0) NOT NULL,
	name varchar2(100),
	created_by varchar2(50),
	created_date timestamp NOT NULL,
	modified_by varchar2(50),
	modified_date timestamp,
	status number(2,0),
	primary key (id)
);
create table collab_project (
	id number(11,0) NOT NULL,
	repo_name varchar2(100),
	name varchar2(100),
	description varchar2(400),
	created_by varchar2(50),
	created_date timestamp  NOT NULL,
	modified_by varchar2(50),
	modified_date timestamp,
	status number(2,0),
	primary key (id)
);
create table collab_branch (
	id number(11,0) NOT NULL,
	repo_name varchar2(100),
        project_name varchar2(100),
	name varchar2(100),
	created_date timestamp  NOT NULL,
	created_by varchar2(50),
	modified_date timestamp,
	modified_by varchar2(50),
	in_sync number(2,0),
	status number(2,0),
	head_commit_id varchar2(255),
	primary key (id)
);
create table collab_resource (
	id number(11,0) NOT NULL,
	repo_name varchar2(100),
        project_name varchar2(100),
	branch_name varchar2(100),
	name varchar2(1000),
	created_by varchar2(50),
	created_date timestamp  NOT NULL,
	modified_by varchar2(50),
	modified_date timestamp,
	status number(2,0),
	latest_commit_id varchar2(255),
	renamed_to number(11,0),
	lock_id number(11,0),
	primary key (id)
);
create table collab_commit (
	id varchar2(255) NOT NULL,
	repo_name varchar2(100),
        project_name varchar2(100),
	branch_name varchar2(100),
	commit_message varchar2(1000),
	commited_by varchar2(50),
	commited_date number(20,0) NOT NULL,
	modified_by varchar2(50),
	modified_date timestamp,
	status number(2,0),
	commit_path varchar2(1000),
	primary key (id)
);
create table collab_lock (
	id number(11,0) NOT NULL,
	locked_by varchar2(50),
	locked_date timestamp  NOT NULL,
	unlocked_by varchar2(50),
	unlocked_date timestamp,
	workspace_id varchar2(255),
	status number(2,0),
	primary key (id)
);
create table collab_commit_detail (
	id number(11,0) NOT NULL,
	commit_id varchar2(255),
	resource_id number(11,0),
	status number(2,0),
	primary key (id)
);
CREATE TABLE collab_tag (
	id number(11,0) NOT NULL,
	repo_name varchar2(100),
        project_name varchar2(100),
	branch_name varchar2(100),
	tag_name varchar2(100),
	description varchar2(400),
	commit_id varchar2(255),
	tagged_by varchar2(50),
	tagged_date timestamp  NOT NULL,
	modified_by varchar2(50),
	modified_date timestamp,
	status number(2,0),
	primary key (id)
);

insert into collab_repository values(1, 'Intalio', 'intalio\admin', SYSDATE, 'intalio\admin', SYSDATE, 4);

create index idxCRRepoId on collab_resource (repo_name);

create index idxCRProjId on collab_resource (project_name);

create index idxCRBranchId on collab_resource (branch_name);

create index idxCCRepoId on collab_commit (repo_name);

create index idxCCProjId on collab_commit (project_name);

create index idxCCBranchId on collab_commit (branch_name);

create index idxCRMCommitId on collab_commit_detail (commit_id);

create index idxCRMResourceId on collab_commit_detail (resource_id);

create table intalio_org_realm(
		realm_id varchar(200) PRIMARY KEY
	);

create table intalio_org_user(
		user_id varchar(200) PRIMARY KEY,
		realm varchar(100) NOT NULL,
		identifier  varchar(100)  NOT NULL,
		display_name varchar(100),
		first_name varchar(100),
		last_name varchar(100),
		last_imported timestamp NOT NULL,
		last_updated timestamp NOT NULL,
		last_sync timestamp NULL,
		lft int,
		rgt int
	);

create table intalio_org_role(
		role_id VARCHAR(200),
		realm VARCHAR(100) NOT NULL,
		identifier VARCHAR(100) NOT NULL,
		description VARCHAR(500),
		role_type int NOT NULL,
		last_imported timestamp NOT NULL,
		last_updated  timestamp NOT NULL,
		last_sync timestamp NULL,
		PRIMARY KEY(role_id, role_type)
	);

create table intalio_org_user_role(
		user_id varchar(200)  NOT NULL,
		role_id varchar(200)  NOT NULL,
		role_type int NOT NULL,
		PRIMARY KEY(user_id,role_id, role_type),
		FOREIGN KEY (user_id) references intalio_org_user(user_id),
		FOREIGN KEY (role_id, role_type) references intalio_org_role(role_id, role_type)
	);

insert into intalio_org_realm(realm_id) values('apac');


insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('ROOT', 'intalio', 'ROOT', 'ROOT', 'ROOT', 'ROOT', SYSDATE, SYSDATE, 1, 34);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\adam', 'intalio', 'adam', 'Adam Smith', 'Adam', 'Smith', SYSDATE, SYSDATE, 2, 3);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\bob', 'intalio', 'bob', 'Bob Leonardo', 'Bob', 'Leonardo', SYSDATE, SYSDATE, 4, 9);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\henry', 'intalio', 'henry', 'Henry Williams', 'Henry', 'Williams', SYSDATE, SYSDATE, 5, 6);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\philip', 'intalio', 'philip', 'Philip Miller', 'Philip', 'Miller', SYSDATE, SYSDATE, 7, 8);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\msmith', 'examples', 'msmith', 'Michael Smith', 'Michael', 'Smith', SYSDATE, SYSDATE, 10, 15);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\mark', 'intalio', 'mark', 'Mark Msmith', 'Mark', 'Msmith', SYSDATE, SYSDATE, 11, 12);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\david', 'examples', 'david', 'David Cooper', 'David', 'Cooper', SYSDATE, SYSDATE, 13, 14);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\ewilliams', 'examples', 'ewilliams', 'Emily Williams', 'Emily', 'Williams', SYSDATE, SYSDATE, 16, 23);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\roger', 'examples', 'roger', 'Roger Baker', 'Roger', 'Baker', SYSDATE, SYSDATE, 17, 18);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\ellen', 'examples', 'ellen', 'Ellen Scott', 'Ellen', 'Scott', SYSDATE, SYSDATE, 19, 20);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\daniel', 'examples', 'daniel', 'Daniel Clark', 'Daniel', 'Clark', SYSDATE, SYSDATE, 21, 22);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\admin', 'intalio', 'admin', 'System Administrator', 'System', 'Administrator', SYSDATE, SYSDATE, 24, 33);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\jones', 'intalio', 'jones', 'Jones Jackson', 'Jones', 'Jackson', SYSDATE, SYSDATE, 25, 26);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\john', 'intalio', 'john', 'John Parker', 'John', 'Parker', SYSDATE, SYSDATE, 27, 28);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\james', 'intalio', 'james', 'James Hunt', 'James', 'Hunt', SYSDATE, SYSDATE, 29, 30);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\nancy', 'examples', 'nancy', 'Nancy Wilson', 'Nancy', 'Wilson', SYSDATE, SYSDATE, 31, 32);


insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) values('examples\employee', 'examples', 'employee', 'Employee', 1, SYSDATE, SYSDATE);
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) values('examples\manager', 'examples', 'manager', 'Manager', 1, SYSDATE, SYSDATE);
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) values('intalio\CollabAdministrator', 'intalio', 'CollabAdministrator', 'Collaboration Administrator', 1, SYSDATE, SYSDATE);
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) 
values('intalio\CollabDeveloper', 'intalio', 'CollabDeveloper', 'Collaboration Developer', 1, SYSDATE, SYSDATE);
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) values('intalio\eng', 'intalio', 'eng', 'Test Role', 1, SYSDATE, SYSDATE);
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) 
values('intalio\ProcessAdministrator', 'intalio', 'ProcessAdministrator', 'ProcessAdministrator Role', 1, SYSDATE, SYSDATE);
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) 
values('intalio\ProcessManager', 'intalio', 'ProcessManager', 'Process Manager', 1, SYSDATE, SYSDATE);
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) 
values('intalio\WorkflowAdministrator', 'intalio', 'WorkflowAdministrator', 'Tempo Workflow Administrator', 1, SYSDATE, SYSDATE);
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated)
values('intalio\ReportAdministrator', 'intalio', 'ReportAdministrator', 'Report Administrator', 1, SYSDATE, SYSDATE);
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated)
values('intalio\BREAdministrator', 'intalio', 'BREAdministrator', 'Business Rules Administrator', 1, SYSDATE, SYSDATE);


insert into intalio_org_user_role(user_id, role_id, role_type) values('examples\daniel','examples\manager',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('examples\david','intalio\CollabDeveloper',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('examples\ellen','examples\employee',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('examples\ewilliams','examples\manager',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('examples\msmith','examples\employee',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('examples\nancy','intalio\eng',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('examples\roger','examples\employee',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\admin','examples\manager',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\admin','intalio\CollabAdministrator',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\admin','intalio\ProcessAdministrator',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\admin','intalio\WorkflowAdministrator',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\admin','intalio\ReportAdministrator',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\admin','intalio\BREAdministrator',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\adam','intalio\eng',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\henry','examples\manager',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\james','intalio\CollabDeveloper',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\john','intalio\eng',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\jones','intalio\CollabDeveloper',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\bob','examples\employee',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\bob','examples\manager',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\bob','intalio\ProcessManager',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\mark','intalio\eng',1);
insert into intalio_org_user_role(user_id, role_id, role_type) values('intalio\philip','examples\employee',1);

create index ORG_USER_NAME_IDX on intalio_org_user (identifier);
create index ORG_ROLE_NAME_IDX on intalio_org_role (identifier);
create index ORG_ROLE_TYPE_IDX on intalio_org_role (role_type);
create index ORG_USER_ROLE_IDX on intalio_org_user_role (user_id);
create index ORG_ROLE_USER_IDX on intalio_org_user_role (role_id);

CREATE TABLE OPENJPA_SEQUENCE_TABLE (ID NUMBER NOT NULL, SEQUENCE_VALUE NUMBER, PRIMARY KEY (ID));
CREATE TABLE TEMPO_ITEM (id NUMBER NOT NULL, content_type VARCHAR2(255), lastmodified TIMESTAMP, payload BLOB, uri VARCHAR2(255), PRIMARY KEY (id));
CREATE INDEX I_TEMPO_ITEM_URI on TEMPO_ITEM(uri);
create table social_comments(
	commentID NUMBER NOT NULL,
	refCommentTypeId NUMBER,
	threadId VARCHAR2(255),
	createdBy VARCHAR2(50),
	createdDate TIMESTAMP,
	commentText VARCHAR2(4000),
	PRIMARY KEY (commentID)
	);
create table social_comments_type(
	commentTypeId NUMBER NOT NULL,
	refModuleId NUMBER,
	threadTypeDesc VARCHAR2(255),
	PRIMARY KEY (commentTypeId)
	);
	
CREATE INDEX idxComThreadId ON social_comments (threadId);

CREATE INDEX idxComRefTypeId ON social_comments (refCommentTypeId);

CREATE INDEX idxRefModuleId ON social_comments_type (refModuleId);
create table module_action (id NUMBER NOT NULL,name VARCHAR2(255) NOT NULL,parent_id NUMBER,is_action number(2,0),native_name VARCHAR2(255),is_active number(2,0),PRIMARY KEY(id));
create table module_action_access(id NUMBER NOT NULL,module_action_id NUMBER NOT NULL,role VARCHAR2(255) NOT NULL,PRIMARY KEY(id));

insert into module_action values(1,'Dashboard',NULL,0,NULL,1);
insert into module_action values(2,'Workflow',NULL,0,NULL,1);
insert into module_action values(3,'Tasks',2,0,NULL,1);
insert into module_action values(4,'Notifications',2,0,NULL,1);
insert into module_action values(5,'Processes',2,0,NULL,1);
insert into module_action values(6,'Collaboration',NULL,0,NULL,1);
insert into module_action values(7,'Reports',NULL,0,NULL,1);
insert into module_action values(8,'Administration',NULL,0,NULL,1);
insert into module_action values(9,'Monitoring',8,0,NULL,1);
insert into module_action values(10,'Processes',9,0,NULL,1);
insert into module_action values(11,'Instances',9,0,NULL,1);
insert into module_action values(12,'Auditing',8,0,NULL,1);
insert into module_action values(13,'Instances',12,0,NULL,1);
insert into module_action values(14,'Workflow',12,0,NULL,1);
insert into module_action values(15,'Access Control',8,0,NULL,1);
insert into module_action values(16,'Roles',15,0,NULL,0);
insert into module_action values(17,'Users',15,0,NULL,0);
insert into module_action values(18,'Modules',15,0,NULL,1);
insert into module_action values(19,'Logging',8,0,NULL,1);
insert into module_action values(20,'Log4j',19,0,'files:loggers',1);
insert into module_action values(21,'Marker In Log File',19,0,'files:marker',1);
insert into module_action values(22,'Download Log File',19,0,'files:export',1);
insert into module_action values(23,'Utilities',8,0,NULL,1);
insert into module_action values(24,'Download Config File',23,0,'files:export',1);
insert into module_action values(25,'Manage Timers',23,0,NULL,1);
insert into module_action values(26,'Clear TMS Cache',23,0,NULL,0);
insert into module_action values(27,'Start',10,1,'processes:operations',1);
insert into module_action values(28,'Activate',10,1,'processes:activate',1);
insert into module_action values(29,'Retire',10,1,'processes:retire',1);
insert into module_action values(30,'Deploy',10,1,'deployment:deploy',1);
insert into module_action values(31,'Undeploy',10,1,'deployment:undeploy',1);
insert into module_action values(32,'Invoke',11,1,'instances:operations',1);
insert into module_action values(33,'Resume',11,1,'instances:resume',1);
insert into module_action values(34,'Terminate',11,1,'instances:terminate',1);
insert into module_action values(35,'Delete',11,1,'instances:delete',1);
insert into module_action values(36,'Suspend',11,1,'instances:suspend',1);
insert into module_action values(37,'Variable Modification On Error Only',11,1,'instances:variables',1);
insert into module_action values(38,'Error Only',37,1,'variables.errorOnly',0);
insert into module_action values(39,'Vacations',NULL,0,NULL,1);
insert into module_action values(40,'Widgets',1,0,NULL,1);
insert into module_action values(41,'User Filter',1,0,NULL,1);
insert into module_action values(42,'Average Instance Completion Time',59,1,'widgets:processAverageCompletionTime',1);
insert into module_action values(43,'Longest Running Activity Summary',59,1,'widgets:longestRunningActivitySummary',1);
insert into module_action values(44,'Ongoing Activity Summary',59,1,'widgets:processOngoingActivitySummary',1);
insert into module_action values(45,'Instance Status Summary',60,1,'widgets:instanceStatusSummary',1);
insert into module_action values(46,'Status Summary by Process',60,1,'widgets:processInstanceStatusSummary',1);
insert into module_action values(47,'Peak Instance Creation Summary',60,1,'widgets:peakInstanceCreationSummary',1);
insert into module_action values(48,'Peak Instance Completed Summary',60,1,'widgets:peakInstanceCompletedSummary',1);
insert into module_action values(49,'Peak Instance Failure Summary',60,1,'widgets:peakInstanceFailureSummary',1);
insert into module_action values(50,'Task Completion Summary by User',61,1,'widgets:maxTaskCompletionSummary',1);
insert into module_action values(51,'Task Distribution Summary by User',61,1,'widgets:userTaskDistributionSummary',1);
insert into module_action values(52,'Task Distribution Summary by Role',61,1,'widgets:roleTaskDistributionSummary',1);
insert into module_action values(53,'Average Task Completion Summary by User',61,1,'widgets:userAverageTaskCompletionSummary',1);
insert into module_action values(54,'Task Summary by Status',61,1,'widgets:taskSummary',1);
insert into module_action values(55,'Task Summary by Priority',61,1,'widgets:taskPrioritySummary',1);
insert into module_action values(56,'Task Summary by Creation Date',61,1,'widgets:taskCreationSummary',1);
insert into module_action values(57,'Vacation Summary by User',62,1,'widgets:vacationSummary',1);
insert into module_action values(58,'Average Web Service Response Time',63,1,'widgets:webserviceAverageResponseTime',1);
insert into module_action values(59,'Processes',40,0,NULL,1);
insert into module_action values(60,'Instances',40,0,NULL,1);
insert into module_action values(61,'Workflow',40,0,NULL,1);
insert into module_action values(62,'Vacations',40,0,NULL,1);
insert into module_action values(63,'Others',40,0,NULL,1);
insert into module_action values(64,'Organization',8,0,NULL,1);
insert into module_action values(65,'Roles',64,0,NULL,1);
insert into module_action values(66,'Hierarchies',64,0,NULL,1);
insert into module_action values(67,'Pre Defined Reports',7,0,NULL,1);
insert into module_action values(68,'Ad hoc Reports',7,0,NULL,1);
insert into module_action values(69,'Business Rules',NULL,0,NULL,1);
insert into module_action values(70,'Manage Data Definitions',68,0,NULL,0);
insert into module_action values(71,'Product Info',8,0,NULL,1);
insert into module_action values(72,'Business Rules',12,0,NULL,1);
insert into module_action values(73,'Modeler',NULL,0,NULL,1);

insert into module_action_access values(-1,1,'intalio\processadministrator');
insert into module_action_access values(-2,2,'intalio\processadministrator');
insert into module_action_access values(-3,3,'intalio\processadministrator');
insert into module_action_access values(-4,4,'intalio\processadministrator');
insert into module_action_access values(-5,5,'intalio\processadministrator');
insert into module_action_access values(-6,6,'intalio\processadministrator');
insert into module_action_access values(-7,7,'intalio\processadministrator');
insert into module_action_access values(-8,8,'intalio\processadministrator');
insert into module_action_access values(-9,9,'intalio\processadministrator');
insert into module_action_access values(-10,10,'intalio\processadministrator');
insert into module_action_access values(-11,11,'intalio\processadministrator');
insert into module_action_access values(-12,12,'intalio\processadministrator');
insert into module_action_access values(-13,13,'intalio\processadministrator');
insert into module_action_access values(-14,14,'intalio\processadministrator');
insert into module_action_access values(-15,15,'intalio\processadministrator');
insert into module_action_access values(-16,16,'intalio\processadministrator');
insert into module_action_access values(-17,17,'intalio\processadministrator');
insert into module_action_access values(-18,18,'intalio\processadministrator');
insert into module_action_access values(-19,19,'intalio\processadministrator');
insert into module_action_access values(-20,20,'intalio\processadministrator');
insert into module_action_access values(-21,21,'intalio\processadministrator');
insert into module_action_access values(-22,22,'intalio\processadministrator');
insert into module_action_access values(-23,23,'intalio\processadministrator');
insert into module_action_access values(-24,24,'intalio\processadministrator');
insert into module_action_access values(-25,25,'intalio\processadministrator');
insert into module_action_access values(-26,26,'intalio\processadministrator');

insert into module_action_access values(-27,1,'intalio\workflowadministrator');
insert into module_action_access values(-28,2,'intalio\workflowadministrator');
insert into module_action_access values(-29,3,'intalio\workflowadministrator');
insert into module_action_access values(-30,4,'intalio\workflowadministrator');
insert into module_action_access values(-31,5,'intalio\workflowadministrator');
insert into module_action_access values(-32,6,'intalio\workflowadministrator');
insert into module_action_access values(-33,7,'intalio\workflowadministrator');
insert into module_action_access values(-34,8,'intalio\workflowadministrator');
insert into module_action_access values(-35,9,'intalio\workflowadministrator');
insert into module_action_access values(-36,10,'intalio\workflowadministrator');
insert into module_action_access values(-37,11,'intalio\workflowadministrator');
insert into module_action_access values(-38,12,'intalio\workflowadministrator');
insert into module_action_access values(-39,13,'intalio\workflowadministrator');
insert into module_action_access values(-40,14,'intalio\workflowadministrator');
insert into module_action_access values(-41,15,'intalio\workflowadministrator');
insert into module_action_access values(-42,16,'intalio\workflowadministrator');
insert into module_action_access values(-43,17,'intalio\workflowadministrator');
insert into module_action_access values(-44,18,'intalio\workflowadministrator');
insert into module_action_access values(-45,19,'intalio\workflowadministrator');
insert into module_action_access values(-46,20,'intalio\workflowadministrator');
insert into module_action_access values(-47,21,'intalio\workflowadministrator');
insert into module_action_access values(-48,22,'intalio\workflowadministrator');
insert into module_action_access values(-49,23,'intalio\workflowadministrator');
insert into module_action_access values(-50,24,'intalio\workflowadministrator');
insert into module_action_access values(-51,25,'intalio\workflowadministrator');
insert into module_action_access values(-52,26,'intalio\workflowadministrator');

insert into module_action_access values(-53,1,'intalio\processmanager');
insert into module_action_access values(-54,2,'intalio\processmanager');
insert into module_action_access values(-55,3,'intalio\processmanager');
insert into module_action_access values(-56,4,'intalio\processmanager');
insert into module_action_access values(-57,5,'intalio\processmanager');
insert into module_action_access values(-58,6,'intalio\processmanager');
insert into module_action_access values(-59,7,'intalio\processmanager');
insert into module_action_access values(-60,8,'intalio\processmanager');
insert into module_action_access values(-61,9,'intalio\processmanager');
insert into module_action_access values(-62,10,'intalio\processmanager');
insert into module_action_access values(-63,11,'intalio\processmanager');
insert into module_action_access values(-64,12,'intalio\processmanager');
insert into module_action_access values(-65,13,'intalio\processmanager');
insert into module_action_access values(-66,14,'intalio\processmanager');
insert into module_action_access values(-67,15,'intalio\processmanager');
insert into module_action_access values(-68,16,'intalio\processmanager');
insert into module_action_access values(-69,17,'intalio\processmanager');
insert into module_action_access values(-70,18,'intalio\processmanager');
insert into module_action_access values(-71,19,'intalio\processmanager');
insert into module_action_access values(-72,20,'intalio\processmanager');
insert into module_action_access values(-73,21,'intalio\processmanager');
insert into module_action_access values(-74,22,'intalio\processmanager');
insert into module_action_access values(-75,23,'intalio\processmanager');
insert into module_action_access values(-76,24,'intalio\processmanager');
insert into module_action_access values(-77,25,'intalio\processmanager');
insert into module_action_access values(-78,26,'intalio\processmanager');


insert into module_action_access values(-79,1,'intalio\eng');
insert into module_action_access values(-80,2,'intalio\eng');
insert into module_action_access values(-81,3,'intalio\eng');
insert into module_action_access values(-82,4,'intalio\eng');
insert into module_action_access values(-83,5,'intalio\eng');
insert into module_action_access values(-84,6,'intalio\eng');
insert into module_action_access values(-85,7,'intalio\eng');


insert into module_action_access values(-86,1,'examples\employee');
insert into module_action_access values(-87,2,'examples\employee');
insert into module_action_access values(-88,3,'examples\employee');
insert into module_action_access values(-89,4,'examples\employee');
insert into module_action_access values(-90,5,'examples\employee');
insert into module_action_access values(-91,6,'examples\employee');
insert into module_action_access values(-92,7,'examples\employee');

insert into module_action_access values(-93,1,'examples\manager');
insert into module_action_access values(-94,2,'examples\manager');
insert into module_action_access values(-95,3,'examples\manager');
insert into module_action_access values(-96,4,'examples\manager');
insert into module_action_access values(-97,5,'examples\manager');
insert into module_action_access values(-98,6,'examples\manager');
insert into module_action_access values(-99,7,'examples\manager');

insert into module_action_access values(-100,27,'intalio\processadministrator');
insert into module_action_access values(-101,28,'intalio\processadministrator');
insert into module_action_access values(-102,29,'intalio\processadministrator');
insert into module_action_access values(-103,30,'intalio\processadministrator');
insert into module_action_access values(-104,31,'intalio\processadministrator');
insert into module_action_access values(-105,32,'intalio\processadministrator');
insert into module_action_access values(-106,33,'intalio\processadministrator');
insert into module_action_access values(-107,34,'intalio\processadministrator');
insert into module_action_access values(-108,35,'intalio\processadministrator');
insert into module_action_access values(-109,36,'intalio\processadministrator');

insert into module_action_access values(-110,27,'intalio\workflowadministrator');
insert into module_action_access values(-111,28,'intalio\workflowadministrator');
insert into module_action_access values(-112,29,'intalio\workflowadministrator');
insert into module_action_access values(-113,30,'intalio\workflowadministrator');
insert into module_action_access values(-114,31,'intalio\workflowadministrator');
insert into module_action_access values(-115,32,'intalio\workflowadministrator');
insert into module_action_access values(-116,33,'intalio\workflowadministrator');
insert into module_action_access values(-117,34,'intalio\workflowadministrator');
insert into module_action_access values(-118,35,'intalio\workflowadministrator');
insert into module_action_access values(-119,36,'intalio\workflowadministrator');

insert into module_action_access values(-120,37,'intalio\processadministrator');
insert into module_action_access values(-121,38,'intalio\processadministrator');
insert into module_action_access values(-122,37,'intalio\workflowadministrator');
insert into module_action_access values(-123,38,'intalio\workflowadministrator');

insert into module_action_access values(-124,39,'intalio\processadministrator');
insert into module_action_access values(-125,39,'intalio\workflowadministrator');
insert into module_action_access values(-126,39,'intalio\processmanager');
insert into module_action_access values(-127,39,'intalio\eng');
insert into module_action_access values(-128,39,'examples\employee');
insert into module_action_access values(-129,39,'examples\manager');

insert into module_action_access values(-130,40,'intalio\processadministrator');
insert into module_action_access values(-131,41,'intalio\processadministrator');
insert into module_action_access values(-132,42,'intalio\processadministrator');
insert into module_action_access values(-133,43,'intalio\processadministrator');
insert into module_action_access values(-134,44,'intalio\processadministrator');
insert into module_action_access values(-135,45,'intalio\processadministrator');
insert into module_action_access values(-136,46,'intalio\processadministrator');
insert into module_action_access values(-137,47,'intalio\processadministrator');

insert into module_action_access values(-138,40,'intalio\workflowadministrator');
insert into module_action_access values(-139,41,'intalio\workflowadministrator');
insert into module_action_access values(-140,42,'intalio\workflowadministrator');
insert into module_action_access values(-141,43,'intalio\workflowadministrator');
insert into module_action_access values(-142,44,'intalio\workflowadministrator');
insert into module_action_access values(-143,45,'intalio\workflowadministrator');
insert into module_action_access values(-144,46,'intalio\workflowadministrator');
insert into module_action_access values(-145,47,'intalio\workflowadministrator');

insert into module_action_access values(-146,48,'intalio\processadministrator');
insert into module_action_access values(-147,49,'intalio\processadministrator');
insert into module_action_access values(-148,50,'intalio\processadministrator');
insert into module_action_access values(-149,51,'intalio\processadministrator');
insert into module_action_access values(-150,52,'intalio\processadministrator');
insert into module_action_access values(-151,53,'intalio\processadministrator');
insert into module_action_access values(-152,54,'intalio\processadministrator');
insert into module_action_access values(-153,55,'intalio\processadministrator');
insert into module_action_access values(-154,56,'intalio\processadministrator');
insert into module_action_access values(-155,57,'intalio\processadministrator');
insert into module_action_access values(-156,58,'intalio\processadministrator');

insert into module_action_access values(-159,48,'intalio\workflowadministrator');
insert into module_action_access values(-160,49,'intalio\workflowadministrator');
insert into module_action_access values(-161,50,'intalio\workflowadministrator');
insert into module_action_access values(-162,51,'intalio\workflowadministrator');
insert into module_action_access values(-163,52,'intalio\workflowadministrator');
insert into module_action_access values(-164,53,'intalio\workflowadministrator');
insert into module_action_access values(-165,54,'intalio\workflowadministrator');
insert into module_action_access values(-166,55,'intalio\workflowadministrator');
insert into module_action_access values(-167,56,'intalio\workflowadministrator');
insert into module_action_access values(-168,57,'intalio\workflowadministrator');
insert into module_action_access values(-169,58,'intalio\workflowadministrator');

insert into module_action_access values(-170,59,'intalio\processadministrator');
insert into module_action_access values(-171,60,'intalio\processadministrator');
insert into module_action_access values(-172,61,'intalio\processadministrator');
insert into module_action_access values(-173,62,'intalio\processadministrator');
insert into module_action_access values(-174,63,'intalio\processadministrator');

insert into module_action_access values(-175,59,'intalio\workflowadministrator');
insert into module_action_access values(-176,60,'intalio\workflowadministrator');
insert into module_action_access values(-177,61,'intalio\workflowadministrator');
insert into module_action_access values(-178,62,'intalio\workflowadministrator');
insert into module_action_access values(-179,63,'intalio\workflowadministrator');

insert into module_action_access values(-180,64,'intalio\workflowadministrator');
insert into module_action_access values(-181,65,'intalio\workflowadministrator');
insert into module_action_access values(-182,66,'intalio\workflowadministrator');

insert into module_action_access values(-183,64,'intalio\processadministrator');
insert into module_action_access values(-184,65,'intalio\processadministrator');
insert into module_action_access values(-185,66,'intalio\processadministrator');

insert into module_action_access values(-186,64,'intalio\processmanager');
insert into module_action_access values(-187,65,'intalio\processmanager');
insert into module_action_access values(-188,66,'intalio\processmanager');

insert into module_action_access values(-189,67,'intalio\workflowadministrator');
insert into module_action_access values(-190,67,'intalio\processadministrator');
insert into module_action_access values(-191,67,'intalio\processmanager');

insert into module_action_access values(-192,68,'intalio\workflowadministrator');
insert into module_action_access values(-193,68,'intalio\processadministrator');
insert into module_action_access values(-194,68,'intalio\processmanager');

insert into module_action_access values(-195,69,'intalio\workflowadministrator');
insert into module_action_access values(-196,69,'intalio\processadministrator');
insert into module_action_access values(-197,69,'intalio\processmanager');

insert into module_action_access values(-198,71,'intalio\workflowadministrator');
insert into module_action_access values(-199,71,'intalio\processadministrator');
insert into module_action_access values(-200,71,'intalio\processmanager');

insert into module_action_access values(-201,72,'intalio\workflowadministrator');
insert into module_action_access values(-202,72,'intalio\processadministrator');
insert into module_action_access values(-203,72,'intalio\processmanager');

insert into module_action_access values(-204,69,'intalio\breadministrator');

insert into module_action_access values(-205,67,'intalio\eng');
insert into module_action_access values(-206,67,'intalio\employee');
insert into module_action_access values(-207,67,'intalio\manager');

insert into module_action_access values(-208,73,'intalio\workflowadministrator');
insert into module_action_access values(-209,73,'intalio\processadministrator');
insert into module_action_access values(-210,73,'intalio\processmanager');
insert into module_action_access values(-211,73,'intalio\eng');
insert into module_action_access values(-212,73,'examples\employee');
insert into module_action_access values(-213,73,'examples\manager');
insert into module_action_access values(-214,73,'intalio\breadministrator');
insert into module_action_access values(-215,73,'intalio\collabadministrator');
insert into module_action_access values(-216,73,'intalio\collabdeveloper');
insert into module_action_access values(-217,73,'intalio\reportadministrator');

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

create table awb_bpmn_diagrams(
    id NUMBER(19,0) NOT NULL PRIMARY KEY,
    uuid VARCHAR2(255) NOT NULL UNIQUE,
    description VARCHAR2(255),
    created_by VARCHAR2(255) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    updated_by VARCHAR2(255),
    updated_on TIMESTAMP,
    is_ready NUMBER(2,0) NOT NULL,
    json BLOB,
    svg BLOB
);

create table awb_bpmn_access_permission(
	id NUMBER(19,0) NOT NULL PRIMARY KEY,
	entity_name VARCHAR2(255),
	entity_type NUMBER(19,0),
	access_type NUMBER(19,0),
	diagram_id NUMBER(19,0) NOT NULL,
	constraint diagram_id_fk1 FOREIGN KEY(diagram_id) references awb_bpmn_diagrams(id)
);

create index BPMN_PERMISSION_IDX on awb_bpmn_access_permission (entity_name);

create table awb_diagram_object(
    id NUMBER(19,0) NOT NULL PRIMARY KEY,
    uuid VARCHAR2(255) NOT NULL,
    resource_id  VARCHAR2(255),
    stencil VARCHAR2(50)
);

create table awb_diagram_object_property(
    id NUMBER(19,0) NOT NULL PRIMARY KEY,
    uuid VARCHAR2(255) NOT NULL,
    diagram_object_id  NUMBER(19,0) NOT NULL,
    property_name VARCHAR2(255),
    property_value VARCHAR2(255)
);

create table awb_attachments (
    id NUMBER(19,0) NOT NULL PRIMARY KEY,
    file_name VARCHAR2(255) NOT NULL,
    attachment_type VARCHAR2(100),
    attachment_data BLOB(2G),
    access_url VARCHAR2(255) NOT NULL,
    activity_id VARCHAR2(255) NOT NULL,
    user_id VARCHAR2(255) NOT NULL,
    insert_time TIMESTAMP NOT NULL
);


CREATE TABLE DBCONN_PROCESS_SPECIFIC_STATE ( 
	CONNECTION_NAME VARCHAR2(78), 
	SUBSCRIBER_NAME VARCHAR2(255), 
	RESPONSE_PAYLOAD_SEQUENCE_ID INTEGER,
	RESPONSE_PAYLOAD CLOB,
	LAST_MODIFIED TIMESTAMP DEFAULT SYSDATE
);
CREATE INDEX DBCONN_PRC_STT_IDX on 
	DBCONN_PROCESS_SPECIFIC_STATE (CONNECTION_NAME, SUBSCRIBER_NAME);

CREATE TABLE DBCONN_SYSTEM_WIDE_STATE ( 
	CONNECTION_NAME VARCHAR2(78), 
	RESPONSE_PAYLOAD_SEQUENCE_ID INTEGER,
	RESPONSE_PAYLOAD CLOB
);
CREATE INDEX DBCONN_SYS_STT_IDX on 
	DBCONN_SYSTEM_WIDE_STATE (CONNECTION_NAME);

create table ODE_SCHEMA_VERSION(VERSION number(19,0));
insert into ODE_SCHEMA_VERSION values (7);

create table BPEL_ACTIVITY_RECOVERY (ID number(19,0) not null, PIID number(19,0), AID number(19,0), CHANNEL varchar2(255 char), REASON varchar2(1000 char), DATE_TIME timestamp, LDATA_ID number(19,0), ACTIONS varchar2(255 char), RETRIES number(10,0), INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));
create table BPEL_CORRELATION_PROP (ID number(19,0) not null, NAME varchar2(255 char), NAMESPACE varchar2(255 char), VALUE varchar2(255 char), CORR_SET_ID number(19,0), INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));
create table BPEL_CORRELATION_SET (ID number(19,0) not null, VALUE varchar2(255 char), CORR_SET_NAME varchar2(255 char), SCOPE_ID number(19,0), PIID number(19,0), PROCESS_ID number(19,0), INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));
create table BPEL_CORRELATOR (ID number(19,0) not null, CID varchar2(255 char), PROCESS_ID number(19,0), INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));
create table BPEL_CORRELATOR_MESSAGE_CKEY (ID number(19,0) not null, CKEY varchar2(255 char), CORRELATOR_MESSAGE_ID number(19,0), INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));

create table BPEL_EVENT_V2 (ID number(19,0) not null, IID number(19,0), PID number(19,0), TYPE varchar2(255 char), DETAIL clob, SID number(19,0), INSERT_TIME timestamp, 
 LINE_NO number(19,0), TIME_STAMP timestamp, PROCESS_ID varchar2(255 char), PROCESS_NAME varchar2(255 char), PORT_TYPE varchar2(255 char), OPERATION varchar2(255 char), MEX_ID varchar2(255 char),
 CORR_KEY_SET clob, PROCESS_INSTANCE_ID number(19,0), STARTTIME number(19,0), COMPLETIONTIME number(19,0), FAULT varchar2(255 char), ROOTSCOPEID number(19,0), SCOPEDECLARATIONID number(19,0), 
 OLDSTATE number(10,0), NEWSTATE number(10,0), ASPECT  number(10,0), PARENT_SCOPE_ID number(19,0), SCOPE_NAME varchar2(255 char), PARENT_SCOPES_NAMES varchar2(255 char), ACTIVITY_NAME varchar2(255 char), 
 ACTIVITY_TYPE varchar2(255 char), ACTIVITY_DECLARATION_ID  number(10,0), ACTIVITY_ID number(19,0), REASON varchar2(255 char), ACTION  varchar2(255 char), CORRELATION_SET_NAME   varchar2(255 char), 
 CORR_KEY   clob, EXPRESSION  varchar2(255 char), RESULT  varchar2(255 char), P_LINK_NAME  varchar2(255 char), SUCCESS number(1,0) , FAULT_LINE_NO number(10,0), EXPLANATION  varchar2(255 char), 
 VAR_NAME  varchar2(255 char), NEW_VALUE  clob,
 MLOCK number(10,0) not null, ADHOC_TASK_ID varchar2(255), PARENT_TASK_ID  varchar2(255), primary key (ID));

create table BPEL_FAULT (ID number(19,0) not null, FAULTNAME varchar2(255 char), LDATA_ID number(19,0), EXPLANATION varchar2(3500), LINE_NUM number(10,0), AID number(10,0), INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));
create table BPEL_INSTANCE (ID number(19,0) not null, INSTANTIATING_CORRELATOR number(19,0), FAULT number(19,0), JACOB_STATE number(19,0), PREVIOUS_STATE number(5,0), PROCESS_ID number(19,0), STATE number(5,0), LAST_ACTIVE_DT timestamp, SEQUENCE number(19,0), FAILURE_COUNT number(10,0), FAILURE_DT timestamp, INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));
create table BPEL_MESSAGE (ID number(19,0) not null, MEX number(19,0), TYPE varchar2(255 char), DATA number(19,0), HEADER number(19,0),INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));
create table BPEL_MESSAGE_EXCHANGE (ID number(19,0) not null, PORT_TYPE varchar2(255 char), CHANNEL_NAME varchar2(255 char), CLIENTKEY varchar2(255 char), LDATA_EPR_ID number(19,0), LDATA_CEPR_ID number(19,0), REQUEST number(19,0), RESPONSE number(19,0), INSERT_DT timestamp, OPERATION varchar2(255 char), STATE varchar2(255 char), PROCESS number(19,0), PIID number(19,0), DIR char(1 char), PLINK_MODELID number(10,0), PATTERN varchar2(255 char), CORR_STATUS varchar2(255 char), FAULT_TYPE varchar2(255 char), FAULT_EXPL varchar2(255 char), CALLEE varchar2(255 char), PARTNERLINK number(19,0), PIPED_ID varchar2(255 char), SUBSCRIBER_COUNT number(19,0), INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));
create table BPEL_MEX_PROPS (MEX number(19,0) not null, VALUE varchar2(4000 char), NAME varchar2(255 char) not null, primary key (MEX, NAME));
create table BPEL_PLINK_VAL (ID number(19,0) not null, PARTNER_LINK varchar2(250 char) not null, PARTNERROLE varchar2(255 char), MYROLE_EPR number(19,0), PARTNERROLE_EPR number(19,0), PROCESS number(19,0), SCOPE number(19,0), SVCNAME varchar2(255 char), MYROLE varchar2(100 char), MODELID number(10,0), MYSESSIONID varchar2(255 char), PARTNERSESSIONID varchar2(255 char), INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));
create table BPEL_PROCESS (ID number(19,0) not null, PROCID varchar2(255 char) not null unique, deployer varchar2(255 char), deploydate timestamp, type_name varchar2(255 char), type_ns varchar2(255 char), version number(19,0), ACTIVE_ number(1,0), guid varchar2(255 char), INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));
create table BPEL_SCOPE (ID number(19,0) not null, PIID number(19,0), PARENT_SCOPE_ID number(19,0), STATE varchar2(255 char) not null, NAME varchar2(255 char) not null, MODELID number(10,0), INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));
create table BPEL_SELECTORS (ID number(19,0) not null, PIID number(19,0) not null, SELGRPID varchar2(255 char) not null, IDX number(10,0) not null, CORRELATION_KEY varchar2(255 char) not null, PROC_TYPE varchar2(255) not null, ROUTE_POLICY varchar2(16), CORRELATOR number(19,0) not null, INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID), unique (CORRELATION_KEY, CORRELATOR));
create table BPEL_UNMATCHED (ID number(19,0) not null, MEX number(19,0), CORRELATION_KEY varchar2(255 char), CORRELATOR number(19,0), INSERT_TIME timestamp, MLOCK number(10,0) not null, CORRELATOR_PROCESSTYPE varchar2(550 char), primary key (ID));
create table BPEL_XML_DATA (ID number(19,0) not null, LDATA_ID number(19,0), NAME varchar2(255 char) not null, SCOPE_ID number(19,0), PIID number(19,0), IS_SIMPLE_TYPE number(1,0), INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));
create table LARGE_DATA (ID number(19,0) not null, BIN_DATA blob, INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));
create table VAR_PROPERTY (ID number(19,0) not null, XML_DATA_ID number(19,0), PROP_VALUE varchar2(255 char), PROP_NAME varchar2(255 char) not null, INSERT_TIME timestamp, MLOCK number(10,0) not null, primary key (ID));

create sequence hibernate_sequence;
alter  sequence hibernate_sequence cache 500;
create table hibernate_unique_key ( next_hi integer );
insert into hibernate_unique_key values ( 0 );

create table STORE_DU (NAME varchar2(255 char) not null, deployer varchar2(255 char), DEPLOYDT timestamp, DIR varchar2(255 char), primary key (NAME));
create table STORE_PROCESS (PID varchar2(255 char) not null, DU varchar2(255 char), TYPE varchar2(255 char), version number(19,0), STATE varchar2(255 char), primary key (PID));
create table STORE_PROCESS_PROP (PROPID varchar2(255 char) not null, VALUE varchar2(255 char), NAME varchar2(255 char) not null, primary key (PROPID, NAME));
create table STORE_VERSIONS (ID number(19,0) not null, VERSION number(19,0), primary key (ID));
alter table STORE_PROCESS add constraint FKA83900D1BFFFC58C foreign key (DU) references STORE_DU;
alter table STORE_PROCESS_PROP add constraint FKFD6C2E119ADDA5CB foreign key (propId) references STORE_PROCESS;

CREATE TABLE ODE_JOB (jobid varchar2(64 char) DEFAULT '' NOT NULL, ts number(19,0) DEFAULT 0 NOT NULL, nodeid varchar2(64 char) NULL, scheduled number(12,0) DEFAULT 0 NOT NULL, transacted number(12,0) DEFAULT 0 NOT NULL, details BLOB NULL, procid varchar2(255 char), PRIMARY KEY(jobid));
create table START_EVENT (
	ID  number(19,0) not null,
	PID  varchar2(255 char),
	EXPR_TYPE  number(5,0),
	START_EVENT_STATE number(5,0),
	EXPR varchar2(255 char),
	EPR varchar2(512 char),
	OPERATION varchar2(255 char),
	PROCESS_TARGET_NS varchar2(255 char),
	REQUEST_NAME varchar2(255 char),
	INSERT_TIME timestamp,
	MLOCK   number(10,0) not null,
	primary key (ID));


CREATE TABLE TASK_UBP_LINK (
        ID NUMBER(19,0) NOT NULL,
        UBP_INSTANCE_ID NUMBER(19,0) NOT NULL,
        TMP_INSTANCE_ID NUMBER(19,0) NOT NULL, 
        TASK_ID VARCHAR2(255),
        ACTIVITY_INFO VARCHAR2(255),
        TASK_REQUEST_VAR_NAME VARCHAR2(255),
        TASK_RESPONSE_VAR_NAME VARCHAR2(255),
        PRIMARY KEY (ID)
);
create index IDX_TASKUBPLINK_UBP on TASK_UBP_LINK (UBP_INSTANCE_ID);
create index IDX_TASKUBPLINK_TMP on TASK_UBP_LINK (TMP_INSTANCE_ID);
create index IDX_TASKUBPLINK_TASK on TASK_UBP_LINK (TASK_ID);

create index IDX_START_EVENT_PROCESS_ID on START_EVENT (PID);
create index IDX_RECOVERY_LDATAID on BPEL_ACTIVITY_RECOVERY (LDATA_ID);
create index IDX_RECOVERY_PIID    on BPEL_ACTIVITY_RECOVERY (PIID);

create index IDX_CORRPROP_CORRSET on BPEL_CORRELATION_PROP (CORR_SET_ID);

create index IDX_CORR_SET_SCOPE_SID  on BPEL_CORRELATION_SET (SCOPE_ID);
create index IDX_CORR_SET_SCOPE_PIID on BPEL_CORRELATION_SET (PIID);

create index IDX_CORRELATOR_CID on BPEL_CORRELATOR (CID);

create index IDX_BPEL_CORR_MESSAGE_CKEY on BPEL_CORRELATOR_MESSAGE_CKEY (CKEY);
create index IDX_BPEL_CORR_MSG_CMID     on BPEL_CORRELATOR_MESSAGE_CKEY (CORRELATOR_MESSAGE_ID);

create index IDX_EVENT_IID     on BPEL_EVENT_V2 (IID);
create index IDX_EVENT_PID ON BPEL_EVENT_V2 (PID);
create index IDX_EVENT_SID ON BPEL_EVENT_V2 (SID);

create index IDX_FAULT_LDATAID on BPEL_FAULT (LDATA_ID);

create index IDX_BPEL_INSTANCE_FAULT      on BPEL_INSTANCE (FAULT);
create index IDX_BPEL_INSTANCE_PROCESS_ID on BPEL_INSTANCE (PROCESS_ID);
create index IDX_BPEL_INSTANCE_STATE      on BPEL_INSTANCE (STATE);

create index IDX_MESSAGE_LDATAID on BPEL_MESSAGE (DATA);
create index IDX_MESSAGE_HEADER  on BPEL_MESSAGE (HEADER);
create index IDX_MESSAGE_MEX     on BPEL_MESSAGE (MEX);

create index IDX_MEXCEPR_LDATAID on BPEL_MESSAGE_EXCHANGE (LDATA_CEPR_ID);
create index IDX_MEXEPR_LDATAID  on BPEL_MESSAGE_EXCHANGE (LDATA_EPR_ID);
create index IDX_MEXEPR_PLINK    on BPEL_MESSAGE_EXCHANGE (PARTNERLINK);
create index IDX_MEXEPR_PIID     on BPEL_MESSAGE_EXCHANGE (PIID);
create index IDX_MEXEPR_RESP     on BPEL_MESSAGE_EXCHANGE (REQUEST);
create index IDX_MEXEPR_REQ      on BPEL_MESSAGE_EXCHANGE (RESPONSE);

create index IDX_PLINK_VAL_MODELID on BPEL_PLINK_VAL (MODELID);
create index IDX_PLINK_VAL_SCOPE on BPEL_PLINK_VAL (SCOPE);

create index IDX_BPEL_PROCESS_TYPE_NAME on BPEL_PROCESS (type_name);
create index IDX_BPEL_PROCESS_TYPE_NS   on BPEL_PROCESS (type_ns);

create index IDX_SCOPE_PIID   on BPEL_SCOPE (PARENT_SCOPE_ID);
create index IDX_SCOPE_PARENT on BPEL_SCOPE (PIID);

create index IDX_SELECTOR_PIID_SELGRPID on BPEL_SELECTORS (PIID, SELGRPID);

create index IDX_UNMATCHED_MEX             on BPEL_UNMATCHED (MEX);

create index IDX_XMLDATA_SID on BPEL_XML_DATA (SCOPE_ID);
create index IDX_BPEL_XML_DATA_PIID on BPEL_XML_DATA (PIID);

create index IDX_ODE_JOB_TS_NID on ODE_JOB (ts, nodeid);

create index IDX_VARPROP_XMLDATA on VAR_PROPERTY (XML_DATA_ID);

create index IDX_BPEL_MEX_PROPS_VALUE on BPEL_MEX_PROPS (MEX);

create table vacation(id NUMBER NOT NULL,from_date DATE,to_date DATE,description varchar2(255),user_name varchar2(50),substitute varchar2(50),is_active NUMBER,PRIMARY KEY (id));
create table vacation_audit(id NUMBER NOT NULL, action_performed varchar2(50), audit_date timestamp, audit_user_name varchar2(50),vacation_id NUMBER,updated_from_date DATE,updated_to_date DATE,updated_description varchar2(255),updated_user_name varchar2(50),updated_substitute varchar2(50),updated_is_active NUMBER,PRIMARY KEY (id));
create table dashboard_state(user_name VARCHAR2(255) NOT NULL,ds_state CLOB NOT NULL,PRIMARY KEY(user_name));

create table security_realm
	(
		realm_id number(19,0) NOT NULL,
		identifier varchar(50) not null,
		CONSTRAINT realm_pk PRIMARY KEY(realm_id),
		CONSTRAINT realm_unique UNIQUE(identifier)
	);

create table security_user
	(
		user_id number(19,0) not null,
		realm_id integer not null,
		identifier varchar(50) not null,
		password varchar(100) not null,
		display_name varchar(50),
		first_Name varchar(50),
		last_Name varchar(50) not null,
		email varchar(50) UNIQUE,
		manager_id int DEFAULT NULL REFERENCES security_user (user_id),
		CONSTRAINT user_pk PRIMARY KEY (user_id),
		CONSTRAINT user_unique UNIQUE(realm_id, identifier),
		constraint user_fk FOREIGN KEY(realm_id) references security_realm(realm_id)
	);

create table security_role
	(
		role_id number(19,0) not null,
		realm_id integer not null,
		identifier varchar(50) not null,
		description varchar(100),
		CONSTRAINT role_pk PRIMARY KEY(role_id),
		CONSTRAINT role_unique UNIQUE(realm_id,identifier),
		constraint role_fk FOREIGN KEY(realm_id) references security_realm(realm_id)
	);

create table security_user_role
	(
		user_id integer not null,
		role_id integer not null,
		CONSTRAINT user_role_pk PRIMARY KEY(user_id,role_id),
		CONSTRAINT user_role_fk1 FOREIGN KEY (user_id) references security_user(user_id),
		CONSTRAINT role_fk2 FOREIGN KEY (role_id) references security_role(role_id)
	);

create table security_role_hierarchy
	(
		role_id integer not null,
		descendant_role_id integer not null,
		CONSTRAINT role_hierarchy_pk PRIMARY KEY(role_id,descendant_role_id),
		CONSTRAINT role_hierarchy_fk1 FOREIGN KEY(role_id) references security_role(role_id),
		CONSTRAINT role_hierarchy_fk2 FOREIGN KEY (descendant_role_id) references security_role(role_id)
	);

create index S_USER_IDENTIFIER_IDX on security_user (identifier);
create index S_ROLE_IDENTIFIER_IDX on security_role (identifier);
create index S_ROLE_HIERARCHY_DESC_IDX on security_role_hierarchy (descendant_role_id);

insert into security_realm(realm_id, identifier) values(1, 'intalio');
insert into security_realm(realm_id, identifier) values(2, 'examples');

insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email) values(1, 1, 'admin', 'knJ5LBnsmn49Mufi3YsDZlPXve2MxQ1S', 'System Administrator', 'System', 'Administrator', 'admin@example.com');
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email) values(2, 1, 'bob', 'knJ5LBnsmn49Mufi3YsDZlPXve2MxQ1S', 'Bob Leonardo', 'Bob', 'Leonardo', 'bob@example.com');
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email) values(3, 1, 'adam', 'v8Mn9YccB71GRiLQ+a19uw==', 'Adam Smith', 'Adam', 'Smith', 'adam@example.com');
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email) values(4, 2, 'msmith', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc', 'Michael Smith', 'Smith', 'Michael', 'msmith@example.com');
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email) values(5, 2, 'ewilliams', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc','Emily Williams', 'Emily', 'Williams',  'ewilliams@example.com');
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email, manager_id) values(6, 1, 'john', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc','John Parker', 'John', 'Parker',  'john@example.com', 1);
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email, manager_id) values(7, 1, 'james', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc','James Hunt', 'James', 'Hunt',  'james@example.com', 1);
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email, manager_id) values(8, 1, 'henry', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc','Henry Williams', 'Henry', 'Williams',  'henry@example.com', 2);
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email, manager_id) values(9, 1, 'philip', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc','Philip Miller', 'Philip', 'Miller',  'philip@example.com', 2);
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email, manager_id) values(10, 1, 'mark', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc','Mark Msmith', 'Mark', 'Msmith',  'mark@example.com', 4);
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email, manager_id) values(11, 2, 'david', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc','David Cooper', 'David', 'Cooper',  'david@example.com', 4);
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email, manager_id) values(12, 2, 'daniel', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc','Daniel Clark', 'Daniel', 'Clark',  'deniel@example.com', 5);
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email, manager_id) values(13, 2, 'roger', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc','Roger Baker', 'Roger', 'Baker',  'roger@example.com', 5);
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email, manager_id) values(14, 2, 'nancy', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc','Nancy Wilson', 'Nancy', 'Wilson',  'nancy@example.com', 1);
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email, manager_id) values(15, 1, 'jones', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc','Jones Jackson', 'Jones', 'Jackson',  'jones@example.com', 1);
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email, manager_id) values(16, 2, 'ellen', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc','Ellen Scott', 'Ellen', 'Scott',  'ellen@example.com',  5);


insert into security_role(role_id, realm_id, identifier, description) values(1, 1, 'ProcessAdministrator', 'ProcessAdministrator Role');
insert into security_role(role_id, realm_id, identifier, description) values(2, 1, 'WorkflowAdministrator', 'Tempo Workflow Administrator');
insert into security_role(role_id, realm_id, identifier, description) values(3, 1, 'CollabAdministrator', 'Collaboration Administrator');
insert into security_role(role_id, realm_id, identifier, description) values(4, 1, 'ProcessManager', 'Process Manager');
insert into security_role(role_id, realm_id, identifier, description) values(5, 1, 'eng', 'Test Role');
insert into security_role(role_id, realm_id, identifier, description) values(6, 1, 'CollabDeveloper', 'Collaboration Developer');
insert into security_role(role_id, realm_id, identifier, description) values(7, 2, 'manager', 'Manager');
insert into security_role(role_id, realm_id, identifier, description) values(8, 2, 'employee', 'Employee');
insert into security_role(role_id, realm_id, identifier, description) values(9, 1, 'ReportAdministrator', 'Report Administrator');
insert into security_role(role_id, realm_id, identifier, description) values(10, 1, 'BREAdministrator', 'Business Rules Administrator');

insert into security_user_role(user_id, role_id) values(1, 1);
insert into security_user_role(user_id, role_id) values(1, 7);
insert into security_user_role(user_id, role_id) values(1, 2);
insert into security_user_role(user_id, role_id) values(1, 3);
insert into security_user_role(user_id, role_id) values(2, 4);
insert into security_user_role(user_id, role_id) values(2, 7);
insert into security_user_role(user_id, role_id) values(2, 8);
insert into security_user_role(user_id, role_id) values(3, 5);
insert into security_user_role(user_id, role_id) values(4, 8);
insert into security_user_role(user_id, role_id) values(5, 7);
insert into security_user_role(user_id, role_id) values(6, 5);
insert into security_user_role(user_id, role_id) values(7, 6);
insert into security_user_role(user_id, role_id) values(8, 7);
insert into security_user_role(user_id, role_id) values(9, 8);
insert into security_user_role(user_id, role_id) values(10, 5);
insert into security_user_role(user_id, role_id) values(11, 6);
insert into security_user_role(user_id, role_id) values(12, 7);
insert into security_user_role(user_id, role_id) values(13, 8);
insert into security_user_role(user_id, role_id) values(14, 5);
insert into security_user_role(user_id, role_id) values(15, 6);
insert into security_user_role(user_id, role_id) values(16, 8);
insert into security_user_role(user_id, role_id) values(1, 9);
insert into security_user_role(user_id, role_id) values(1, 10);

insert into security_role_hierarchy(role_id, descendant_role_id) values(1,4);
insert into security_role_hierarchy(role_id, descendant_role_id) values(3,6);
insert into security_role_hierarchy(role_id, descendant_role_id) values(7,8);


create table bre_ui_access (
	id number(10,0) not null  ,
	entity_name varchar2(255 char),
	entity_type number(10,0) ,
	access_type number(10,0) ,
	decisiontable_id number not null,
	primary key (id)
) ;

create table bre_ui_decisiontable (
	id number(10,0) not null  ,
	decisiontable_name varchar2(255 char),
	package_name varchar2(255 char),
	package_version number(10,0),
	relativepath varchar2(255 char),
	last_updated timestamp,
	last_deployed timestamp,
	editable number(1,0),
	updation_support number(1,0),
	primary key (id)
) ;

create table bre_ui_lock (
	id number(10,0) not null  ,
	user_name varchar2(255 char),
	bre_dt_id number(10,0)  not null,
	primary key (id)
) ;

create table bre_audit (
    id number(10,0) not null,
    decisiontable_id number(10,0) not null,
    decision_table_name varchar2(255 char),
    action varchar2(100 char),
    user_name varchar2(255 char),
    audit_date timestamp,
    primary key (id)
);

create index i_bre_audit_dt_id on bre_audit (decisiontable_id);
create index i_bre_ui_lock_dt_id on bre_ui_lock (bre_dt_id);
create index i_bre_ui_access_dt_id on bre_ui_access (decisiontable_id);

alter table bre_ui_access
add constraint fk_dt_id foreign key (decisiontable_id) references bre_ui_decisiontable (id);


CREATE TABLE  "DEPLOY_ASSEMBLIES" 
   (	"ASSEMBLY" VARCHAR2(50) NOT NULL ENABLE, 
	"VERSION" NUMBER(11,0) NOT NULL ENABLE, 
	"DIR" VARCHAR2(50), 
	"CACTIVE" NUMBER(1,0), 
	 CONSTRAINT "DEPLOY_ASSEMBLIES_PK" PRIMARY KEY ("ASSEMBLY", "VERSION")
   );
CREATE TABLE  "DEPLOY_COMPONENTS" 
   (	"ASSEMBLY" VARCHAR2(50) NOT NULL ENABLE, 
	"VERSION" NUMBER(11,0) NOT NULL ENABLE, 
	"COMPONENT" VARCHAR2(50) NOT NULL ENABLE, 
	"MANAGER" VARCHAR2(50) NOT NULL ENABLE, 
	"DIR" VARCHAR2(50), 
	 CONSTRAINT "DEPLOY_COMPONENTS_PK" PRIMARY KEY ("ASSEMBLY", "VERSION", "MANAGER", "COMPONENT")
   );
CREATE TABLE  "DEPLOY_RESOURCES" 
   (	"ASSEMBLY" VARCHAR2(50) NOT NULL ENABLE, 
	"VERSION" NUMBER NOT NULL ENABLE, 
	"COMPONENT" VARCHAR2(50) NOT NULL ENABLE, 
	"MANAGER" VARCHAR2(50) NOT NULL ENABLE, 
	"RESOURCE_ID" VARCHAR2(250) NOT NULL ENABLE, 
	 CONSTRAINT "DEPLOY_RESOURCES_PK" PRIMARY KEY ("ASSEMBLY", "VERSION", "COMPONENT", "MANAGER", "RESOURCE_ID")
   );

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

