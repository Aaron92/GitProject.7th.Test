<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Canvas Filters</title>

<!-- CSS Libraries -->
<link href='http://fonts.googleapis.com/css?family=Dancing+Script' rel='stylesheet' type='text/css'>
<link href="assets/css/style.css" rel="stylesheet" />

</head>

<body>

<div id='navBar'>Ivser</div>

<div id="app">

    <div id="main_container">
    
    <div id="photo_container">
    
    <div id="photo" title="Click to add an image or Drag one here">
    
    <div id="defaultImageText"></div>
	</div>
    
    
    </div>
   
    <div id="loadingFilter">
    Uploading...
    </div>
    
<span class="file-wrapper">
<input type="file" name="photoSelector" id="photoSelector" />
<span class="button">Choose a Photo</span>
</span>

	
	<div id="filterContainer">
    <b id="filterContainerTittle">Filters <em>V1</em></b>
		<ul id="filters">
			<li> <a href="#" id="normal"><span>Normal</span></a> </li>
			<li> <a href="#" id="vintage"><span>Vintage</span></a> </li>
			<li> <a href="#" id="lomo"><span>Lomo</span></a> </li>
			<li> <a href="#" id="clarity"><span>Clarity</span></a> </li>
			<li> <a href="#" id="sinCity"><span>Sin City</span></a> </li>
			<li> <a href="#" id="sunrise"><span>Sunrise</span></a> </li> 
			<li> <a href="#" id="crossProcess"><span>Cross Process</span></a> </li>
			<li> <a href="#" id="orangePeel"><span>Orange Peel</span></a> </li>
			<li> <a href="#" id="love"><span>Love</span></a>  </li>
			<li> <a href="#" id="grungy"><span>Grungy</span></a>  </li>
			<li> <a href="#" id="jarques"><span>Jarques</span></a>  </li>
			<li> <a href="#" id="pinhole"><span>Pinhole</span></a>  </li>
			<li> <a href="#" id="oldBoot"><span>Old Boot</span></a>  </li>
			<li> <a href="#" id="glowingSun"><span>Glowing Sun</span></a>  </li>
			<li> <a href="#" id="hazyDays"><span>Hazy Days</span></a>  </li>
			<li> <a href="#" id="herMajesty"><span>Her Majesty</span></a>  </li>
			<li> <a href="#" id="nostalgia"><span>Nostalgia</span></a>  </li>
			<li> <a href="#" id="hemingway"><span>Hemingway</span></a> </li>
			<li> <a href="#" id="concentrate"><span>Concentrate</span></a> </li>
		</ul>
	</div>

</div>

<div id="About_Done_Container">


<div class="input-container">
<div id="inputSub"><span id="website_icon"></span> <textarea name="website" rows="1" id="website_input"  placeholder="Website (Optional)"  autocomplete="off" spellcheck="false" ></textarea></div><div id="separator"></div>

<div id="inputSub_2"><span id="location_icon" class = 'icon-earth' ></span><textarea name="location" rows="1" id="location_input"  placeholder="Location"  autocomplete="off" spellcheck="false" ></textarea></div>
<div id="locationButton"><em><span>Activate Geo Location</span></em></div>
</div>


<button id = 'Done_Btn' disabled>Done</button>

<div id="skipBtn">
Skip »
</div>

</div>


</div>
	

<div id="modal_error">
    <header><h1>Error!</h1> <div id="close_modal">✕</div></header>
    <section>
    <h1></h1>
    </section>
</div>

</div>

	<!-- JS Libraries -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
	<script src="assets/js/filereader.min.js"></script>
    <script src="assets/js/jquery.waitforimages.js"></script>
	<script src="assets/js/caman.full.js"></script>
    <script src="assets/js/enscroll-0.4.0.min.js"></script>
	<script src="assets/js/script.js"></script>
    
</body>
</html>