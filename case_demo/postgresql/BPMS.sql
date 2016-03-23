create table filterprocesses (id int8 not null, processName varchar(255), filterId int8 not null, primary key (id));

create table filterproperties (id int8 not null, name varchar(255), value varchar(255), filterId int8 not null, primary key (id));

create table filters (filterId int8 not null, createdAfter varchar(255), createdBefore varchar(255), lastActiveAfter varchar(255), lastActiveBefore varchar(255), anyProcess boolean, anyState boolean, name varchar(50), userName varchar(50), primary key (filterId));

create table filterstates (id int8 not null, stateId int8 not null, filterId int8 not null, primary key (id));

create table states (id int8, name varchar(255), primary key (id));

create table adminauditlog (id int8 not null, processid varchar(255),  packagename varchar(255), version int8, action varchar(50), username varchar(50), clientipaddress varchar(255), created timestamp, primary key (id));

create table intalio_audit( value text);

alter table filterprocesses add constraint FKD2D7E6E5B5873866 foreign key (filterId) references filters (filterId);
alter table filterproperties add constraint FK37C862ABB5873866 foreign key (filterId) references filters (filterId);
alter table filterstates add constraint FKB5BE1F7AB5873866 foreign key (filterId) references filters (filterId);
alter table filterstates add constraint FKB5BE1F7AA82EC42 foreign key (stateId) references states (id);

alter table filters add column processState varchar(20) default '';
alter table filters add column isProcess boolean default '0';

insert into states(ID, NAME) values(1, 'Active');
insert into states(ID, NAME) values(2, 'Suspended');
insert into states(ID, NAME) values(3, 'Terminated');
insert into states(ID, NAME) values(4, 'Completed');
insert into states(ID, NAME) values(5, 'Failed');
insert into states(ID, NAME) values(6, 'Failure');

create table ahr_report(report_id int4 NOT NULL, name VARCHAR(100) NOT NULL, description VARCHAR(1000), location VARCHAR(1000) NOT NULL, created_on TIMESTAMP NOT NULL, modified_on TIMESTAMP NOT NULL, is_executable boolean NOT NULL, owner VARCHAR(100) NOT NULL, PRIMARY KEY(report_id));
create table ahr_shared_report(access_id int4 NOT NULL, shared_to VARCHAR(100) NOT NULL, report_id int4 NOT NULL, is_role boolean NOT NULL, PRIMARY KEY(access_id));
CREATE TABLE tempo_acl (id bigserial NOT NULL, action VARCHAR(255), DTYPE VARCHAR(255), PRIMARY KEY (id));
CREATE TABLE tempo_acl_map (TASK_ID int8, ELEMENT_ID int8);
CREATE TABLE tempo_attachment (id int8 NOT NULL, payload_url VARCHAR(255), METADATA_ID int8, PRIMARY KEY (id));
CREATE TABLE tempo_attachment_map (PATASK_ID int8, ELEMENT_ID int8);
CREATE TABLE tempo_attachment_meta (id int8 NOT NULL, creation_date TIMESTAMP, description VARCHAR(255), file_name VARCHAR(255), mime_type VARCHAR(255), title VARCHAR(255), widget VARCHAR(255), PRIMARY KEY (id));
CREATE TABLE tempo_notification (id int8 NOT NULL, failure_code VARCHAR(255), failure_reason VARCHAR(255), input_xml TEXT, instanceId VARCHAR(255), priority int4, process_id VARCHAR(255), state int4, PRIMARY KEY (id));
CREATE TABLE tempo_pa (id int8 NOT NULL, complete_soap_action VARCHAR(255), deadline TIMESTAMP, failure_code VARCHAR(255), failure_reason VARCHAR(255), input_xml TEXT, instance_id VARCHAR(255), is_chained_before boolean, output_xml TEXT, previous_task_id VARCHAR(255), priority int4, process_id VARCHAR(255), state int4, ctm_xml TEXT, PRIMARY KEY (id));
CREATE TABLE tempo_pipa (id int8 NOT NULL, init_message VARCHAR(255), init_soap VARCHAR(255), process_endpoint VARCHAR(1024), PRIMARY KEY (id),process_state int4);
CREATE TABLE tempo_role (ACL_ID int8, element VARCHAR(255), TASK_ID int8);
CREATE TABLE tempo_task (id int8 NOT NULL, creation_date TIMESTAMP, description VARCHAR(255), form_url VARCHAR(255), taskid VARCHAR(255), internal_id int8, PRIMARY KEY (id));
CREATE TABLE tempo_user (ACL_ID int8, element VARCHAR(255), TASK_ID int8);
CREATE TABLE tempo_generic (ACL_ID int8, key0 VARCHAR(255), value TEXT, PATASK_ID int8);
CREATE TABLE tempo_custom_column (id int8 NOT NULL, custom_column_name VARCHAR(45), project_name VARCHAR(45), project_namespace VARCHAR(45), PRIMARY KEY (id));
CREATE TABLE tempo_pipa_output (id int8 NOT NULL, task_id VARCHAR(255) NOT NULL, user_owner VARCHAR(255) NOT NULL,  output_xml TEXT, PRIMARY KEY (id));
CREATE TABLE tempo_audit(id int8 NOT NULL, action_performed VARCHAR(255), audit_date timestamp, task_id VARCHAR(255), user_name VARCHAR(255),
updated_description VARCHAR(255), updated_priority VARCHAR(45), assigned_users VARCHAR(255), assigned_roles VARCHAR(255), updated_state VARCHAR(255), instance_id int8, PRIMARY KEY (id));
CREATE TABLE tempo_prev_owners (TASK_ID VARCHAR(255) NOT NULL, prev_users VARCHAR(255), prev_roles VARCHAR(255));
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

