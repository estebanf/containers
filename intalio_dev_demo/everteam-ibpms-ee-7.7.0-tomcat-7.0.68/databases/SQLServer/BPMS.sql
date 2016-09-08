    create table filterprocesses (
        id integer identity not null,
        processName varchar(255),
        filterId integer not null,
        primary key (id)
    );

    create table filterproperties (
        id integer identity not null,
        name varchar(255),
        value varchar(255),
        filterId integer not null,
        primary key (id)
    );

    create table filters (
        filterId integer identity not null,
        createdAfter varchar(255),
        createdBefore varchar(255),
        lastActiveAfter varchar(255),
        lastActiveBefore varchar(255),
        anyProcess smallint,
        anyState smallint,
        name varchar(50),
        userName varchar(50),
        primary key (filterId)
    );

    create table filterstates (
        id integer identity not null,
        stateId integer not null,
        filterId integer not null,
        primary key (id)
    );

    create table states (
        id integer identity not null,
        name varchar(255),
        primary key (id)
    );

    create table adminauditlog (
        id integer identity not null,
        processid varchar(255),
        packagename varchar(255),
        version integer,
        action varchar(50),
        username varchar(100),
        clientipaddress varchar(255),
        created datetime,
        primary key (id)
    );

    create table intalio_audit( value varchar(2000));

    alter table filterprocesses 
        add constraint FKD2D7E6E5B5873866 
        foreign key (filterId) 
        references filters;

    alter table filterproperties 
        add constraint FK37C862ABB5873866 
        foreign key (filterId) 
        references filters;

    alter table filterstates 
        add constraint FKB5BE1F7AB5873866 
        foreign key (filterId) 
        references filters;

    alter table filterstates 
        add constraint FKB5BE1F7AA82EC42 
        foreign key (stateId) 
        references states;

    alter table filters add processState varchar(20) default '';
    alter table filters add isProcess tinyint default 0;

	insert into states(NAME) values('Active');
	insert into states(NAME) values('Suspended');
	insert into states(NAME) values('Terminated');
	insert into states(NAME) values('Completed');
	insert into states(NAME) values('Failed');
	insert into states(NAME) values('Failure');

create table ahr_report(report_id INT identity NOT NULL, name VARCHAR(100) NOT NULL, description VARCHAR(1000), location VARCHAR(1000) NOT NULL, created_on DATETIME NOT NULL, modified_on DATETIME NOT NULL, is_executable tinyint NOT NULL, owner VARCHAR(100) NOT NULL, PRIMARY KEY(report_id));
create table ahr_shared_report(access_id INT identity NOT NULL, shared_to VARCHAR(100) NOT NULL, report_id INT NOT NULL, is_role tinyint NOT NULL, PRIMARY KEY(access_id));
CREATE TABLE tempo_acl (id BIGINT identity NOT NULL, action VARCHAR(255), DTYPE VARCHAR(255), PRIMARY KEY (id));
CREATE TABLE tempo_acl_map (TASK_ID BIGINT, ELEMENT_ID BIGINT);
CREATE TABLE tempo_attachment (id BIGINT NOT NULL, payload_url VARCHAR(255), METADATA_ID BIGINT, PRIMARY KEY (id));
CREATE TABLE tempo_attachment_map (PATASK_ID BIGINT, ELEMENT_ID BIGINT);
CREATE TABLE tempo_attachment_meta (id BIGINT NOT NULL, creation_date DATETIME, description VARCHAR(255), file_name VARCHAR(255), mime_type VARCHAR(255), title VARCHAR(255), widget VARCHAR(255), PRIMARY KEY (id));
CREATE TABLE tempo_notification (id BIGINT NOT NULL, failure_code VARCHAR(255), failure_reason VARCHAR(255), input_xml TEXT, instanceId VARCHAR(255), priority INT, process_id VARCHAR(255), state SMALLINT, PRIMARY KEY (id));
CREATE TABLE tempo_pa (id BIGINT NOT NULL, complete_soap_action VARCHAR(255), deadline DATETIME, failure_code VARCHAR(255), failure_reason VARCHAR(255), input_xml TEXT, instance_id VARCHAR(255), is_chained_before BIT, output_xml TEXT, previous_task_id VARCHAR(255), priority INT, process_id VARCHAR(255), state SMALLINT, ctm_xml TEXT, PRIMARY KEY (id));
CREATE TABLE tempo_pipa (id BIGINT NOT NULL, init_message VARCHAR(255), init_soap VARCHAR(255), process_endpoint VARCHAR(1024), PRIMARY KEY (id),process_state SMALLINT);
CREATE TABLE tempo_role (ACL_ID BIGINT, element VARCHAR(255), TASK_ID BIGINT);
CREATE TABLE tempo_task (id BIGINT NOT NULL, creation_date DATETIME, description VARCHAR(255), form_url VARCHAR(255), taskid VARCHAR(255), internal_id INT, PRIMARY KEY (id));
CREATE TABLE tempo_user (ACL_ID BIGINT, element VARCHAR(255), TASK_ID BIGINT);
CREATE TABLE tempo_generic (ACL_ID BIGINT, key0 VARCHAR(255), value TEXT, PATASK_ID BIGINT);
CREATE TABLE tempo_custom_column (id BIGINT NOT NULL, custom_column_name VARCHAR(45), project_name VARCHAR(45), project_namespace VARCHAR(45), PRIMARY KEY (id));
CREATE TABLE tempo_pipa_output (id integer NOT NULL, task_id VARCHAR(255) NOT NULL, user_owner VARCHAR(255) NOT NULL, output_xml TEXT, PRIMARY KEY (id));
CREATE TABLE tempo_audit(id BIGINT NOT NULL, action_performed VARCHAR(255), audit_date DATETIME, task_id VARCHAR(255), user_name VARCHAR(255),
updated_description VARCHAR(255), updated_priority VARCHAR(45), assigned_users VARCHAR(255), assigned_roles VARCHAR(255), updated_state VARCHAR(255), instance_id BIGINT, PRIMARY KEY (id));
CREATE TABLE tempo_prev_owners (TASK_ID VARCHAR(255) NOT NULL, prev_users VARCHAR(255), prev_roles VARCHAR(255));
CREATE TABLE tempo_adhoc (TASK_ID BIGINT NOT NULL, PATASK_ID BIGINT NOT NULL, formType SMALLINT, placement SMALLINT, note TEXT);
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

