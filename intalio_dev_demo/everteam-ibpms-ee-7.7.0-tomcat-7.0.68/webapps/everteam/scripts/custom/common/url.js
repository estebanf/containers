/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

var intalio_bpms = {
    sidebar:{
        license_validate:"dashboard/data.json",
        get_avatar:"ui-fw/user/avatar?",
        module_access:"console/modules/access",
    },
    org_mapping_roles: {
        roles_rbac_url: "orgMapping/roles/import",
        list_roles: "orgMapping/roles",
        import_roles: "orgMapping/roles/import",
        create_role: "orgMapping/roles",
        delete_role: "orgMapping/roles/delete",
        users_list: "orgMapping/users",
        users_update: "orgMapping/roles/update",
        realms: "orgMapping/realms",
        get_user_obj: "orgMapping/users/",
        roles_sync: "orgMapping/roles/sync",
        roles_last_sync: "orgMapping/roles/last_sync"
    },
    org_mapping_users:{
        get_users:"orgMapping/users",
        search_users:"orgMapping/users/search"
    },
    task_filter: {
        create_delete_filter: "ui-fw/filter",
        list_filter: "ui-fw/filter/list",
        apply_filter: "ui-fw/updates.htm",
        update_filter: "ui-fw/filter/update",
        getAssignedToUsers: "orgMapping/users/peers_subordinates",
        getAssignedToRoles: "orgMapping/users/loggedin_user_roles",
        get_filter: "ui-fw/filter",
        getPackages: "dashboard/filters/processes"
    },
    module_access: {
        role_list: "orgMapping/roles/external_internal"
    },
    adhoc_reporting: {
        get_report_admin:"adhocreport/access/admin",
    	get_reports : "adhocreport/reports",
    	share_reports: "adhocreport/access/reports",
    	delete_report: "adhocreport/reports/delete",
    	get_report_accessors: "adhocreport/access/reports",
    	get_templates : "adhocreport/definitions",
    	grant_access: "adhocreport/access/reports/base",
    	delete_template: "adhocreport/definitions/delete",
    	get_user_templates : "adhocreport/definitions/user",
    	report_preview : "adhocreport/reports/preview",
    	save_report : "adhocreport/reports/",
        get_dataDef_meta_data:"adhocreport/definitions/{id}",
        update_data_source:"adhocreport/definitions/{id}/update",
        configuration:"adhocreport/reports/configuration/params"
    },
    user_preferences:{
		preferences : "ui-fw/user/preferences",
		profile     : "ui-fw/user/profile",
		config      : "ui-fw/user/config",
		skills      : "ui-fw/user/skills",
        user_image  : "ui-fw/user/avatar",
        masters     : "ui-fw/user/masters",
        managerName : "orgMapping/users/display_name"
	},
    monitoring_processes:{
        getActivityInsSummary:"console/processes/activities/status",
        getAnalytics:"analytics/report/process",
        getAnalyticsConfig:"analytics/config",
        stopAnalytics:"analytics/config/stop",
        startAnalytics:"analytics/config/resume"
    },
    task_metadata:{
        getAttachments:"ui-fw/task/{taskId}/attachments",
        getHistory : "ui-fw/task/{taskId}/history",
        addAttachment:"gi/attachment",
        addComments:"social/comments/save",
        getComments:"social/comments/list",
        getCommentsCount:"social/comments/count",
        getAttachmentsCount:"ui-fw/task/{taskId}/attachments/count",
        getHistoryCommentCount:"social/comments/threadIds/count",
        getProcessImage:"console/instances/{instanceId}/images/svg",
        getTaskStatus:"ui-fw/task/{taskId}/status",
		getAdhocTaskList:"ui-fw/task/{taskId}/adhoctasks"
    },
    formless_tasks:{
        formValidation : "gi/validation",
    },
    workflow_tasks:{
        getTaskList : "ui-fw/updates.htm"
    },
    instances:{
        getInstanceInfo:"console/instances/{id}",
        createAdhocSVG: "console/createsvg/?pataskid="
    },
    modeler : {
        createModeler : "webmodeler/diagram/save",
        getDiagrams   : "webmodeler/diagram/list",
        shareModeler  : "webmodeler/access/update",
        deleteModeler : "webmodeler/diagram/delete",
        markForImport : "webmodeler/diagram/readyToImport",
        filterDiagrams: "webmodeler/diagram/search",
        addAttachment : "webmodeler/attachments/add",
        getAttachments: "webmodeler/attachments/list?activityId=",
        deleteAttachment:"webmodeler/attachments/delete?fileName=",
        getAttachment:"webmodeler/attachments/get/",
    },
    social : {
        getCommentsCount : "social/comments/threadIds/count"
    }
};