alter table tempo_audit ADD COLUMN variable_name VARCHAR(255),ADD COLUMN prev_var_data bytea,ADD COLUMN new_var_data bytea, ADD COLUMN audit_type VARCHAR(25);
alter table tempo_task ADD COLUMN last_active_date TIMESTAMP;
alter table tempo_task ADD COLUMN last_assigned_date TIMESTAMP;

CREATE TABLE tempo_filter (filter_id int8 NOT NULL, filter_name VARCHAR(255) NOT NULL, states VARCHAR(255), priorities VARCHAR(255), users VARCHAR(1000), roles VARCHAR(1000), project_name VARCHAR(255), custom_column int4, created_user VARCHAR(255) NOT NULL, deadline VARCHAR(255), process_id VARCHAR(255), creation_date VARCHAR(255), PRIMARY KEY (filter_id));
CREATE INDEX I_TMP_FILTER_USER ON tempo_filter(created_user);

create table tempo_pending_task(taskID varchar(255) PRIMARY KEY, status smallint default 0, insert_time timestamp default CURRENT_TIMESTAMP, last_updated timestamp);
CREATE TABLE tempo_shared_user (element VARCHAR(255), TASK_ID int8);
CREATE TABLE tempo_shared_role (element VARCHAR(255), TASK_ID int8);

CREATE TABLE global_attachment_map (TASK_ID int8, INSTANCE_ID VARCHAR(255), ELEMENT_ID int8);
CREATE INDEX I_GLOBAL__MP_ELEMENT ON global_attachment_map (ELEMENT_ID);
CREATE INDEX I_GLOBAL__MP_TASK_ID ON global_attachment_map (TASK_ID);

ALTER TABLE tempo_attachment_map RENAME COLUMN PATASK_ID TO TASK_ID;
ALTER TABLE tempo_pipa add column attachment_type boolean;
ALTER TABLE tempo_filter add column sharedTo VARCHAR(255);
ALTER TABLE tempo_task add column has_attachment boolean;

create table intalio_config(
		configId int8,
		groupType VARCHAR(100) NOT NULL,
		name  VARCHAR(100) NOT NULL,
		value VARCHAR(100),
		PRIMARY KEY (configId)
	);

create table intalio_user_profile(
		userId VARCHAR(100),
		salutation int8,
		name VARCHAR(200),
		dob  DATE,
		gender int8,
		department VARCHAR(200),
		email VARCHAR(100),
		secondaryEmail VARCHAR(100),
		mobile VARCHAR(50),
		phone VARCHAR(50),
		street VARCHAR(100),
		address VARCHAR(100),
		city  VARCHAR(100),
		state  VARCHAR(100),
		country int8,
		zip VARCHAR(10),
		image TEXT,
		imageContentType VARCHAR(50),
		loginTime TIMESTAMP,
		skills VARCHAR(1000),
		PRIMARY KEY (userId)
	);

