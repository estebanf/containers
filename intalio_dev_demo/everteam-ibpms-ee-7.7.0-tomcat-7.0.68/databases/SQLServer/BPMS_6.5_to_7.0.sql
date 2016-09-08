ALTER TABLE filters ADD processState VARCHAR(20) DEFAULT '';
ALTER TABLE filters ADD isProcess TINYINT DEFAULT 0;

INSERT INTO states(NAME) VALUES('Active');
INSERT INTO states(NAME) VALUES('Suspended');
INSERT INTO states(NAME) VALUES('Terminated');
INSERT INTO states(NAME) VALUES('Completed');
INSERT INTO states(NAME) VALUES('Failed');
INSERT INTO states(NAME) VALUES('Failure');

ALTER TABLE tempo_pa ADD ctm_xml TEXT ;

CREATE TABLE tempo_prev_owners (
	TASK_ID VARCHAR(255) NOT NULL,
	prev_users VARCHAR(255),
	prev_roles VARCHAR(255)
);

CREATE INDEX I_TMP_TG_PATASK_ID ON tempo_generic (PATASK_ID);
CREATE INDEX I_TMP_OWNR_TASK_ID ON tempo_prev_owners (TASK_ID);
CREATE INDEX I_TMP_PA_PIID ON tempo_pa(instance_id);

ALTER TABLE tempo_audit ADD variable_name VARCHAR(255);
ALTER TABLE tempo_audit ADD prev_var_data IMAGE;
ALTER TABLE tempo_audit ADD new_var_data IMAGE;
ALTER TABLE tempo_audit ADD audit_type VARCHAR(25);

ALTER TABLE tempo_task ADD last_active_date DATETIME;
ALTER TABLE tempo_task ADD last_assigned_date DATETIME;

CREATE TABLE collab_repository (
	id BIGINT IDENTITY NOT NULL,
	name VARCHAR(100),
	created_by VARCHAR(50),
	created_date DATETIME NOT NULL,
	modified_by VARCHAR(50),
	modified_date DATETIME,
	status TINYINT,
	PRIMARY KEY (id)
);

CREATE TABLE collab_project (
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

CREATE TABLE collab_branch (
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

CREATE TABLE collab_resource (
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

insert into collab_repository values('Intalio', 'intalio\\admin', GETDATE(), 'intalio\\admin', GETDATE(), 4);

CREATE INDEX idxCRRepoId ON collab_resource (repo_name);
CREATE INDEX idxCRProjId ON collab_resource (project_name);
CREATE INDEX idxCRBranchId ON collab_resource (branch_name);

CREATE INDEX idxCCRepoId ON collab_commit (repo_name);
CREATE INDEX idxCCProjId ON collab_commit (project_name);
CREATE INDEX idxCCBranchId ON collab_commit (branch_name);

CREATE INDEX idxCRMCommitId ON collab_commit_detail (commit_id);
CREATE INDEX idxCRMResourceId ON collab_commit_detail (resource_id);

CREATE TABLE social_comments(
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

CREATE INDEX idxComThreadId ON social_comments (threadId);
CREATE INDEX idxComRefTypeId ON social_comments (refCommentTypeId);

CREATE INDEX idxRefModuleId ON social_comments_type (refModuleId);

CREATE TABLE module_action (
	id INT identity NOT NULL,
	name VARCHAR(255) NOT NULL,
	parent_id INT, 
	is_action tinyint, 
	native_name VARCHAR(255),
	is_active tinyint,
	PRIMARY KEY(id)
);

SET IDENTITY_INSERT module_action ON;

insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(1,'Dashboard',NULL,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(2,'Workflow',NULL,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(3,'Tasks',2,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(4,'Notifications',2,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(5,'Processes',2,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(6,'Collaboration',NULL,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(7,'BAM',NULL,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(8,'Administration',NULL,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(9,'Monitoring',8,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(10,'Processes',9,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(11,'Instances',9,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(12,'Auditing',8,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(13,'Instances',12,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(14,'Workflow',12,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(15,'Access Control',8,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(16,'Roles',15,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(17,'Users',15,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(18,'Modules',15,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(19,'Logging',8,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(20,'Log4j',19,0,'files:loggers',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(21,'Marker In Log File',19,0,'files:marker',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(22,'Download Log File',19,0,'files:export',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(23,'Utilities',8,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(24,'Download Config File',23,0,'files:export',1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(25,'Manage Timers',23,0,NULL,1);
insert into module_action (id,name,parent_id,is_action,native_name,is_active) values(26,'Clear TMS Cache',23,0,NULL,1);
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

SET IDENTITY_INSERT module_action OFF;

CREATE TABLE module_action_access(
	id INT identity NOT NULL,
	module_action_id INT NOT NULL,
	role VARCHAR(255) NOT NULL,
	PRIMARY KEY(id)
);
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
SET IDENTITY_INSERT module_action_access OFF;

ALTER TABLE BPEL_ACTIVITY_RECOVERY ALTER COLUMN REASON varchar(1000) NULL ;

IF( EXISTS( SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = 'DBCONN_PROCESS_SPECIFIC_STATE'
      AND COLUMN_NAME = 'RESPONSE_PAYLOAD' AND DATA_TYPE = 'IMAGE')
    AND NOT EXISTS( SELECT * FROM DBCONN_PROCESS_SPECIFIC_STATE))
BEGIN
DROP TABLE DBCONN_PROCESS_SPECIFIC_STATE;
CREATE TABLE DBCONN_PROCESS_SPECIFIC_STATE (
	  CONNECTION_NAME VARCHAR(78),
	  SUBSCRIBER_NAME VARCHAR(255),
	  RESPONSE_PAYLOAD_SEQUENCE_ID INTEGER,
	  RESPONSE_PAYLOAD TEXT
);
END

CREATE INDEX IDX_EVENT_PID ON BPEL_EVENT(PID);
CREATE INDEX IDX_EVENT_SID ON BPEL_EVENT(SID);

DROP INDEX IDX_PLINK_VAL_MODELID ON BPEL_PLINK_VAL;
CREATE INDEX IDX_PLINK_VAL_MODELID ON BPEL_PLINK_VAL (MODELID);
CREATE INDEX IDX_PLINK_VAL_SCOPE ON BPEL_PLINK_VAL (SCOPE);

DROP INDEX IDX_UNMATCHED_CORR_PROCTYPE   ON BPEL_UNMATCHED;

CREATE INDEX IDX_BPEL_XML_DATA_PIID ON BPEL_XML_DATA(PIID);

DROP INDEX IDX_BPEL_MEX_PROPS_VALUE ON BPEL_MEX_PROPS;
CREATE INDEX IDX_BPEL_MEX_PROPS_VALUE ON BPEL_MEX_PROPS (MEX);

ALTER TABLE vacation ADD substitute VARCHAR(50);
ALTER TABLE vacation ADD is_active BIT;

CREATE TABLE vacation_audit(
	id integer NOT NULL, 
	action_performed VARCHAR(50), 
	audit_date datetime, 
	audit_user_name VARCHAR(50),
	vacation_id integer,
	updated_from_date Date,
	updated_to_date Date,
	updated_description VARCHAR(255),
	updated_user_name VARCHAR(50),
	updated_substitute VARCHAR(50),
	updated_is_active BIT,
	PRIMARY KEY (id)
);

