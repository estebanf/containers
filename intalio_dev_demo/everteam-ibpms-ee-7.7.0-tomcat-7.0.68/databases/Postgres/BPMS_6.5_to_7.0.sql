ALTER TABLE filters ADD processState VARCHAR(20) DEFAULT '';
ALTER TABLE filters ADD isProcess BOOLEAN DEFAULT '0';

INSERT INTO states(ID, NAME) VALUES(1, 'Active');
INSERT INTO states(ID, NAME) VALUES(2, 'Suspended');
INSERT INTO states(ID, NAME) VALUES(3, 'Terminated');
INSERT INTO states(ID, NAME) VALUES(4, 'Completed');
INSERT INTO states(ID, NAME) VALUES(5, 'Failed');
INSERT INTO states(ID, NAME) VALUES(6, 'Failure');

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
ALTER TABLE tempo_audit ADD prev_var_data bytea;
ALTER TABLE tempo_audit ADD new_var_data bytea;
ALTER TABLE tempo_audit ADD audit_type VARCHAR(25);

ALTER TABLE tempo_task ADD last_active_date TIMESTAMP;
ALTER TABLE tempo_task ADD last_assigned_date TIMESTAMP;

CREATE TABLE collab_repository (
	id int8 NOT NULL,
	name varchar(100),
	created_by varchar(50),
	created_date TIMESTAMP NOT NULL,
	modified_by varchar(50),
	modified_date TIMESTAMP,
	status int2,
	PRIMARY KEY (id)
);

CREATE TABLE collab_project (
	id int8 NOT NULL,
	repo_name varchar(100),
	name varchar(100),
	description varchar(400),
	created_by varchar(50),
	created_date TIMESTAMP  NOT NULL,
	modified_by varchar(50),
	modified_date TIMESTAMP,
	status int2,
	PRIMARY KEY (id)
);

CREATE TABLE collab_branch (
	id int8 NOT NULL,
	repo_name varchar(100),
        project_name varchar(100),
	name varchar(100),
	created_date TIMESTAMP  NOT NULL,
	created_by varchar(50),
	modified_date TIMESTAMP,
	modified_by varchar(50),
	in_sync boolean,
	status int2,
	head_commit_id varchar(100),
	PRIMARY KEY (id)
);

CREATE TABLE collab_resource (
	id int8 NOT NULL,
	repo_name varchar(100),
	project_name varchar(100),
	branch_name varchar(100),
	name varchar(1000),
	created_by varchar(50),
	created_date TIMESTAMP  NOT NULL,
	modified_by varchar(50),
	modified_date TIMESTAMP,
	status int2,
	latest_commit_id varchar(100),
	renamed_to int8,
	lock_id int8,
	PRIMARY KEY (id)
);

