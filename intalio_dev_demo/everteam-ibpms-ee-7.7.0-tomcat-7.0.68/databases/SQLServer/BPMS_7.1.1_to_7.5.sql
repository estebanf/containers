
create table ahr_report(report_id INT identity NOT NULL, name VARCHAR(100) NOT NULL, description VARCHAR(1000), location VARCHAR(1000) NOT NULL, created_on DATETIME NOT NULL, modified_on DATETIME NOT NULL, is_executable tinyint NOT NULL, owner VARCHAR(100) NOT NULL, PRIMARY KEY(report_id));
create table ahr_shared_report(access_id INT identity NOT NULL, shared_to VARCHAR(100) NOT NULL, report_id INT NOT NULL, is_role tinyint NOT NULL, PRIMARY KEY(access_id));

create table tempo_acl1 (id BIGINT identity NOT NULL, action VARCHAR(255), DTYPE VARCHAR(255), PRIMARY KEY (id));
SET IDENTITY_INSERT tempo_acl1 ON;
insert into tempo_acl1 (id, action, dtype) select id, action, dtype from tempo_acl;
SET IDENTITY_INSERT tempo_acl1 OFF;
begin transaction;
DROP TABLE tempo_acl;
commit;
exec sp_rename @objname = 'tempo_acl1', @newname = 'tempo_acl';

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

CREATE INDEX I_TEMPO_ITEM_URI on TEMPO_ITEM(uri);

update module_action set name = 'Reports' where id =7;
update module_action set is_active = 0 where id =16;
update module_action set is_active = 0 where id =17;
update module_action set name = 'Organization' where id =64;

SET IDENTITY_INSERT module_action ON;

insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(65,'Roles',64,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(66,'Hierarchies',64,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(67,'Pre Defined Reports',7,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(68,'Ad hoc Reports',7,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(69,'Business Rules',NULL,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(70,'Manage Data Definitions',68,0,NULL,0);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(71,'Product Info',8,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(72,'Business Rules',12,0,NULL,1);

SET IDENTITY_INSERT module_action OFF;

update module_action_access set module_action_id = 71 where module_action_id = 64;

insert into module_action_access (module_action_id,role) values(64,'intalio\workflowadministrator');
insert into module_action_access (module_action_id,role) values(65,'intalio\workflowadministrator');
insert into module_action_access (module_action_id,role) values(66,'intalio\workflowadministrator');

insert into module_action_access (module_action_id,role) values(64,'intalio\processadministrator');
insert into module_action_access (module_action_id,role) values(65,'intalio\processadministrator');
insert into module_action_access (module_action_id,role) values(66,'intalio\processadministrator');

insert into module_action_access (module_action_id,role) values(64,'intalio\processmanager');
insert into module_action_access (module_action_id,role) values(65,'intalio\processmanager');
insert into module_action_access (module_action_id,role) values(66,'intalio\processmanager');

insert into module_action_access (module_action_id,role) values(67,'intalio\workflowadministrator');
insert into module_action_access (module_action_id,role) values(67,'intalio\processadministrator');
insert into module_action_access (module_action_id,role) values(67,'intalio\processmanager');

insert into module_action_access (module_action_id,role) values(68,'intalio\workflowadministrator');
insert into module_action_access (module_action_id,role) values(68,'intalio\processadministrator');
insert into module_action_access (module_action_id,role) values(68,'intalio\processmanager');

insert into module_action_access (module_action_id,role) values(69,'intalio\workflowadministrator');
insert into module_action_access (module_action_id,role) values(69,'intalio\processadministrator');
insert into module_action_access (module_action_id,role) values(69,'intalio\processmanager');

insert into module_action_access (module_action_id,role) values(72,'intalio\workflowadministrator');
insert into module_action_access (module_action_id,role) values(72,'intalio\processadministrator');
insert into module_action_access (module_action_id,role) values(72,'intalio\processmanager');

insert into module_action_access (module_action_id,role) values(69,'intalio\breadministrator');

insert into module_action_access (module_action_id,role) values(67,'intalio\eng');
insert into module_action_access (module_action_id,role) values(67,'intalio\employee');
insert into module_action_access (module_action_id,role) values(67,'intalio\manager');

ALTER TABLE BPEL_PLINK_VAL ALTER COLUMN PARTNERROLE varchar(255) NULL ;
ALTER TABLE ODE_JOB add  procid varchar(255);

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

create index IDX_START_EVENT_PROCESS_ID on START_EVENT (PID);

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

update DEPLOY_RESOURCES set RESOURCE_ID = replace(RESOURCE_ID, '/ode/processes/','/intalio/ode/processes/');
update tempo_pipa set process_endpoint = replace(process_endpoint, '/ode/processes/','/intalio/ode/processes/');

alter table tempo_filter
	alter column filter_name VARCHAR(255) NOT NULL;
alter table tempo_filter
	drop column description;

alter table tempo_filter
	add project_name VARCHAR(255),
        custom_column SMALLINT,
        deadline VARCHAR(255),
        process_id VARCHAR(255);

sp_rename 'tempo_filter.created_by', 'created_user', 'COLUMN';
update tempo_filter set custom_column = 1;
