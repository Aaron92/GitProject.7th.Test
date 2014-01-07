<?php
     /*******
		In this code, we are going to do the following:

		1. Receive three base64 encoded strings which represent the images data, via POST method.
		2. Process the encoded strings and return the decoded images using the: process_image function().
		3. Generate a unique Id using the: uniqid(), md5(), and rand() functions.
		4. Name the three images with the unique Id, size and the file extension.
		5. Establish an upload path for the images, using the: getFileDirectory function().
		6. If this upload path doesnt exists, create it, using the: mkdir function().
		7. Upload the images to the folder using the: file_put_contents function().
		8. Save the images references to the database.

*******/
 
//Error reporting.
ini_set('display_errors', 1);
error_reporting(E_ALL);

//Get the Images Via POST method.
if (!$_POST['imgSmall'] && !$_POST['imgMedium'] && !$_POST['imgBig']) { exit; }

//Validate and convert the images using the: process_image function().
$imageSmall = process_image($_POST['imgSmall']);
$imageMedium = process_image($_POST['imgMedium']);
$imageBig = process_image($_POST['imgBig']);
if (!$imageSmall && !$imageBig && $imageMedium) { exit; }

//Generate a unique ID.
$unique_id = uniqid(md5(mt_rand()), true);

//Establish the upload path, using the: getFileDirectory function().
$upload_dir =  getFileDirectory($unique_id);
$folder = '../../static/profile_images/'.$upload_dir;

//If upload path doesnt exist, create it. 
if (!is_dir($folder)) {
   mkdir($folder,0777,true); //Note the two extra arguments. These are ment to create a tree of folders.
}

// Asing a name to the images as follows: unique ID, size and file type(.png).
$filenameSmall = $unique_id . '_small' . '.' . $imageSmall['type'];
$filenameMedium = $unique_id . '_medium' . '.' . $imageMedium['type'];
$filenameBig = $unique_id . '_big' . '.' . $imageBig['type'];

//Check if the upload path is writable and file doesnt exists.
//Put the images into the upload path.
if (is_writable($folder) && !file_exists($folder . $filenameSmall)) {
	if (file_put_contents($folder . $filenameSmall, $imageSmall['data']) !== false) {	
	}
	else{'ERROR! Cannot put file into folder';}
}
else{'ERROR! Path is not writable or File doesnt exists';}


if (is_writable($folder) && !file_exists($folder . $filenameMedium)) {
	if (file_put_contents($folder . $filenameMedium, $imageMedium['data']) !== false) {	
	}
	else{'ERROR! Cannot put file into folder';}
}
else{'ERROR! Path is not writable or File doesnt exists';}


if (is_writable($folder) && !file_exists($folder . $filenameBig)) {
	if (file_put_contents($folder . $filenameBig, $imageBig['data']) !== false) {	
	}
	else{'ERROR! Cannot put file into folder';}
}
else{'ERROR! Path is not writable or File doesnt exists';}

               
			   /******** The two functions needed for this page *******/ 

/*
The purpouse of this function is to Generate a 3 Deep level directory structure,
later to be combined with the -mkdir- function to create the folders.
	  
This Function does the following:
	   
1. Takes an input string.
2. Splits it into chunks of 2 characters.
3. Explodes it into an array.
4. Returns the fisrt 3 chunks separated by a slash 
*/
		
function getFileDirectory($imgRef){
	
	$string = chunk_split($imgRef,2,"/");
	$StringArray = explode("/",$string);
	return $StringArray[0]."/".$StringArray[1]."/".$StringArray[2]."/"; 
	
}

/*
The purpouse of this function is to Process the encoded images data and return
decoded images.
	  
This Function does the following:
	   
1. Takes the encoded string.
2. Verifies if is an image.
3. Get the File type (jpg,jpeg,png).
4. Decode the string
5. Return a Decoded  Image file. 
*/

function process_image($photo) {
	$type = null;
	if (preg_match('/^data:image\/(jpg|jpeg|png)/i', $photo, $matches)) {
		$type = $matches[1];
	} else {
		return false;
	}
	
	// Remove the mime-type header
	$data = reset(array_reverse(explode('base64,', $photo)));
	
	// Use strict mode to prevent characters from outside the base64 range
	$image = base64_decode($data, true);
	
	if (!$image) { return false; }
	
	return array(
		'data' => $image,
		'type' => $type
	);
}

echo 'CANVAS_2'.$folder.$filenameBig;

?>