alter table tempo_audit ADD variable_name VARCHAR(255),prev_var_data IMAGE,new_var_data IMAGE,audit_type VARCHAR(25);
alter table tempo_task ADD last_active_date DATETIME;
alter table tempo_task ADD last_assigned_date DATETIME;

CREATE TABLE tempo_filter (filter_id BIGINT NOT NULL, filter_name VARCHAR(255) NOT NULL, states VARCHAR(255), priorities VARCHAR(255), users VARCHAR(1000), roles VARCHAR(1000), project_name VARCHAR(255), custom_column SMALLINT, created_user VARCHAR(255) NOT NULL, deadline VARCHAR(255), process_id VARCHAR(255), creation_date VARCHAR(255), PRIMARY KEY (filter_id));
CREATE INDEX I_TMP_FILTER_USER ON tempo_filter(created_user);

create table tempo_pending_task(taskID varchar(255) PRIMARY KEY, status smallint default 0, insert_time datetime default (GETDATE()), last_updated datetime);
CREATE TABLE tempo_shared_user (element VARCHAR(255), TASK_ID BIGINT);
CREATE TABLE tempo_shared_role (element VARCHAR(255), TASK_ID BIGINT);

CREATE TABLE global_attachment_map (TASK_ID BIGINT, INSTANCE_ID VARCHAR(255), ELEMENT_ID BIGINT);
CREATE INDEX I_GLOBAL__MP_ELEMENT ON global_attachment_map (ELEMENT_ID);
CREATE INDEX I_GLOBAL__MP_TASK_ID ON global_attachment_map (TASK_ID);

EXEC sp_RENAME 'tempo_attachment_map.PATASK_ID', 'TASK_ID', 'COLUMN';

ALTER TABLE tempo_pipa add attachment_type BIT NOT NULL;
ALTER TABLE tempo_filter add sharedTo VARCHAR(255);
ALTER TABLE tempo_task add has_attachment BIT NOT NULL;
ALTER TABLE tempo_pa add isAdhoc BIT NOT NULL DEFAULT 0;
ALTER TABLE tempo_pa add allowAdhoc BIT NOT NULL DEFAULT 1;
ALTER TABLE tempo_pa add adhocIndex INT NOT NULL DEFAULT 0;

ALTER TABLE tempo_audit add is_adhoc BIT NOT NULL DEFAULT 0;

create table intalio_config(
		configId integer,
		groupType varchar(100) NOT NULL,
		name  varchar(100) NOT NULL,
		value varchar(100),
		primary key (configId)
	);

create table intalio_user_profile(
		userId varchar(100),
		salutation integer,
		name varchar(200),
		dob  datetime,
		gender integer,
		department varchar(200),
		email varchar(100),
		secondaryEmail varchar(100),
		mobile varchar(50),
		phone varchar(50),
		street varchar(100),
		address varchar(100),
		city  varchar(100),
		state  varchar(100),
		country integer,
		zip varchar(10),
		image IMAGE,
		imageContentType varchar(50),
		loginTime DATETIME,
		skills varchar(1000),
		primary key (userId)
	);

create table intalio_user_preferences(
		userId varchar(200),
		fixedHeader smallint,
		topMenu smallint,
		fontStyle varchar(100),
		dateFormat varchar(50),
		theme varchar(50),
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

create table intalio_salutation(id integer , value varchar(10) NOT NULL, primary key (id));
create table intalio_gender(id integer , value varchar(10) NOT NULL, primary key (id));
create table intalio_country(id integer , value varchar(100) NOT NULL, primary key (id));

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
	id bigint identity NOT NULL,
	name varchar(100),
	created_by varchar(50),
	created_date datetime NOT NULL,
	modified_by varchar(50),
	modified_date datetime,
	status tinyint,
	primary key (id)
);
create table collab_project (
	id bigint identity NOT NULL,
	repo_name varchar(100),
	name varchar(100),
	description varchar(400),
	created_by varchar(50),
	created_date datetime  NOT NULL,
	modified_by varchar(50),
	modified_date datetime,
	status tinyint,
	primary key (id)
);
create table collab_branch (
	id bigint identity NOT NULL,
	repo_name varchar(100),
        project_name varchar(100),
	name varchar(100),
	created_date datetime  NOT NULL,
	created_by varchar(50),
	modified_date datetime,
	modified_by varchar(50),
	in_sync tinyint,
	status tinyint,
	head_commit_id varchar(100),
	primary key (id)
);
create table collab_resource (
	id bigint identity NOT NULL,
	repo_name varchar(100),
        project_name varchar(100),
	branch_name varchar(100),
	name varchar(1000),
	created_by varchar(50),
	created_date datetime  NOT NULL,
	modified_by varchar(50),
	modified_date datetime,
	status tinyint,
	latest_commit_id varchar(100),
	renamed_to bigint,
	lock_id bigint,
	primary key (id)
);
create table collab_commit (
	id varchar(100) NOT NULL,
	repo_name varchar(100),
        project_name varchar(100),
	branch_name varchar(100),
	commit_message varchar(1000),
	commited_by varchar(50),
	commited_date BIGINT NOT NULL,
	modified_by varchar(50),
	modified_date datetime,
	status tinyint,
	commit_path varchar(1000),
	primary key (id)
);
create table collab_tag (
	id bigint identity NOT NULL,
	repo_name varchar(100),
        project_name varchar(100),
	branch_name varchar(100),
	tag_name varchar(100),
	description varchar(400),
	commit_id varchar(100),
	tagged_by varchar(50),
	tagged_date datetime  NOT NULL,
	modified_by varchar(50),
	modified_date datetime,
	status tinyint,
	primary key (id)
);
create table collab_lock (
	id bigint identity NOT NULL,
	locked_by varchar(50),
	locked_date datetime  NOT NULL,
	unlocked_by varchar(50),
	unlocked_date datetime,
	workspace_id varchar(255),
	status tinyint,
	primary key (id)
);
create table collab_commit_detail (
	id bigint identity NOT NULL,
	commit_id varchar(100),
	resource_id bigint,
	status tinyint,
	primary key (id)
);