CREATE TABLE collab_commit (
	id varchar(100) NOT NULL,
	repo_name varchar(100),
	project_name varchar(100),
	branch_name varchar(100),
	commit_message varchar(1000),
	commited_by varchar(50),
	commited_date int8 NOT NULL,
	modified_by varchar(50),
	modified_date TIMESTAMP,
	status int2,
	commit_path varchar(1000),
	PRIMARY KEY (id)
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

CREATE TABLE collab_lock (
	id int8 NOT NULL,
	locked_by varchar(50),
	locked_date TIMESTAMP  NOT NULL,
	unlocked_by varchar(50),
	unlocked_date TIMESTAMP,
	workspace_id varchar(255),
	status int2,
	PRIMARY KEY (id)
);

CREATE TABLE collab_commit_detail (
	id int8 NOT NULL,
	commit_id varchar(100),
	resource_id int8,
	status int2,
	PRIMARY KEY (id)
);

INSERT INTO collab_repository VALUES(1, 'Intalio', 'intalio\\admin', now(), 'intalio\\admin', now(), 4);

CREATE INDEX idxCRRepoId ON collab_resource (repo_name);
CREATE INDEX idxCRProjId ON collab_resource (project_name);
CREATE INDEX idxCRBranchId ON collab_resource (branch_name);

CREATE INDEX idxCCRepoId ON collab_commit (repo_name);
CREATE INDEX idxCCProjId ON collab_commit (project_name);
CREATE INDEX idxCCBranchId ON collab_commit (branch_name);

CREATE INDEX idxCRMCommitId ON collab_commit_detail (commit_id);
CREATE INDEX idxCRMResourceId ON collab_commit_detail (resource_id);

CREATE TABLE social_comments(
	commentID INT8 NOT NULL,
	refCommentTypeId INT8,
	threadId VARCHAR(255),
	createdBy VARCHAR(50),
	createdDate TIMESTAMP,
	commentText VARCHAR(4000),
	PRIMARY KEY (commentID)
);

CREATE TABLE social_comments_type(
	commentTypeId INT8 NOT NULL,
	refModuleId INT8,
	threadTypeDesc VARCHAR(255),
	PRIMARY KEY (commentTypeId)
);

CREATE INDEX idxComThreadId ON social_comments (threadId);
CREATE INDEX idxComRefTypeId ON social_comments (refCommentTypeId);

CREATE INDEX idxRefModuleId ON social_comments_type (refModuleId);

CREATE TABLE module_action (
	id int4 NOT NULL,
	name varchar(255) NOT NULL,
	parent_id int4,
	is_action boolean, 
	native_name VARCHAR(255),
	is_active boolean,
	PRIMARY KEY(id)
);

CREATE TABLE module_action_access(
	id int4 NOT NULL,
	module_action_id int4 NOT NULL,
	role varchar(255) NOT NULL,
	PRIMARY KEY(id)
);

insert into module_action values(1,'Dashboard',NULL,'0',NULL,'1');
insert into module_action values(2,'Workflow',NULL,'0',NULL,'1');
insert into module_action values(3,'Tasks',2,'0',NULL,'1');
insert into module_action values(4,'Notifications',2,'0',NULL,'1');
insert into module_action values(5,'Processes',2,'0',NULL,'1');
insert into module_action values(6,'Collaboration',NULL,'0',NULL,'1');
insert into module_action values(7,'BAM',NULL,'0',NULL,'1');
insert into module_action values(8,'Administration',NULL,'0',NULL,'1');
insert into module_action values(9,'Monitoring',8,'0',NULL,'1');
insert into module_action values(10,'Processes',9,'0',NULL,'1');
insert into module_action values(11,'Instances',9,'0',NULL,'1');
insert into module_action values(12,'Auditing',8,'0',NULL,'1');
insert into module_action values(13,'Instances',12,'0',NULL,'1');
insert into module_action values(14,'Workflow',12,'0',NULL,'1');
insert into module_action values(15,'Access Control',8,'0',NULL,'1');
insert into module_action values(16,'Roles',15,'0',NULL,'1');
insert into module_action values(17,'Users',15,'0',NULL,'1');
insert into module_action values(18,'Modules',15,'0',NULL,'1');
insert into module_action values(19,'Logging',8,'0',NULL,'1');
insert into module_action values(20,'Log4j',19,'0','files:loggers','1');
insert into module_action values(21,'Marker In Log File',19,'0','files:marker','1');
insert into module_action values(22,'Download Log File',19,'0','files:export','1');
insert into module_action values(23,'Utilities',8,'0',NULL,'1');
insert into module_action values(24,'Download Config File',23,'0','files:export','1');
insert into module_action values(25,'Manage Timers',23,'0',NULL,'1');
insert into module_action values(26,'Clear TMS Cache',23,'0',NULL,'1');
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

insert into module_action_access values(1,1,'intalio\processadministrator');
insert into module_action_access values(2,2,'intalio\processadministrator');
insert into module_action_access values(3,3,'intalio\processadministrator');
insert into module_action_access values(4,4,'intalio\processadministrator');
insert into module_action_access values(5,5,'intalio\processadministrator');
insert into module_action_access values(6,6,'intalio\processadministrator');
insert into module_action_access values(7,7,'intalio\processadministrator');
insert into module_action_access values(8,8,'intalio\processadministrator');
insert into module_action_access values(9,9,'intalio\processadministrator');
insert into module_action_access values(10,10,'intalio\processadministrator');
insert into module_action_access values(11,11,'intalio\processadministrator');
insert into module_action_access values(12,12,'intalio\processadministrator');
insert into module_action_access values(13,13,'intalio\processadministrator');
insert into module_action_access values(14,14,'intalio\processadministrator');
insert into module_action_access values(15,15,'intalio\processadministrator');
insert into module_action_access values(16,16,'intalio\processadministrator');
insert into module_action_access values(17,17,'intalio\processadministrator');
insert into module_action_access values(18,18,'intalio\processadministrator');
insert into module_action_access values(19,19,'intalio\processadministrator');
insert into module_action_access values(20,20,'intalio\processadministrator');
insert into module_action_access values(21,21,'intalio\processadministrator');
insert into module_action_access values(22,22,'intalio\processadministrator');
insert into module_action_access values(23,23,'intalio\processadministrator');
insert into module_action_access values(24,24,'intalio\processadministrator');
insert into module_action_access values(25,25,'intalio\processadministrator');
insert into module_action_access values(26,26,'intalio\processadministrator');

insert into module_action_access values(27,1,'intalio\workflowadministrator');
insert into module_action_access values(28,2,'intalio\workflowadministrator');
insert into module_action_access values(29,3,'intalio\workflowadministrator');
insert into module_action_access values(30,4,'intalio\workflowadministrator');
insert into module_action_access values(31,5,'intalio\workflowadministrator');
insert into module_action_access values(32,6,'intalio\workflowadministrator');
insert into module_action_access values(33,7,'intalio\workflowadministrator');
insert into module_action_access values(34,8,'intalio\workflowadministrator');
insert into module_action_access values(35,9,'intalio\workflowadministrator');
insert into module_action_access values(36,10,'intalio\workflowadministrator');
insert into module_action_access values(37,11,'intalio\workflowadministrator');
insert into module_action_access values(38,12,'intalio\workflowadministrator');
insert into module_action_access values(39,13,'intalio\workflowadministrator');
insert into module_action_access values(40,14,'intalio\workflowadministrator');
insert into module_action_access values(41,15,'intalio\workflowadministrator');
insert into module_action_access values(42,16,'intalio\workflowadministrator');
insert into module_action_access values(43,17,'intalio\workflowadministrator');
insert into module_action_access values(44,18,'intalio\workflowadministrator');
insert into module_action_access values(45,19,'intalio\workflowadministrator');
insert into module_action_access values(46,20,'intalio\workflowadministrator');
insert into module_action_access values(47,21,'intalio\workflowadministrator');
insert into module_action_access values(48,22,'intalio\workflowadministrator');
insert into module_action_access values(49,23,'intalio\workflowadministrator');
insert into module_action_access values(50,24,'intalio\workflowadministrator');
insert into module_action_access values(51,25,'intalio\workflowadministrator');
insert into module_action_access values(52,26,'intalio\workflowadministrator');

insert into module_action_access values(53,1,'intalio\processmanager');
insert into module_action_access values(54,2,'intalio\processmanager');
insert into module_action_access values(55,3,'intalio\processmanager');
insert into module_action_access values(56,4,'intalio\processmanager');
insert into module_action_access values(57,5,'intalio\processmanager');
insert into module_action_access values(58,6,'intalio\processmanager');
insert into module_action_access values(59,7,'intalio\processmanager');
insert into module_action_access values(60,8,'intalio\processmanager');
insert into module_action_access values(61,9,'intalio\processmanager');
insert into module_action_access values(62,10,'intalio\processmanager');
insert into module_action_access values(63,11,'intalio\processmanager');
insert into module_action_access values(64,12,'intalio\processmanager');
insert into module_action_access values(65,13,'intalio\processmanager');
insert into module_action_access values(66,14,'intalio\processmanager');
insert into module_action_access values(67,15,'intalio\processmanager');
insert into module_action_access values(68,16,'intalio\processmanager');
insert into module_action_access values(69,17,'intalio\processmanager');
insert into module_action_access values(70,18,'intalio\processmanager');
insert into module_action_access values(71,19,'intalio\processmanager');
insert into module_action_access values(72,20,'intalio\processmanager');
insert into module_action_access values(73,21,'intalio\processmanager');
insert into module_action_access values(74,22,'intalio\processmanager');
insert into module_action_access values(75,23,'intalio\processmanager');
insert into module_action_access values(76,24,'intalio\processmanager');
insert into module_action_access values(77,25,'intalio\processmanager');
insert into module_action_access values(78,26,'intalio\processmanager');


insert into module_action_access values(79,1,'intalio\eng');
insert into module_action_access values(80,2,'intalio\eng');
insert into module_action_access values(81,3,'intalio\eng');
insert into module_action_access values(82,4,'intalio\eng');
insert into module_action_access values(83,5,'intalio\eng');
insert into module_action_access values(84,6,'intalio\eng');
insert into module_action_access values(85,7,'intalio\eng');


insert into module_action_access values(86,1,'examples\employee');
insert into module_action_access values(87,2,'examples\employee');
insert into module_action_access values(88,3,'examples\employee');
insert into module_action_access values(89,4,'examples\employee');
insert into module_action_access values(90,5,'examples\employee');
insert into module_action_access values(91,6,'examples\employee');
insert into module_action_access values(92,7,'examples\employee');

insert into module_action_access values(93,1,'examples\manager');
insert into module_action_access values(94,2,'examples\manager');
insert into module_action_access values(95,3,'examples\manager');
insert into module_action_access values(96,4,'examples\manager');
insert into module_action_access values(97,5,'examples\manager');
insert into module_action_access values(98,6,'examples\manager');
insert into module_action_access values(99,7,'examples\manager');

insert into module_action_access values(100,27,'intalio\processadministrator');
insert into module_action_access values(101,28,'intalio\processadministrator');
insert into module_action_access values(102,29,'intalio\processadministrator');
insert into module_action_access values(103,30,'intalio\processadministrator');
insert into module_action_access values(104,31,'intalio\processadministrator');
insert into module_action_access values(105,32,'intalio\processadministrator');
insert into module_action_access values(106,33,'intalio\processadministrator');
insert into module_action_access values(107,34,'intalio\processadministrator');
insert into module_action_access values(108,35,'intalio\processadministrator');
insert into module_action_access values(109,36,'intalio\processadministrator');

insert into module_action_access values(110,27,'intalio\workflowadministrator');
insert into module_action_access values(111,28,'intalio\workflowadministrator');
insert into module_action_access values(112,29,'intalio\workflowadministrator');
insert into module_action_access values(113,30,'intalio\workflowadministrator');
insert into module_action_access values(114,31,'intalio\workflowadministrator');
insert into module_action_access values(115,32,'intalio\workflowadministrator');
insert into module_action_access values(116,33,'intalio\workflowadministrator');
insert into module_action_access values(117,34,'intalio\workflowadministrator');
insert into module_action_access values(118,35,'intalio\workflowadministrator');
insert into module_action_access values(119,36,'intalio\workflowadministrator');

insert into module_action_access values(120,37,'intalio\processadministrator');
insert into module_action_access values(121,38,'intalio\processadministrator');
insert into module_action_access values(122,37,'intalio\workflowadministrator');
insert into module_action_access values(123,38,'intalio\workflowadministrator');

insert into module_action_access values(124,39,'intalio\processadministrator');
insert into module_action_access values(125,39,'intalio\workflowadministrator');
insert into module_action_access values(126,39,'intalio\processmanager');
insert into module_action_access values(127,39,'intalio\eng');
insert into module_action_access values(128,39,'examples\employee');
insert into module_action_access values(129,39,'examples\manager');

insert into module_action_access values(130,40,'intalio\processadministrator');
insert into module_action_access values(131,41,'intalio\processadministrator');
insert into module_action_access values(132,42,'intalio\processadministrator');
insert into module_action_access values(133,43,'intalio\processadministrator');
insert into module_action_access values(134,44,'intalio\processadministrator');
insert into module_action_access values(135,45,'intalio\processadministrator');
insert into module_action_access values(136,46,'intalio\processadministrator');
insert into module_action_access values(137,47,'intalio\processadministrator');

insert into module_action_access values(138,40,'intalio\workflowadministrator');
insert into module_action_access values(139,41,'intalio\workflowadministrator');
insert into module_action_access values(140,42,'intalio\workflowadministrator');
insert into module_action_access values(141,43,'intalio\workflowadministrator');
insert into module_action_access values(142,44,'intalio\workflowadministrator');
insert into module_action_access values(143,45,'intalio\workflowadministrator');
insert into module_action_access values(144,46,'intalio\workflowadministrator');
insert into module_action_access values(145,47,'intalio\workflowadministrator');

insert into module_action_access values(146,48,'intalio\processadministrator');
insert into module_action_access values(147,49,'intalio\processadministrator');
insert into module_action_access values(148,50,'intalio\processadministrator');
insert into module_action_access values(149,51,'intalio\processadministrator');
insert into module_action_access values(150,52,'intalio\processadministrator');
insert into module_action_access values(151,53,'intalio\processadministrator');
insert into module_action_access values(152,54,'intalio\processadministrator');
insert into module_action_access values(153,55,'intalio\processadministrator');
insert into module_action_access values(154,56,'intalio\processadministrator');
insert into module_action_access values(155,57,'intalio\processadministrator');
insert into module_action_access values(156,58,'intalio\processadministrator');

insert into module_action_access values(159,48,'intalio\workflowadministrator');
insert into module_action_access values(160,49,'intalio\workflowadministrator');
insert into module_action_access values(161,50,'intalio\workflowadministrator');
insert into module_action_access values(162,51,'intalio\workflowadministrator');
insert into module_action_access values(163,52,'intalio\workflowadministrator');
insert into module_action_access values(164,53,'intalio\workflowadministrator');
insert into module_action_access values(165,54,'intalio\workflowadministrator');
insert into module_action_access values(166,55,'intalio\workflowadministrator');
insert into module_action_access values(167,56,'intalio\workflowadministrator');
insert into module_action_access values(168,57,'intalio\workflowadministrator');
insert into module_action_access values(169,58,'intalio\workflowadministrator');

insert into module_action_access values(170,59,'intalio\processadministrator');
insert into module_action_access values(171,60,'intalio\processadministrator');
insert into module_action_access values(172,61,'intalio\processadministrator');
insert into module_action_access values(173,62,'intalio\processadministrator');
insert into module_action_access values(174,63,'intalio\processadministrator');

insert into module_action_access values(175,59,'intalio\workflowadministrator');
insert into module_action_access values(176,60,'intalio\workflowadministrator');
insert into module_action_access values(177,61,'intalio\workflowadministrator');
insert into module_action_access values(178,62,'intalio\workflowadministrator');
insert into module_action_access values(179,63,'intalio\workflowadministrator');


ALTER TABLE BPEL_ACTIVITY_RECOVERY ALTER REASON TYPE VARCHAR(1000);

CREATE INDEX IDX_EVENT_PID ON BPEL_EVENT(PID);
CREATE INDEX IDX_EVENT_SID ON BPEL_EVENT(SID);

DROP INDEX IF EXISTS IDX_PLINK_VAL_MODELID;
CREATE INDEX IDX_PLINK_VAL_MODELID ON BPEL_PLINK_VAL (MODELID);
CREATE INDEX IDX_PLINK_VAL_SCOPE ON BPEL_PLINK_VAL (SCOPE);

DROP INDEX IF EXISTS IDX_UNMATCHED_CORR_PROCTYPE;

CREATE INDEX IDX_BPEL_XML_DATA_PIID ON BPEL_XML_DATA(PIID);

DROP INDEX IF EXISTS IDX_BPEL_MEX_PROPS_VALUE;
CREATE INDEX IDX_BPEL_MEX_PROPS_VALUE ON BPEL_MEX_PROPS (MEX);

ALTER TABLE vacation ADD substitute VARCHAR(50);
ALTER TABLE vacation ADD is_active SMALLINT;

CREATE TABLE vacation_audit(
	id int8 NOT NULL, 
	action_performed VARCHAR(50), 
	audit_date TIMESTAMP, 
	audit_user_name VARCHAR(50),
	vacation_id int8,
	updated_from_date DATE,
	updated_to_date DATE,
	updated_description VARCHAR(255),
	updated_user_name VARCHAR(50),
	updated_substitute VARCHAR(50),
	updated_is_active SMALLINT,
	PRIMARY KEY (id)
);