create table intalio_user_preferences(
		userId VARCHAR(200),
		fixedHeader int8,
		topMenu int8,
		fontStyle VARCHAR(100),
		dateFormat VARCHAR(50),
		theme VARCHAR(50),
		PRIMARY KEY (userId)
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

create table intalio_salutation(id int8 , value VARCHAR(10) NOT NULL, PRIMARY KEY (id));
create table intalio_gender(id int8 , value VARCHAR(10) NOT NULL, PRIMARY KEY (id));
create table intalio_country(id int8 , value VARCHAR(100) NOT NULL, PRIMARY KEY (id));

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
	id int8 NOT NULL,
	name varchar(100),
	created_by varchar(50),
	created_date timestamp NOT NULL,
	modified_by varchar(50),
	modified_date timestamp,
	status int2,
	primary key (id)
);
create table collab_project (
	id int8 NOT NULL,
	repo_name varchar(100),
	name varchar(100),
	description varchar(400),
	created_by varchar(50),
	created_date timestamp  NOT NULL,
	modified_by varchar(50),
	modified_date timestamp,
	status int2,
	primary key (id)
);
create table collab_branch (
	id int8 NOT NULL,
	repo_name varchar(100),
        project_name varchar(100),
	name varchar(100),
	created_date timestamp  NOT NULL,
	created_by varchar(50),
	modified_date timestamp,
	modified_by varchar(50),
	in_sync boolean,
	status int2,
	head_commit_id varchar(100),
	primary key (id)
);
create table collab_resource (
	id int8 NOT NULL,
	repo_name varchar(100),
        project_name varchar(100),
	branch_name varchar(100),
	name varchar(1000),
	created_by varchar(50),
	created_date timestamp  NOT NULL,
	modified_by varchar(50),
	modified_date timestamp,
	status int2,
	latest_commit_id varchar(100),
	renamed_to int8,
	lock_id int8,
	primary key (id)
);
create table collab_commit (
	id varchar(100) NOT NULL,
	repo_name varchar(100),
        project_name varchar(100),
	branch_name varchar(100),
	commit_message varchar(1000),
	commited_by varchar(50),
	commited_date int8 NOT NULL,
	modified_by varchar(50),
	modified_date timestamp,
	status int2,
	commit_path varchar(1000),
	primary key (id)
);
create table collab_lock (
	id int8 NOT NULL,
	locked_by varchar(50),
	locked_date timestamp  NOT NULL,
	unlocked_by varchar(50),
	unlocked_date timestamp,
	workspace_id varchar(255),
	status int2,
	primary key (id)
);
create table collab_commit_detail (
	id int8 NOT NULL,
	commit_id varchar(100),
	resource_id int8,
	status int2,
	primary key (id)
);

CREATE TABLE collab_tag (
	id int8 NOT NULL,
	repo_name varchar(100),
        project_name varchar(100),
	branch_name varchar(100),
	tag_name varchar(100),
	description varchar(400),
	commit_id varchar(100),
	tagged_by varchar(50),
	tagged_date timestamp  NOT NULL,
	modified_by varchar(50),
	modified_date timestamp,
	status int2,
	path_to varchar(1000),
	primary key (id)
);

insert into collab_repository values(1, 'Intalio', 'intalio\admin', now(), 'intalio\admin', now(), 4);

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
		lft integer,
		rgt integer
	);

create table intalio_org_role(
		role_id VARCHAR(200),
		realm VARCHAR(100) NOT NULL,
		identifier VARCHAR(100) NOT NULL,
		description VARCHAR(500),
		role_type INTEGER NOT NULL,
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


insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('ROOT', 'intalio', 'ROOT', 'ROOT', 'ROOT', 'ROOT', now(), now(), 1, 34);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\adam', 'intalio', 'adam', 'Adam Smith', 'Adam', 'Smith', now(), now(), 2, 3);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\bob', 'intalio', 'bob', 'Bob Leonardo', 'Bob', 'Leonardo', now(), now(), 4, 9);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\henry', 'intalio', 'henry', 'Henry Williams', 'Henry', 'Williams', now(), now(), 5, 6);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\philip', 'intalio', 'philip', 'Philip Miller', 'Philip', 'Miller', now(), now(), 7, 8);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\msmith', 'examples', 'msmith', 'Michael Smith', 'Michael', 'Smith', now(), now(), 10, 15);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\mark', 'intalio', 'mark', 'Mark Msmith', 'Mark', 'Msmith', now(), now(), 11, 12);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\david', 'examples', 'david', 'David Cooper', 'David', 'Cooper', now(), now(), 13, 14);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\ewilliams', 'examples', 'ewilliams', 'Emily Williams', 'Emily', 'Williams', now(), now(), 16, 23);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\roger', 'examples', 'roger', 'Roger Baker', 'Roger', 'Baker', now(), now(), 17, 18);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\ellen', 'examples', 'ellen', 'Ellen Scott', 'Ellen', 'Scott', now(), now(), 19, 20);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\daniel', 'examples', 'daniel', 'Daniel Clark', 'Daniel', 'Clark', now(), now(), 21, 22);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\admin', 'intalio', 'admin', 'System Administrator', 'System', 'Administrator', now(), now(), 24, 33);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\jones', 'intalio', 'jones', 'Jones Jackson', 'Jones', 'Jackson', now(), now(), 25, 26);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\john', 'intalio', 'john', 'John Parker', 'John', 'Parker', now(), now(), 27, 28);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\james', 'intalio', 'james', 'James Hunt', 'James', 'Hunt', now(), now(), 29, 30);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\nancy', 'examples', 'nancy', 'Nancy Wilson', 'Nancy', 'Wilson', now(), now(), 31, 32);


insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) values('examples\employee', 'examples', 'employee', 'Employee', 1, now(), now());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) values('examples\manager', 'examples', 'manager', 'Manager', 1, now(), now());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) values('intalio\CollabAdministrator', 'intalio', 'CollabAdministrator', 'Collaboration Administrator', 1, now(), now());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) 
values('intalio\CollabDeveloper', 'intalio', 'CollabDeveloper', 'Collaboration Developer', 1, now(), now());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) values('intalio\eng', 'intalio', 'eng', 'Test Role', 1, now(), now());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) 
values('intalio\ProcessAdministrator', 'intalio', 'ProcessAdministrator', 'ProcessAdministrator Role', 1, now(), now());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) 
values('intalio\ProcessManager', 'intalio', 'ProcessManager', 'Process Manager', 1, now(), now());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) 
values('intalio\WorkflowAdministrator', 'intalio', 'WorkflowAdministrator', 'Tempo Workflow Administrator', 1, now(), now());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated)
values('intalio\ReportAdministrator', 'intalio', 'ReportAdministrator', 'Report Administrator', 1, now(), now());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated)
values('intalio\BREAdministrator', 'intalio', 'BREAdministrator', 'Business Rules Administrator', 1, now(), now());


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


CREATE TABLE OPENJPA_SEQUENCE_TABLE (ID SMALLINT NOT NULL, SEQUENCE_VALUE BIGINT, PRIMARY KEY (ID));
CREATE TABLE TEMPO_ITEM (id BIGINT NOT NULL, content_type VARCHAR(255), lastmodified ABSTIME, payload BYTEA, uri VARCHAR(255), PRIMARY KEY (id));
CREATE INDEX I_TEMPO_ITEM_URI on TEMPO_ITEM(uri);
create table social_comments(
	commentID INT8 NOT NULL,
	refCommentTypeId INT8,
	threadId VARCHAR(255),
	createdBy VARCHAR(50),
	createdDate TIMESTAMP,
	commentText VARCHAR(4000),
	PRIMARY KEY (commentID)
	);
create table social_comments_type(
	commentTypeId INT8 NOT NULL,
	refModuleId INT8,
	threadTypeDesc VARCHAR(255),
	PRIMARY KEY (commentTypeId)
	);
	
CREATE INDEX idxComThreadId ON social_comments (threadId);

CREATE INDEX idxComRefTypeId ON social_comments (refCommentTypeId);

CREATE INDEX idxRefModuleId ON social_comments_type (refModuleId);
create table module_action (id int4 NOT NULL,name varchar(255) NOT NULL,parent_id int4,is_action boolean, native_name VARCHAR(255),is_active boolean,PRIMARY KEY(id));
create table module_action_access(id int4 NOT NULL,module_action_id int4 NOT NULL,role varchar(255) NOT NULL,PRIMARY KEY(id));