insert into collab_repository values('Intalio', 'intalio\admin', GETDATE(), 'intalio\admin', GETDATE(), 4);

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
		last_imported datetime NOT NULL,
		last_updated datetime NOT NULL,
		last_sync datetime NULL,
		lft int,
		rgt int
	);

create table intalio_org_role(
		role_id VARCHAR(200),
		realm VARCHAR(100) NOT NULL,
		identifier VARCHAR(100) NOT NULL,
		description VARCHAR(500),
		role_type int NOT NULL,
		last_imported datetime NOT NULL,
		last_updated  datetime NOT NULL,
		last_sync datetime NULL,
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


insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('ROOT', 'intalio', 'ROOT', 'ROOT', 'ROOT', 'ROOT', GETDATE(), GETDATE(), 1, 34);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\adam', 'intalio', 'adam', 'Adam Smith', 'Adam', 'Smith', GETDATE(), GETDATE(), 2, 3);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\bob', 'intalio', 'bob', 'Bob Leonardo', 'Bob', 'Leonardo', GETDATE(), GETDATE(), 4, 9);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\henry', 'intalio', 'henry', 'Henry Williams', 'Henry', 'Williams', GETDATE(), GETDATE(), 5, 6);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\philip', 'intalio', 'philip', 'Philip Miller', 'Philip', 'Miller', GETDATE(), GETDATE(), 7, 8);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\msmith', 'examples', 'msmith', 'Michael Smith', 'Michael', 'Smith', GETDATE(), GETDATE(), 10, 15);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\mark', 'intalio', 'mark', 'Mark Msmith', 'Mark', 'Msmith', GETDATE(), GETDATE(), 11, 12);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\david', 'examples', 'david', 'David Cooper', 'David', 'Cooper', GETDATE(), GETDATE(), 13, 14);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\ewilliams', 'examples', 'ewilliams', 'Emily Williams', 'Emily', 'Williams', GETDATE(), GETDATE(), 16, 23);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\roger', 'examples', 'roger', 'Roger Baker', 'Roger', 'Baker', GETDATE(), GETDATE(), 17, 18);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\ellen', 'examples', 'ellen', 'Ellen Scott', 'Ellen', 'Scott', GETDATE(), GETDATE(), 19, 20);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\daniel', 'examples', 'daniel', 'Daniel Clark', 'Daniel', 'Clark', GETDATE(), GETDATE(), 21, 22);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\admin', 'intalio', 'admin', 'System Administrator', 'System', 'Administrator', GETDATE(), GETDATE(), 24, 33);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\jones', 'intalio', 'jones', 'Jones Jackson', 'Jones', 'Jackson', GETDATE(), GETDATE(), 25, 26);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\john', 'intalio', 'john', 'John Parker', 'John', 'Parker', GETDATE(), GETDATE(), 27, 28);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('intalio\james', 'intalio', 'james', 'James Hunt', 'James', 'Hunt', GETDATE(), GETDATE(), 29, 30);
insert into intalio_org_user(user_id, realm, identifier, display_name, first_name, last_name, last_imported, last_updated, lft, rgt) values('examples\nancy', 'examples', 'nancy', 'Nancy Wilson', 'Nancy', 'Wilson', GETDATE(), GETDATE(), 31, 32);


insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) values('examples\employee', 'examples', 'employee', 'Employee', 1, GETDATE(), GETDATE());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) values('examples\manager', 'examples', 'manager', 'Manager', 1, GETDATE(), GETDATE());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) values('intalio\CollabAdministrator', 'intalio', 'CollabAdministrator', 'Collaboration Administrator', 1, GETDATE(), GETDATE());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) 
values('intalio\CollabDeveloper', 'intalio', 'CollabDeveloper', 'Collaboration Developer', 1, GETDATE(), GETDATE());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) values('intalio\eng', 'intalio', 'eng', 'Test Role', 1, GETDATE(), GETDATE());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) 
values('intalio\ProcessAdministrator', 'intalio', 'ProcessAdministrator', 'ProcessAdministrator Role', 1, GETDATE(), GETDATE());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) 
values('intalio\ProcessManager', 'intalio', 'ProcessManager', 'Process Manager', 1, GETDATE(), GETDATE());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated) 
values('intalio\WorkflowAdministrator', 'intalio', 'WorkflowAdministrator', 'Tempo Workflow Administrator', 1, GETDATE(), GETDATE());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated)
values('intalio\ReportAdministrator', 'intalio', 'ReportAdministrator', 'Report Administrator', 1, GETDATE(), GETDATE());
insert into intalio_org_role(role_id, realm, identifier, description, role_type, last_imported, last_updated)
values('intalio\BREAdministrator', 'intalio', 'BREAdministrator', 'Business Rules Administrator', 1, GETDATE(), GETDATE());


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

CREATE TABLE OPENJPA_SEQUENCE_TABLE (ID TINYINT NOT NULL, SEQUENCE_VALUE BIGINT, PRIMARY KEY (ID));
CREATE TABLE TEMPO_ITEM (id BIGINT NOT NULL, content_type VARCHAR(255), lastmodified DATETIME, payload IMAGE, uri VARCHAR(255), PRIMARY KEY (id));
CREATE INDEX I_TEMPO_ITEM_URI on TEMPO_ITEM(uri);
create table social_comments(
	commentID INTEGER NOT NULL,
	refCommentTypeId INTEGER,
	threadId VARCHAR(255),
	createdBy VARCHAR(50),
	createdDate DATETIME,
	commentText VARCHAR(4000),
	PRIMARY KEY (commentID)
	);
