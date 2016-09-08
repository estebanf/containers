select 
	ExcerciseProject.EXCERCISE_ID,
	Departments.department_name, 
	ExcerciseProject.PROJECT_ID, 
	ExcerciseProject.NAME, 
	ExcerciseProject.RESPONSIBLE , 
	ExcerciseProject.TARGET_BUDGET, 
	ExcerciseProject.NOTES,
	ExcerciseProject.LASTYEARBUDGET , 
	ExcerciseProject.BUDGET , 
	ExcerciseProject.PRIORITY , 
	ExcerciseProject.STARTEXECUTION , 
	ExcerciseProject.ENDEXECUTION , 
	ExcerciseProject.NEWPROJECT , 
	ExcerciseProject.DESCRIPTION , 
	ExcerciseProject.JUSTIFICATION  
from ExcerciseProject inner join Departments on (ExcerciseProject.DEPARTMENTID= Departments.department_id)where EXCERCISE_ID=? and APPROVED=1
order by Departments.department_name