insert into module_action values(1,'Dashboard',NULL,'0',NULL,'1');
insert into module_action values(2,'Workflow',NULL,'0',NULL,'1');
insert into module_action values(3,'Tasks',2,'0',NULL,'1');
insert into module_action values(4,'Notifications',2,'0',NULL,'1');
insert into module_action values(5,'Processes',2,'0',NULL,'1');
insert into module_action values(6,'Collaboration',NULL,'0',NULL,'1');
insert into module_action values(7,'Reports',NULL,'0',NULL,'1');
insert into module_action values(8,'Administration',NULL,'0',NULL,'1');
insert into module_action values(9,'Monitoring',8,'0',NULL,'1');
insert into module_action values(10,'Processes',9,'0',NULL,'1');
insert into module_action values(11,'Instances',9,'0',NULL,'1');
insert into module_action values(12,'Auditing',8,'0',NULL,'1');
insert into module_action values(13,'Instances',12,'0',NULL,'1');
insert into module_action values(14,'Workflow',12,'0',NULL,'1');
insert into module_action values(15,'Access Control',8,'0',NULL,'1');
insert into module_action values(16,'Roles',15,'0',NULL,'0');
insert into module_action values(17,'Users',15,'0',NULL,'0');
insert into module_action values(18,'Modules',15,'0',NULL,'1');
insert into module_action values(19,'Logging',8,'0',NULL,'1');
insert into module_action values(20,'Log4j',19,'0','files:loggers','1');
insert into module_action values(21,'Marker In Log File',19,'0','files:marker','1');
insert into module_action values(22,'Download Log File',19,'0','files:export','1');
insert into module_action values(23,'Utilities',8,'0',NULL,'1');
insert into module_action values(24,'Download Config File',23,'0','files:export','1');
insert into module_action values(25,'Manage Timers',23,'0',NULL,'1');
insert into module_action values(26,'Clear TMS Cache',23,'0',NULL,'0');
insert into module_action values(27,'Start',10,'1','processes:operations','1');
insert into module_action values(28,'Activate',10,'1','processes:activate','1');
insert into module_action values(29,'Retire',10,'1','processes:retire','1');
insert into module_action values(30,'Deploy',10,'1','deployment:deploy','1');
insert into module_action values(31,'Undeploy',10,'1','deployment:undeploy','1');
insert into module_action values(32,'Invoke',11,'1','instances:operations','1');
insert into module_action values(33,'Resume',11,'1','instances:resume','1');
insert into module_action values(34,'Terminate',11,'1','instances:terminate','1');
insert into module_action values(35,'Delete',11,'1','instances:delete','1');
insert into module_action values(36,'Suspend',11,'1','instances:suspend','1');
insert into module_action values(37,'Variable Modification On Error Only',11,'1','instances:variables','1');
insert into module_action values(38,'Error Only',37,'1','variables.errorOnly','0');
insert into module_action values(39,'Vacations',NULL,'0',NULL,'1');
insert into module_action values(40,'Widgets',1,'0',NULL,'1');
insert into module_action values(41,'User Filter',1,'0',NULL,'1');
insert into module_action values(42,'Average Instance Completion Time',59,'1','widgets:processAverageCompletionTime','1');
insert into module_action values(43,'Longest Running Activity Summary',59,'1','widgets:longestRunningActivitySummary','1');
insert into module_action values(44,'Ongoing Activity Summary',59,'1','widgets:processOngoingActivitySummary','1');
insert into module_action values(45,'Instance Status Summary',60,'1','widgets:instanceStatusSummary','1');
insert into module_action values(46,'Status Summary by Process',60,'1','widgets:processInstanceStatusSummary','1');
insert into module_action values(47,'Peak Instance Creation Summary',60,'1','widgets:peakInstanceCreationSummary','1');
insert into module_action values(48,'Peak Instance Completed Summary',60,'1','widgets:peakInstanceCompletedSummary','1');
insert into module_action values(49,'Peak Instance Failure Summary',60,'1','widgets:peakInstanceFailureSummary','1');
insert into module_action values(50,'Task Completion Summary by User',61,'1','widgets:maxTaskCompletionSummary','1');
insert into module_action values(51,'Task Distribution Summary by User',61,'1','widgets:userTaskDistributionSummary','1');
insert into module_action values(52,'Task Distribution Summary by Role',61,'1','widgets:roleTaskDistributionSummary','1');
insert into module_action values(53,'Average Task Completion Summary by User',61,'1','widgets:userAverageTaskCompletionSummary','1');
insert into module_action values(54,'Task Summary by Status',61,'1','widgets:taskSummary','1');
insert into module_action values(55,'Task Summary by Priority',61,'1','widgets:taskPrioritySummary','1');
insert into module_action values(56,'Task Summary by Creation Date',61,'1','widgets:taskCreationSummary','1');
insert into module_action values(57,'Vacation Summary by User',62,'1','widgets:vacationSummary','1');
insert into module_action values(58,'Average Web Service Response Time',63,'1','widgets:webserviceAverageResponseTime','1');
insert into module_action values(59,'Processes',40,'0',NULL,'1');
insert into module_action values(60,'Instances',40,'0',NULL,'1');
insert into module_action values(61,'Workflow',40,'0',NULL,'1');
insert into module_action values(62,'Vacations',40,'0',NULL,'1');
insert into module_action values(63,'Others',40,'0',NULL,'1');
insert into module_action values(64,'Organization',8,'0',NULL,'1');
insert into module_action values(65,'Roles',64,'0',NULL,'1');
insert into module_action values(66,'Hierarchies',64,'0',NULL,'1');
insert into module_action values(67,'Pre Defined Reports',7,'0',NULL,'1');
insert into module_action values(68,'Ad hoc Reports',7,'0',NULL,'1');
insert into module_action values(69,'Business Rules',NULL,'0',NULL,'1');
insert into module_action values(70,'Manage Data Definitions',68,'0',NULL,'0');
insert into module_action values(71,'Product Info',8,'0',NULL,'1');
insert into module_action values(72,'Business Rules',12,'0',NULL,'1');
insert into module_action values(73,'Modeler',NULL,'0',NULL,'1');

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