create table social_comments_type(
	commentTypeId INTEGER NOT NULL,
	refModuleId INTEGER,
	threadTypeDesc VARCHAR(255),
	PRIMARY KEY (commentTypeId)
	);
	
create index idxComThreadId on social_comments (threadId);

create index idxComRefTypeId on social_comments (refCommentTypeId);

create index idxRefModuleId on social_comments_type (refModuleId);
create table module_action (id INT identity NOT NULL,name VARCHAR(255) NOT NULL,parent_id INT, is_action tinyint, native_name VARCHAR(255),is_active tinyint,PRIMARY KEY(id));
SET IDENTITY_INSERT module_action ON;

insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(1,'Dashboard',NULL,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(2,'Workflow',NULL,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(3,'Tasks',2,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(4,'Notifications',2,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(5,'Processes',2,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(6,'Collaboration',NULL,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(7,'Reports',NULL,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(8,'Administration',NULL,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(9,'Monitoring',8,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(10,'Processes',9,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(11,'Instances',9,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(12,'Auditing',8,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(13,'Instances',12,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(14,'Workflow',12,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(15,'Access Control',8,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(16,'Roles',15,0,NULL,0);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(17,'Users',15,0,NULL,0);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(18,'Modules',15,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(19,'Logging',8,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(20,'Log4j',19,0,'files:loggers',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(21,'Marker In Log File',19,0,'files:marker',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(22,'Download Log File',19,0,'files:export',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(23,'Utilities',8,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(24,'Download Config File',23,0,'files:export',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(25,'Manage Timers',23,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(26,'Clear TMS Cache',23,0,NULL,0);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(27,'Start',10,1,'processes:operations',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(28,'Activate',10,1,'processes:activate',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(29,'Retire',10,1,'processes:retire',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(30,'Deploy',10,1,'deployment:deploy',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(31,'Undeploy',10,1,'deployment:undeploy',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(32,'Invoke',11,1,'instances:operations',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(33,'Resume',11,1,'instances:resume',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(34,'Terminate',11,1,'instances:terminate',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(35,'Delete',11,1,'instances:delete',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(36,'Suspend',11,1,'instances:suspend',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(37,'Variable Modification On Error Only',11,1,'instances:variables',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(38,'Error Only',37,1,'variables.errorOnly',0);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(39,'Vacations',NULL,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(40,'Widgets',1,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(41,'User Filter',1,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(42,'Average Instance Completion Time',59,1,'widgets:processAverageCompletionTime',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(43,'Longest Running Activity Summary',59,1,'widgets:longestRunningActivitySummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(44,'Ongoing Activity Summary',59,1,'widgets:processOngoingActivitySummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(45,'Instance Status Summary',60,1,'widgets:instanceStatusSummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(46,'Status Summary by Process',60,1,'widgets:processInstanceStatusSummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(47,'Peak Instance Creation Summary',60,1,'widgets:peakInstanceCreationSummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(48,'Peak Instance Completed Summary',60,1,'widgets:peakInstanceCompletedSummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(49,'Peak Instance Failure Summary',60,1,'widgets:peakInstanceFailureSummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(50,'Task Completion Summary by User',61,1,'widgets:maxTaskCompletionSummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(51,'Task Distribution Summary by User',61,1,'widgets:userTaskDistributionSummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(52,'Task Distribution Summary by Role',61,1,'widgets:roleTaskDistributionSummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(53,'Average Task Completion Summary by User',61,1,'widgets:userAverageTaskCompletionSummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(54,'Task Summary by Status',61,1,'widgets:taskSummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(55,'Task Summary by Priority',61,1,'widgets:taskPrioritySummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(56,'Task Summary by Creation Date',61,1,'widgets:taskCreationSummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(57,'Vacation Summary by User',62,1,'widgets:vacationSummary',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(58,'Average Web Service Response Time',63,1,'widgets:webserviceAverageResponseTime',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(59,'Processes',40,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(60,'Instances',40,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(61,'Workflow',40,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(62,'Vacations',40,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(63,'Others',40,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(64,'Organization',8,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(65,'Roles',64,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(66,'Hierarchies',64,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(67,'Pre Defined Reports',7,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(68,'Ad hoc Reports',7,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(69,'Business Rules',NULL,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(70,'Manage Data Definitions',68,0,NULL,0);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(71,'Product Info',8,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(72,'Business Rules',12,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(73,'Modeler',NULL,0,NULL,1);

SET IDENTITY_INSERT module_action OFF;
create table module_action_access(id INT identity NOT NULL,module_action_id INT NOT NULL,role VARCHAR(255) NOT NULL,PRIMARY KEY(id));
SET IDENTITY_INSERT module_action_access ON;

insert into module_action_access (id,module_action_id,role) values(1,1,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(2,2,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(3,3,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(4,4,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(5,5,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(6,6,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(7,7,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(8,8,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(9,9,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(10,10,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(11,11,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(12,12,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(13,13,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(14,14,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(15,15,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(16,16,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(17,17,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(18,18,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(19,19,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(20,20,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(21,21,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(22,22,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(23,23,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(24,24,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(25,25,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(26,26,'intalio\processadministrator');

insert into module_action_access (id,module_action_id,role) values(27,1,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(28,2,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(29,3,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(30,4,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(31,5,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(32,6,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(33,7,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(34,8,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(35,9,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(36,10,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(37,11,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(38,12,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(39,13,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(40,14,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(41,15,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(42,16,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(43,17,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(44,18,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(45,19,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(46,20,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(47,21,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(48,22,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(49,23,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(50,24,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(51,25,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(52,26,'intalio\workflowadministrator');

insert into module_action_access (id,module_action_id,role) values(53,1,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(54,2,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(55,3,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(56,4,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(57,5,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(58,6,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(59,7,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(60,8,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(61,9,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(62,10,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(63,11,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(64,12,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(65,13,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(66,14,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(67,15,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(68,16,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(69,17,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(70,18,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(71,19,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(72,20,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(73,21,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(74,22,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(75,23,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(76,24,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(77,25,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(78,26,'intalio\processmanager');


insert into module_action_access (id,module_action_id,role) values(79,1,'intalio\eng');
insert into module_action_access (id,module_action_id,role) values(80,2,'intalio\eng');
insert into module_action_access (id,module_action_id,role) values(81,3,'intalio\eng');
insert into module_action_access (id,module_action_id,role) values(82,4,'intalio\eng');
insert into module_action_access (id,module_action_id,role) values(83,5,'intalio\eng');
insert into module_action_access (id,module_action_id,role) values(84,6,'intalio\eng');
insert into module_action_access (id,module_action_id,role) values(85,7,'intalio\eng');


insert into module_action_access (id,module_action_id,role) values(86,1,'examples\employee');
insert into module_action_access (id,module_action_id,role) values(87,2,'examples\employee');
insert into module_action_access (id,module_action_id,role) values(88,3,'examples\employee');
insert into module_action_access (id,module_action_id,role) values(89,4,'examples\employee');
insert into module_action_access (id,module_action_id,role) values(90,5,'examples\employee');
insert into module_action_access (id,module_action_id,role) values(91,6,'examples\employee');
insert into module_action_access (id,module_action_id,role) values(92,7,'examples\employee');

insert into module_action_access (id,module_action_id,role) values(93,1,'examples\manager');
insert into module_action_access (id,module_action_id,role) values(94,2,'examples\manager');
insert into module_action_access (id,module_action_id,role) values(95,3,'examples\manager');
insert into module_action_access (id,module_action_id,role) values(96,4,'examples\manager');
insert into module_action_access (id,module_action_id,role) values(97,5,'examples\manager');
insert into module_action_access (id,module_action_id,role) values(98,6,'examples\manager');
insert into module_action_access (id,module_action_id,role) values(99,7,'examples\manager');

insert into module_action_access (id,module_action_id,role) values(100,27,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(101,28,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(102,29,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(103,30,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(104,31,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(105,32,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(106,33,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(107,34,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(108,35,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(109,36,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(120,37,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(121,38,'intalio\processadministrator');

insert into module_action_access (id,module_action_id,role) values(110,27,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(111,28,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(112,29,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(113,30,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(114,31,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(115,32,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(116,33,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(117,34,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(118,35,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(119,36,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(122,37,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(123,38,'intalio\workflowadministrator');

insert into module_action_access (id,module_action_id,role) values(124,39,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(125,39,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(126,39,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(127,39,'intalio\eng');
insert into module_action_access (id,module_action_id,role) values(128,39,'examples\employee');
insert into module_action_access (id,module_action_id,role) values(129,39,'examples\manager');

insert into module_action_access (id,module_action_id,role) values(130,40,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(131,41,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(132,42,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(133,43,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(134,44,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(135,45,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(136,46,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(137,47,'intalio\processadministrator');

insert into module_action_access (id,module_action_id,role) values(138,40,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(139,41,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(140,42,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(141,43,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(142,44,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(143,45,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(144,46,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(145,47,'intalio\workflowadministrator');

insert into module_action_access (id,module_action_id,role) values(146,48,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(147,49,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(148,50,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(149,51,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(150,52,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(151,53,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(152,54,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(153,55,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(154,56,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(155,57,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(156,58,'intalio\processadministrator');

insert into module_action_access (id,module_action_id,role) values(159,48,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(160,49,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(161,50,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(162,51,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(163,52,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(164,53,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(165,54,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(166,55,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(167,56,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(168,57,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(169,58,'intalio\workflowadministrator');

insert into module_action_access (id,module_action_id,role) values(170,59,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(171,60,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(172,61,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(173,62,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(174,63,'intalio\processadministrator');

insert into module_action_access (id,module_action_id,role) values(175,59,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(176,60,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(177,61,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(178,62,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(179,63,'intalio\workflowadministrator');

insert into module_action_access (id,module_action_id,role) values(180,64,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(181,65,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(182,66,'intalio\workflowadministrator');

insert into module_action_access (id,module_action_id,role) values(183,64,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(184,65,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(185,66,'intalio\processadministrator');

insert into module_action_access (id,module_action_id,role) values(186,64,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(187,65,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(188,66,'intalio\processmanager');

insert into module_action_access (id,module_action_id,role) values(189,67,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(190,67,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(191,67,'intalio\processmanager');

insert into module_action_access (id,module_action_id,role) values(192,68,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(193,68,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(194,68,'intalio\processmanager');

insert into module_action_access (id,module_action_id,role) values(195,69,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(196,69,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(197,69,'intalio\processmanager');

insert into module_action_access (id,module_action_id,role) values(198,71,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(199,71,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(200,71,'intalio\processmanager');

insert into module_action_access (id,module_action_id,role) values(201,72,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(202,72,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(203,72,'intalio\processmanager');

insert into module_action_access (id,module_action_id,role) values(204,69,'intalio\breadministrator');

insert into module_action_access (id,module_action_id,role) values(205,67,'intalio\eng');
insert into module_action_access (id,module_action_id,role) values(206,67,'intalio\employee');
insert into module_action_access (id,module_action_id,role) values(207,67,'intalio\manager');

insert into module_action_access (id,module_action_id,role) values(208,73,'intalio\workflowadministrator');
insert into module_action_access (id,module_action_id,role) values(209,73,'intalio\processadministrator');
insert into module_action_access (id,module_action_id,role) values(210,73,'intalio\processmanager');
insert into module_action_access (id,module_action_id,role) values(211,73,'intalio\eng');
insert into module_action_access (id,module_action_id,role) values(212,73,'examples\employee');
insert into module_action_access (id,module_action_id,role) values(213,73,'examples\manager');
insert into module_action_access (id,module_action_id,role) values(214,73,'intalio\breadministrator');
insert into module_action_access (id,module_action_id,role) values(215,73,'intalio\collabadministrator');
insert into module_action_access (id,module_action_id,role) values(216,73,'intalio\collabdeveloper');
insert into module_action_access (id,module_action_id,role) values(217,73,'intalio\reportadministrator');

SET IDENTITY_INSERT module_action_access OFF;

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

create table awb_bpmn_diagrams(
    id NUMERIC(19,0) identity NOT NULL PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_by VARCHAR(255) NOT NULL,
    created_on DATETIME NOT NULL,
    updated_by VARCHAR(255),
    updated_on DATETIME,
    is_ready tinyint NOT NULL,
    json VARBINARY(MAX),
    svg VARBINARY(MAX)
);

create table awb_bpmn_access_permission(
	id NUMERIC(19,0) identity NOT NULL PRIMARY KEY,
	entity_name VARCHAR(255),
	entity_type NUMERIC,
	access_type NUMERIC,
	diagram_id NUMERIC(19,0) NOT NULL,
	constraint diagram_id_fk1 FOREIGN KEY(diagram_id) references awb_bpmn_diagrams(id)
);

create index BPMN_PERMISSION_IDX on awb_bpmn_access_permission (entity_name);

create table awb_diagram_object(
    id NUMERIC(19,0) identity NOT NULL PRIMARY KEY,
    uuid VARCHAR(255),
    resource_id  VARCHAR(255),
    stencil VARCHAR(50)
);

create table awb_diagram_object_property(
    id NUMERIC(19,0) identity NOT NULL PRIMARY KEY,
    uuid VARCHAR(255),
    diagram_object_id  NUMERIC(19,0),
    property_name VARCHAR(255),
    property_value VARCHAR(255)
);

create table awb_attachments (
    id NUMERIC(19,0) identity NOT NULL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    attachment_type VARCHAR(100),
    attachment_data VARBINARY(MAX),
    access_url VARCHAR(255) NOT NULL,
    activity_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    insert_time DATETIME NOT NULL
);


CREATE TABLE DBCONN_PROCESS_SPECIFIC_STATE ( 
	CONNECTION_NAME VARCHAR(78), 
	SUBSCRIBER_NAME VARCHAR(255), 
	RESPONSE_PAYLOAD_SEQUENCE_ID INTEGER,
	RESPONSE_PAYLOAD TEXT,
	LAST_MODIFIED datetime DEFAULT GETDATE()
);
CREATE INDEX DBCONN_PRC_STT_IDX on 
	DBCONN_PROCESS_SPECIFIC_STATE (CONNECTION_NAME, SUBSCRIBER_NAME);

CREATE TABLE DBCONN_SYSTEM_WIDE_STATE ( 
	CONNECTION_NAME VARCHAR(78), 
	RESPONSE_PAYLOAD_SEQUENCE_ID INTEGER,
	RESPONSE_PAYLOAD IMAGE
);
CREATE INDEX DBCONN_SYS_STT_IDX on 
	DBCONN_SYSTEM_WIDE_STATE (CONNECTION_NAME);

create table ODE_SCHEMA_VERSION(VERSION int);
insert into ODE_SCHEMA_VERSION values (7);

create table BPEL_ACTIVITY_RECOVERY (ID numeric(19,0) identity not null, PIID numeric(19,0) null, AID numeric(19,0) null, CHANNEL varchar(255) null, REASON varchar(1000) null, DATE_TIME datetime null, LDATA_ID numeric(19,0) null, ACTIONS varchar(255) null, RETRIES int null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));
create table BPEL_CORRELATION_PROP (ID numeric(19,0) identity not null, NAME varchar(255) null, NAMESPACE varchar(255) null, VALUE varchar(255) null, CORR_SET_ID numeric(19,0) null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));
create table BPEL_CORRELATION_SET (ID numeric(19,0) identity not null, VALUE varchar(255) null, CORR_SET_NAME varchar(255) null, SCOPE_ID numeric(19,0) null, PIID numeric(19,0) null, PROCESS_ID numeric(19,0) null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));
create table BPEL_CORRELATOR (ID numeric(19,0) identity not null, CID varchar(255) null, PROCESS_ID numeric(19,0) null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));
create table BPEL_CORRELATOR_MESSAGE_CKEY (ID numeric(19,0) identity not null, CKEY varchar(255) null, CORRELATOR_MESSAGE_ID numeric(19,0) null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));

create table BPEL_EVENT_V2 (ID numeric(19,0) identity not null, IID numeric(19,0) null, PID numeric(19,0) null, TYPE varchar(255) null, DETAIL text null, SID numeric(19,0) null, INSERT_TIME datetime null, 
 LINE_NO numeric(19,0), TIME_STAMP datetime, PROCESS_ID varchar(255), PROCESS_NAME varchar(255), PORT_TYPE varchar(255), OPERATION varchar(255), MEX_ID varchar(255),
 CORR_KEY_SET text, PROCESS_INSTANCE_ID numeric(19,0), STARTTIME numeric(19,0), COMPLETIONTIME numeric(19,0), FAULT varchar(255), ROOTSCOPEID numeric(19,0), SCOPEDECLARATIONID numeric(19,0), 
 OLDSTATE integer, NEWSTATE integer, ASPECT  integer, PARENT_SCOPE_ID numeric(19,0), SCOPE_NAME varchar(255), PARENT_SCOPES_NAMES varchar(255), ACTIVITY_NAME varchar(255), 
 ACTIVITY_TYPE varchar(255), ACTIVITY_DECLARATION_ID  integer, ACTIVITY_ID numeric(19,0), REASON varchar(255), ACTION  varchar(255), CORRELATION_SET_NAME   varchar(255), 
 CORR_KEY   text, EXPRESSION  varchar(255), RESULT  varchar(255), P_LINK_NAME  varchar(255), SUCCESS tinyint , FAULT_LINE_NO integer, EXPLANATION  varchar(255), 
 VAR_NAME  varchar(255), NEW_VALUE  text,
 MLOCK int not null, ADHOC_TASK_ID  varchar(255), PARENT_TASK_ID  varchar(255), primary key (ID));

create table BPEL_FAULT (ID numeric(19,0) identity not null, FAULTNAME varchar(255) null, LDATA_ID numeric(19,0) null, EXPLANATION text null, LINE_NUM int null, AID int null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));
create table BPEL_INSTANCE (ID numeric(19,0) identity not null, INSTANTIATING_CORRELATOR numeric(19,0) null, FAULT numeric(19,0) null, JACOB_STATE numeric(19,0) null, PREVIOUS_STATE smallint null, PROCESS_ID numeric(19,0) null, STATE smallint null, LAST_ACTIVE_DT datetime null, SEQUENCE numeric(19,0) null, FAILURE_COUNT int null, FAILURE_DT datetime null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));
create table BPEL_MESSAGE (ID numeric(19,0) identity not null, MEX numeric(19,0) null, TYPE varchar(255) null, DATA numeric(19,0) null, HEADER numeric(19,0) null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));
create table BPEL_MESSAGE_EXCHANGE (ID numeric(19,0) identity not null, PORT_TYPE varchar(255) null, CHANNEL_NAME varchar(255) null, CLIENTKEY varchar(255) null, LDATA_EPR_ID numeric(19,0) null, LDATA_CEPR_ID numeric(19,0) null, REQUEST numeric(19,0) null, RESPONSE numeric(19,0) null, INSERT_DT datetime null, OPERATION varchar(255) null, STATE varchar(255) null, PROCESS numeric(19,0) null, PIID numeric(19,0) null, DIR char(1) null, PLINK_MODELID int null, PATTERN varchar(255) null, CORR_STATUS varchar(255) null, FAULT_TYPE varchar(255) null, FAULT_EXPL varchar(255) null, CALLEE varchar(255) null, PARTNERLINK numeric(19,0) null, PIPED_ID varchar(255) null, SUBSCRIBER_COUNT numeric(19,0) null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));
create table BPEL_MEX_PROPS (MEX numeric(19,0) not null, VALUE varchar(8000) null, NAME varchar(255) not null, primary key (MEX, NAME));
create table BPEL_PLINK_VAL (ID numeric(19,0) identity not null, PARTNER_LINK varchar(250) not null, PARTNERROLE varchar(255) null, MYROLE_EPR numeric(19,0) null, PARTNERROLE_EPR numeric(19,0) null, PROCESS numeric(19,0) null, SCOPE numeric(19,0) null, SVCNAME varchar(255) null, MYROLE varchar(100) null, MODELID int null, MYSESSIONID varchar(255) null, PARTNERSESSIONID varchar(255) null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));
create table BPEL_PROCESS (ID numeric(19,0) identity not null, PROCID varchar(255) not null unique, deployer varchar(255) null, deploydate datetime null, type_name varchar(255) null, type_ns varchar(255) null, version numeric(19,0) null, ACTIVE_ tinyint null, guid varchar(255) null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));
create table BPEL_SCOPE (ID numeric(19,0) identity not null, PIID numeric(19,0) null, PARENT_SCOPE_ID numeric(19,0) null, STATE varchar(255) not null, NAME varchar(255) not null, MODELID int null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));
create table BPEL_SELECTORS (ID numeric(19,0) identity not null, PIID numeric(19,0) not null, SELGRPID varchar(255) not null, IDX int not null, CORRELATION_KEY varchar(255) not null, PROC_TYPE varchar(255) not null, ROUTE_POLICY varchar(16), CORRELATOR numeric(19,0) not null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID), unique (CORRELATION_KEY, CORRELATOR));
create table BPEL_UNMATCHED (ID numeric(19,0) identity not null, MEX numeric(19,0) null, CORRELATION_KEY varchar(255) null, CORRELATOR numeric(19,0), INSERT_TIME datetime null, MLOCK int not null, CORRELATOR_PROCESSTYPE varchar(550) null, primary key (ID));
create table BPEL_XML_DATA (ID numeric(19,0) identity not null, LDATA_ID numeric(19,0) null, NAME varchar(255) not null, SCOPE_ID numeric(19,0) null, PIID numeric(19,0) null, IS_SIMPLE_TYPE tinyint null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));
create table LARGE_DATA (ID numeric(19,0) identity not null, BIN_DATA image null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));
create table VAR_PROPERTY (ID numeric(19,0) identity not null, XML_DATA_ID numeric(19,0) null, PROP_VALUE varchar(255) null, PROP_NAME varchar(255) not null, INSERT_TIME datetime null, MLOCK int not null, primary key (ID));

create table STORE_DU (NAME varchar(255) not null, deployer varchar(255), DEPLOYDT datetime, DIR varchar(255), primary key (NAME));
create table STORE_PROCESS (PID varchar(255) not null, DU varchar(255), TYPE varchar(255), version integer, STATE varchar(255), primary key (PID));
create table STORE_PROCESS_PROP (propId varchar(255) not null, value varchar(255), name varchar(255) not null, primary key (propId, name));
create table STORE_VERSIONS (ID integer not null, VERSION integer, primary key (ID));

CREATE TABLE ODE_JOB (
  jobid CHAR(64)  NOT NULL DEFAULT '',
  ts BIGINT  NOT NULL DEFAULT 0,
  nodeid char(64),
  scheduled smallint  NOT NULL DEFAULT 0,
  transacted smallint  NOT NULL DEFAULT 0,
  details image,
  procid varchar(255),
  PRIMARY KEY(jobid)
);

create table START_EVENT (
	ID numeric(19,0) identity not null,
	PID varchar(255),
	EXPR_TYPE smallint,
	START_EVENT_STATE smallint,
	EXPR varchar(255),
	EPR varchar(512),
	OPERATION varchar(255),
	PROCESS_TARGET_NS varchar(255),
	REQUEST_NAME varchar(255),
	INSERT_TIME datetime,
	MLOCK  int not null,
	primary key (ID));


CREATE TABLE TASK_UBP_LINK (
        ID numeric(19,0) identity not null,
        UBP_INSTANCE_ID numeric(19,0) NOT NULL,
        TMP_INSTANCE_ID numeric(19,0) NOT NULL, 
        TASK_ID VARCHAR(255),
        ACTIVITY_INFO VARCHAR(255),
        TASK_REQUEST_VAR_NAME VARCHAR(255),
        TASK_RESPONSE_VAR_NAME VARCHAR(255),
        PRIMARY KEY (ID)
);
create index IDX_TASKUBPLINK_UBP on TASK_UBP_LINK (UBP_INSTANCE_ID);
create index IDX_TASKUBPLINK_TMP on TASK_UBP_LINK (TMP_INSTANCE_ID);
create index IDX_TASKUBPLINK_TASK on TASK_UBP_LINK (TASK_ID);

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

create table vacation(id integer not null,from_date datetime,to_date datetime,description VARCHAR(255),user_name VARCHAR(50),substitute VARCHAR(50),is_active BIT,PRIMARY KEY (id));
create table vacation_audit(id integer NOT NULL, action_performed VARCHAR(50), audit_date datetime, audit_user_name VARCHAR(50),vacation_id integer,updated_from_date datetime,updated_to_date datetime,updated_description VARCHAR(255),updated_user_name VARCHAR(50),updated_substitute VARCHAR(50),updated_is_active BIT,PRIMARY KEY (id));

create table dashboard_state(user_name VARCHAR(255) NOT NULL,ds_state TEXT NOT NULL,PRIMARY KEY(user_name));

create table security_realm
	(
		realm_id int identity not null,
		identifier varchar(50) not null,
		CONSTRAINT realm_pk PRIMARY KEY(realm_id),
		CONSTRAINT realm_unique UNIQUE(identifier)
	);

create table security_user
	(
		user_id int identity not null,
		realm_id int not null,
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
		role_id int identity not null,
		realm_id int not null,
		identifier varchar(50) not null,
		description varchar(100),
		CONSTRAINT role_pk PRIMARY KEY(role_id),
		CONSTRAINT role_unique UNIQUE(realm_id,identifier),
		constraint role_fk FOREIGN KEY(realm_id) references security_realm(realm_id)
	);

create table security_user_role
	(
		user_id int not null,
		role_id int not null,
		CONSTRAINT user_role_pk PRIMARY KEY(user_id,role_id),
		CONSTRAINT user_role_fk1 FOREIGN KEY (user_id) references security_user(user_id),
		CONSTRAINT role_fk2 FOREIGN KEY (role_id) references security_role(role_id)
	);

create table security_role_hierarchy
	(
		role_id int not null,
		descendant_role_id int not null,
		CONSTRAINT role_hierarchy_pk PRIMARY KEY(role_id,descendant_role_id),
		CONSTRAINT role_hierarchy_fk1 FOREIGN KEY(role_id) references security_role(role_id),
		CONSTRAINT role_hierarchy_fk2 FOREIGN KEY (descendant_role_id) references security_role(role_id)
	);


SET IDENTITY_INSERT security_realm ON;

insert into security_realm(realm_id, identifier) values(1, 'intalio');
insert into security_realm(realm_id, identifier) values(2, 'examples');

SET IDENTITY_INSERT security_realm OFF;
SET IDENTITY_INSERT security_user ON;

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

SET IDENTITY_INSERT security_user OFF;
SET IDENTITY_INSERT security_role ON;

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

SET IDENTITY_INSERT security_role OFF;

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

create index S_USER_IDENTIFIER_IDX on security_user (identifier);
create index S_ROLE_IDENTIFIER_IDX on security_role (identifier);
create index S_ROLE_HIERARCHY_DESC_IDX on security_role_hierarchy (descendant_role_id);


create table bre_ui_access (
	id numeric(19,0) identity not null ,
	entity_name varchar(255),
	entity_type numeric(19,0) ,
	access_type numeric(19,0) ,
	decisiontable_id numeric(19,0) not null,
	primary key (id)
) ;

create table bre_ui_decisiontable (
	id numeric(19,0) identity not null ,
	decisiontable_name varchar(255),
	package_name varchar(255),
	package_version numeric(19,0),
	relativepath varchar(255),
	last_updated datetime,
	last_deployed datetime,
	editable tinyint,
	updation_support tinyint,
	primary key (id)
) ;

create table bre_ui_lock (
	id numeric(19,0) identity not null ,
	user_name varchar(255),
	bre_dt_id numeric(19,0)  not null,
	primary key (id)
) ;

create table bre_audit (
    id numeric(19,0) identity not null,
    decisiontable_id numeric(19,0) not null,
    decision_table_name varchar(255),
    action varchar(100),
    user_name varchar(255),
    audit_date datetime,
    primary key (id)
);

create index i_bre_audit_dt_id on bre_audit (decisiontable_id);
create index i_bre_ui_lock_dt_id on bre_ui_lock (bre_dt_id);

create index i_bre_ui_access_dt_id on bre_ui_access (decisiontable_id);

alter table bre_ui_access
add constraint fk_dt_id foreign key (decisiontable_id) references bre_ui_decisiontable (id);


CREATE TABLE DEPLOY_ASSEMBLIES (ASSEMBLY VARCHAR(50) NOT NULL, VERSION NUMERIC(11) NOT NULL, DIR VARCHAR(50), CACTIVE NUMERIC(1), PRIMARY KEY (ASSEMBLY, VERSION));
CREATE TABLE DEPLOY_COMPONENTS (ASSEMBLY VARCHAR(50) NOT NULL, VERSION NUMERIC(11) NOT NULL, COMPONENT VARCHAR(50) NOT NULL, MANAGER VARCHAR(50) NOT NULL, DIR VARCHAR(50), PRIMARY KEY (ASSEMBLY, VERSION, COMPONENT, MANAGER));
CREATE TABLE DEPLOY_RESOURCES (ASSEMBLY VARCHAR(50) NOT NULL, VERSION NUMERIC(11) NOT NULL, COMPONENT VARCHAR(50) NOT NULL, MANAGER VARCHAR(50) NOT NULL, RESOURCE_ID VARCHAR(250) NOT NULL, PRIMARY KEY (ASSEMBLY, VERSION, COMPONENT, MANAGER, RESOURCE_ID));

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

