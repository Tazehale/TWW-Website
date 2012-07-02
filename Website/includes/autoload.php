<?php 

function __autoload($class_name)
{
	//Breakdown class name to look for subclass grouping
	//	{
	//		A subdirectory can be added inside 'classes' folder to house class subgroupings
	//		Classes inside this subdirectory are called like, SubFolder_ClassName::ClassMethod, and are handled here without error
	//	}
	$class_subdirectory = explode('_', $class_name);
	$class_subdirectory_vals = array_values($class_subdirectory);
	$class_subdirectory_count = count($class_subdirectory);
	
	if(empty($class_subdirectory) || $class_subdirectory[0] == '' || $class_subdirectory_count < 2 || $class_subdirectory_vals[1] == ''){
				
		include_once("classes/$class_name.inc.php");
	}
	else{
		
		$class_path = "";
		for($i = 0; $i < $class_subdirectory_count; $i++){
			$class_path .= "/".$class_subdirectory_vals[$i];
		}
		include_once("classes".$class_path.".inc.php");
	}
	
	
}
?>