drop table IF EXISTS awb_bpmn_access_permission;
drop table IF EXISTS awb_bpmn_diagrams;
drop table IF EXISTS awb_diagram_object;
drop table IF EXISTS awb_diagram_object_property;
drop table IF EXISTS awb_attachments;

create table awb_bpmn_diagrams(
    id int8 NOT NULL PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_by VARCHAR(255) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    updated_by VARCHAR(255),
    updated_on TIMESTAMP,
    is_ready BOOLEAN NOT NULL,
    json BYTEA,
    svg BYTEA
);

create table awb_bpmn_access_permission(
	id int8 NOT NULL PRIMARY KEY,
	entity_name VARCHAR(255),
	entity_type int8,
	access_type int8,
	diagram_id int8 NOT NULL,
	constraint diagram_id_fk1 FOREIGN KEY(diagram_id) references awb_bpmn_diagrams(id)
);

create index BPMN_PERMISSION_IDX on awb_bpmn_access_permission (entity_name);

create table awb_diagram_object(
    id int8 NOT NULL PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL,  
    resource_id  VARCHAR(255),
    stencil VARCHAR(50)
);

create table awb_diagram_object_property(
    id int8 NOT NULL PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL,  
    diagram_object_id int8 NOT NULL,
    property_name VARCHAR(255),
    property_value VARCHAR(255)
);

create table awb_attachments (
    id int8 NOT NULL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    attachment_type VARCHAR(100),
    attachment_data BYTEA,
    access_url VARCHAR(255) NOT NULL,
    activity_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    insert_time TIMESTAMP NOT NULL
);


CREATE TABLE DBCONN_PROCESS_SPECIFIC_STATE ( 
	CONNECTION_NAME VARCHAR(78), 
	SUBSCRIBER_NAME VARCHAR(255), 
	RESPONSE_PAYLOAD_SEQUENCE_ID INTEGER,
	RESPONSE_PAYLOAD TEXT,
	LAST_MODIFIED TIMESTAMP DEFAULT NOW()
);
CREATE INDEX DBCONN_PROCESS_SPECIFIC_STATE_INDEX on 
	DBCONN_PROCESS_SPECIFIC_STATE (CONNECTION_NAME, SUBSCRIBER_NAME);

CREATE TABLE DBCONN_SYSTEM_WIDE_STATE ( 
	CONNECTION_NAME VARCHAR(78), 
	RESPONSE_PAYLOAD_SEQUENCE_ID INTEGER,
	RESPONSE_PAYLOAD TEXT
);
CREATE INDEX DBCONN_SYSTEM_WIDE_STATE_INDEX on 
	DBCONN_SYSTEM_WIDE_STATE (CONNECTION_NAME);

CREATE TABLE ode_job (
  jobid CHAR(64)  NOT NULL DEFAULT '',
  ts int8  NOT NULL DEFAULT 0,
  nodeid char(64),
  scheduled int4  NOT NULL DEFAULT 0,
  transacted int4  NOT NULL DEFAULT 0,
  details bytea,
  procid varchar(255),
  PRIMARY KEY(jobid));

create table STORE_DU (NAME varchar(255) not null, deployer varchar(255), DEPLOYDT timestamp, DIR varchar(255), primary key (NAME));
create table STORE_PROCESS (PID varchar(255) not null, DU varchar(255), TYPE varchar(255), version int8, STATE varchar(255), primary key (PID));
create table STORE_PROCESS_PROP (propId varchar(255) not null, value varchar(255), name varchar(255) not null, primary key (propId, name));
create table STORE_VERSIONS (ID int8 not null, VERSION int8, primary key (ID));

create table ODE_SCHEMA_VERSION(VERSION int8);
insert into ODE_SCHEMA_VERSION values (7);

create table BPEL_ACTIVITY_RECOVERY (ID int8 not null, PIID int8, AID int8, CHANNEL varchar(255), REASON varchar(1000), DATE_TIME timestamp, LDATA_ID int8, ACTIONS varchar(255), RETRIES int4, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table BPEL_CORRELATION_PROP (ID int8 not null, NAME varchar(255), NAMESPACE varchar(255), VALUE varchar(255), CORR_SET_ID int8, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table BPEL_CORRELATION_SET (ID int8 not null, VALUE varchar(255), CORR_SET_NAME varchar(255), SCOPE_ID int8, PIID int8, PROCESS_ID int8, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table BPEL_CORRELATOR (ID int8 not null, CID varchar(255), PROCESS_ID int8, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table BPEL_CORRELATOR_MESSAGE_CKEY (ID int8 not null, CKEY varchar(255), CORRELATOR_MESSAGE_ID int8, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));

create table BPEL_EVENT_V2 (ID int8 not null, IID int8, PID int8, TYPE varchar(255), DETAIL text, SID int8, INSERT_TIME timestamp, 
 LINE_NO int8, TIME_STAMP timestamp, PROCESS_ID varchar(255), PROCESS_NAME varchar(255), PORT_TYPE varchar(255), OPERATION varchar(255), MEX_ID varchar(255),
 CORR_KEY_SET text, PROCESS_INSTANCE_ID int8, STARTTIME int8, COMPLETIONTIME int8, FAULT varchar(255), ROOTSCOPEID int8, SCOPEDECLARATIONID int8, 
 OLDSTATE integer, NEWSTATE integer, ASPECT  integer, PARENT_SCOPE_ID int8, SCOPE_NAME varchar(255), PARENT_SCOPES_NAMES varchar(255), ACTIVITY_NAME varchar(255), 
 ACTIVITY_TYPE varchar(255), ACTIVITY_DECLARATION_ID  integer, ACTIVITY_ID int8, REASON varchar(255), ACTION  varchar(255), CORRELATION_SET_NAME   varchar(255), 
 CORR_KEY   text, EXPRESSION  varchar(255), RESULT  varchar(255), P_LINK_NAME  varchar(255), SUCCESS bool , FAULT_LINE_NO integer, EXPLANATION  varchar(255), 
 VAR_NAME  varchar(255), NEW_VALUE  TEXT,
 MLOCK int4 not null, primary key (ID));

create table BPEL_FAULT (ID int8 not null, FAULTNAME varchar(255), LDATA_ID int8, EXPLANATION varchar(4000), LINE_NUM int4, AID int4, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table BPEL_INSTANCE (ID int8 not null, INSTANTIATING_CORRELATOR int8, FAULT int8, JACOB_STATE int8, PREVIOUS_STATE int2, PROCESS_ID int8, STATE int2, LAST_ACTIVE_DT timestamp, SEQUENCE int8, FAILURE_COUNT int4, FAILURE_DT timestamp, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table BPEL_MESSAGE (ID int8 not null, MEX int8, TYPE varchar(255), DATA int8, HEADER int8, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table BPEL_MESSAGE_EXCHANGE (ID int8 not null, PORT_TYPE varchar(255), CHANNEL_NAME varchar(255), CLIENTKEY varchar(255), LDATA_EPR_ID int8, LDATA_CEPR_ID int8, REQUEST int8, RESPONSE int8, INSERT_DT timestamp, OPERATION varchar(255), STATE varchar(255), PROCESS int8, PIID int8, DIR char(1), PLINK_MODELID int4, PATTERN varchar(255), CORR_STATUS varchar(255), FAULT_TYPE varchar(255), FAULT_EXPL varchar(255), CALLEE varchar(255), PARTNERLINK int8, PIPED_ID varchar(255), SUBSCRIBER_COUNT int8, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table BPEL_MEX_PROPS (MEX int8 not null, VALUE varchar(8000), NAME varchar(255) not null, primary key (MEX, NAME));
create table BPEL_PLINK_VAL (ID int8 not null, PARTNER_LINK varchar(250) not null, PARTNERROLE varchar(255), MYROLE_EPR int8, PARTNERROLE_EPR int8, PROCESS int8, SCOPE int8, SVCNAME varchar(255), MYROLE varchar(100), MODELID int4, MYSESSIONID varchar(255), PARTNERSESSIONID varchar(255), INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table BPEL_PROCESS (ID int8 not null, PROCID varchar(255) not null unique, deployer varchar(255), deploydate timestamp, type_name varchar(255), type_ns varchar(255), version int8, ACTIVE_ bool, guid varchar(255), INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table BPEL_SCOPE (ID int8 not null, PIID int8, PARENT_SCOPE_ID int8, STATE varchar(255) not null, NAME varchar(255) not null, MODELID int4, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table BPEL_SELECTORS (ID int8 not null, PIID int8 not null, SELGRPID varchar(255) not null, IDX int4 not null, CORRELATION_KEY varchar(255) not null, PROC_TYPE varchar(255) not null, ROUTE_POLICY varchar(16), CORRELATOR int8 not null, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID), unique (CORRELATION_KEY, CORRELATOR));
create table BPEL_UNMATCHED (ID int8 not null, MEX int8, CORRELATION_KEY varchar(255), CORRELATOR int8, INSERT_TIME timestamp, MLOCK int4 not null, CORRELATOR_PROCESSTYPE varchar(550), primary key (ID));
create table BPEL_XML_DATA (ID int8 not null, LDATA_ID int8, NAME varchar(255) not null, SCOPE_ID int8, PIID int8, IS_SIMPLE_TYPE bool, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table LARGE_DATA (ID int8 not null, BIN_DATA bytea, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table VAR_PROPERTY (ID int8 not null, XML_DATA_ID int8, PROP_VALUE varchar(255), PROP_NAME varchar(255) not null, INSERT_TIME timestamp, MLOCK int4 not null, primary key (ID));
create table START_EVENT (
	ID int8 not null,
	PID varchar(255),
	EXPR_TYPE int2,
	START_EVENT_STATE int2,
	EXPR varchar(255),
	EPR varchar(512),
	OPERATION varchar(255),
	PROCESS_TARGET_NS varchar(255),
	REQUEST_NAME varchar(255),
	INSERT_TIME timestamp,
	MLOCK  int2 not null,
	primary key (ID));


create sequence hibernate_sequence;

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
create index IDX_START_EVENT_PROCESS_ID on START_EVENT (PID);

create table vacation(id int8 not null,from_date Date,to_date Date,description VARCHAR(255),user_name VARCHAR(50),substitute VARCHAR(50),is_active SMALLINT,PRIMARY KEY (id));
create table vacation_audit(id int8 NOT NULL, action_performed VARCHAR(50), audit_date timestamp, audit_user_name VARCHAR(50),vacation_id int8,updated_from_date Date,updated_to_date Date,updated_description VARCHAR(255),updated_user_name VARCHAR(50),updated_substitute VARCHAR(50),updated_is_active SMALLINT,PRIMARY KEY (id));
create table dashboard_state(user_name VARCHAR(255) NOT NULL,ds_state TEXT NOT NULL,PRIMARY KEY(user_name));

create table security_realm
	(
		realm_id int8 NOT NULL,
		identifier varchar(50) not null,
		CONSTRAINT realm_pk PRIMARY KEY(realm_id),
		CONSTRAINT realm_unique UNIQUE(identifier)
	);

create table security_user
	(
		user_id int8 NOT NULL,
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
		role_id int8 NOT NULL,
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
insert into security_user(user_id, realm_id, identifier, password, display_name,first_Name, last_Name, email) values(4, 2, 'msmith', 'g3iXdtj3Lm2YxJp77O/Bs3fUTj7XDYvc', 'Michael  Smith', 'Smith', 'Michael', 'msmith@example.com');
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
	id int8 not null  ,
	entity_name varchar(255),
	entity_type int8 ,
	access_type int8 ,
	decisiontable_id int8 not null,
	primary key (id)
) ;

create table bre_ui_decisiontable (
	id int8 not null  ,
	decisiontable_name varchar(255),
	package_name varchar(255),
	package_version int8,
	relativepath varchar(255),
	last_updated timestamp,
	last_deployed timestamp,
	editable bool,
	updation_support bool,
	primary key (id)
) ;

create table bre_ui_lock (
	id int8 not null  ,
	user_name varchar(255),
	bre_dt_id int8 not null,
	primary key (id)
) ;

create table bre_audit (
    id int8 not null,
    decisiontable_id int8 not null,
    decision_table_name varchar(255),
    action varchar(100),
    user_name varchar(255),
    audit_date timestamp,
    primary key (id)
);

create index i_bre_audit_dt_id on bre_audit (decisiontable_id);
create index i_bre_ui_lock_dt_id on bre_ui_lock (bre_dt_id);

create index i_bre_ui_access_dt_id on bre_ui_access (decisiontable_id);

alter table bre_ui_access
add constraint fk_dt_id foreign key (decisiontable_id) references bre_ui_decisiontable (id);


CREATE TABLE DEPLOY_ASSEMBLIES (ASSEMBLY VARCHAR(100) NOT NULL, VERSION int8 NOT NULL, DIR VARCHAR(100) NULL, CACTIVE int4, PRIMARY KEY (ASSEMBLY, VERSION));
CREATE TABLE DEPLOY_COMPONENTS (ASSEMBLY VARCHAR(100) NOT NULL, VERSION int8 NOT NULL, COMPONENT VARCHAR(100) NOT NULL, MANAGER VARCHAR(50) NOT NULL, DIR VARCHAR(100), PRIMARY KEY (ASSEMBLY, VERSION, COMPONENT, MANAGER));
CREATE TABLE DEPLOY_RESOURCES (ASSEMBLY VARCHAR(100) NOT NULL, VERSION int8 NOT NULL, COMPONENT VARCHAR(100) NOT NULL, MANAGER VARCHAR(100) NOT NULL, RESOURCE_ID VARCHAR(500) NOT NULL, PRIMARY KEY (ASSEMBLY, VERSION, COMPONENT, MANAGER, RESOURCE_ID));

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

