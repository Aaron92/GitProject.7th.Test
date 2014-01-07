$(document).ready(function(){
 	/*
		In this code, we are going to do the following:

		1. Accept an image on drag and drop
		2. Create a new canvas element (original), with a max size
		   of 500x500px (customizable) and keep it in memory
		3. Listen for clicks on the filters. When one is selected:
				3.1 Create a clone of the original canvas
				3.2 Remove any canvas elements currently on the page
				3.3 Append the clone to the #photo div
				3.4 If the selected filter is different from the "Normal"
					one, call the Caman library. Otherwise do nothing.
				3.5 Mark the selected filter with the "active" class
		4. Trigger the "Normal" filter

	*/

	var	maxWidth = 350,
		maxHeight = 250,
		photo = $('#photo'),
		originalCanvas = null,
		LoadedImg =0,
		filters = $('#filters li a');
		
	// Use the fileReader plugin to listen for
	// file drag and drop on the photo div:

	$("#photo,#photoSelector").fileReaderJS({
		on:{
		
			
			loadend: function(e, file){
				          
				 //File Size Validation
				 var FileSize = file.size/1024/1024;
				 
				 //If The file size is bigger than 6 Mb, Return false.
				  
				 if(FileSize>6){
					 $("#loadingFilter").hide();
					  $("#modal_error section h1").html('Please select a profile image that is less than <b>1 MB.</b>');
					 $("#modal_error").fadeIn();
					return false; 
				 }

				// An image has been dropped.
                
				var img = $('<img>').attr("src",1+ "?" + new Date().getTime()).appendTo(photo),
					imgWidth, newWidth,
					imgHeight, newHeight,
					ratio;
				
				// Remove canvas elements left on the page
				// from previous image uploads.

				photo.find('canvas').remove();
				filters.removeClass('active');
				
				// When the image is loaded successfully,
				// we can find out its width/height:

               $('#photo,#photoSelector').waitForImages(function() {
				   
				   
                //console.log('Images Loaded!');
				
				$(img).one('load',function(){
                 console.log('loaded');
					imgWidth  = this.width;
					imgHeight = this.height;

					// Calculate the new image dimensions, so they fit
					// inside the maxWidth x maxHeight bounding box

					if (imgWidth >= maxWidth || imgHeight >= maxHeight) {

						// The image is too large,
						// resize it to fit a 500x500 square!

						if (imgWidth > imgHeight) {

							// Wide
							ratio = imgWidth / maxWidth;
							newWidth = maxWidth;
							newHeight = imgHeight / ratio;

						} else {

							// Tall or square
							ratio = imgHeight / maxHeight;
							newHeight = maxHeight;
							newWidth = imgWidth / ratio;

						}

					} else {
						newHeight = imgHeight;
						newWidth = imgWidth;
					}
                   
				   //Hide Loading Img
				   $("#loadingFilter").hide(); 
					
                    //Hide DefaulText
					$("#defaultImageText").hide();
					
					//Remove Default image
					$("#photo").addClass('added');
					
					// Create the original canvas.

					originalCanvas = $('<canvas>');
					var originalContext = originalCanvas[0].getContext('2d');

					// Set the attributes for centering the canvas

					originalCanvas.attr({
						width: newWidth,
						height: newHeight
					}).css({
						marginTop: -newHeight/2,
						marginLeft: -newWidth/2
					});
					                    
					// Draw the dropped image to the canvas
					// with the new dimensions
					originalContext.drawImage(this, 0, 0, newWidth, newHeight);
					// Trigger the default "normal" filter
					filters.first().click();
					//Scroll to The first filter
					$("#filterContainer #filters").animate({"scrollLeft":0},600);
					
					//remove disabled button attr
	                $("#Done_Btn").removeAttr("disabled");
	
		            //Create LoadedImg Flag
					LoadedImg =1;			
					//Maybe Activate this?
					
					// We don't need this any more
					img.remove();
					
				});
				
			   }).each(function() {
  if(this.complete) $(this).load();

				// Set the src of the img, which will
				// trigger the load event when done:
               
				img.attr('src', e.target.result);
			   });
			},

			beforestart: function(file){
              
			  //Show Loading
				 $("#loadingFilter").show();
				 
				// Accept only images.
				// Returning false will reject the file.
				 if(/^image/.test(file.type)){
					 return
					 }
					 else {
						  $("#loadingFilter").hide();
					  $("#modal_error section h1").html('Please select a proper image, only <b> jpg, jpeg, png or gif are allowed.</b>');
					 $("#modal_error").fadeIn();
						 return false;
						 }
				
			}
			
		}
		
	});

	// Listen for clicks on the filters

	filters.click(function(e){

		e.preventDefault();

		var f = $(this);

		if(f.is('.active')){
			// Apply filters only once
			return false;
		}

		filters.removeClass('active');
		f.addClass('active');

		// Clone the canvas
		var clone = originalCanvas.clone();

		// Clone the image stored in the canvas as well
		clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);


		// Add the clone to the page and trigger
		// the Caman library on it

		photo.find('canvas').remove().end().append(clone);

		var effect = $.trim(f[0].id);

		Caman(clone[0], function () {

			// If such an effect exists, use it:

			if( effect in this){
				this[effect]();
				this.render();

				// Show the download button
				showUpload(clone[0]);
			}
			else{
				
			}
		});
				// Show the download button
				showUpload(clone[0]);

	});


//Function to get a proportionated scaled thumbnail from the uploaded image
function getThumbnail(original,scale,minWidth,minHeight,maxWidth,maxHeight) {
	   
var canvas = document.createElement("canvas");
      
  canvas.width = original.width * scale;
  console.log('Scaled Width' + canvas.width);
  canvas.height = original.height * scale;
  console.log('Scaled height' + canvas.height);
  if(canvas.width>maxWidth){ canvas.width = maxWidth;}
  if(canvas.height>maxHeight){ canvas.height = maxHeight;}

  if (canvas.width<minWidth && canvas.width>canvas.height){ canvas.width = maxWidth; canvas.height = minHeight; console.log('1'); }
  else if(canvas.width<minWidth) {  canvas.width = minWidth, canvas.height = maxHeight; console.log('2'); }
  else if (canvas.height<minHeight && canvas.height>canvas.width){ canvas.height = maxHeight; canvas.width = minWidth;console.log('3');}
  else  { canvas.height = minHeight; canvas.width = maxWidth; console.log('4'); }
  console.log('Final Width' + canvas.width);
  console.log('Final Height' + canvas.height);
  canvas.getContext("2d").drawImage(original, 0, 0, canvas.width, canvas.height);

  return canvas;  
                    
}

    //Define upload Button Id
	var uploadImage = $('#Done_Btn');
    //Function when the Button is pressed
	function showUpload(canvas){
		
	   uploadImage.off('click').click(function(){
		//Create Thumbnails   
        var thumbSmall = getThumbnail(canvas, 1/5,48,48,55,55);
		var thumbMedium = getThumbnail(canvas, 1/3,68,68,80,80);
		//Img to DataURL
		var imgSmall = thumbSmall.toDataURL();
		var imgMedium = thumbMedium.toDataURL();
		var imgBig = canvas.toDataURL();
		
	//var url = canvas.toDataURL("image/png;base64;");
	$.ajax({
    type: "POST",
    url: "assets/includes/process.php",
    data: { 'imgSmall': imgSmall, 'imgMedium': imgMedium, 'imgBig': imgBig },
    cache: false,
	beforeSend: function(){
	//Nefore send, set Done_Btn Html to 'Loading...' and disable. 
	$("#Done_Btn").html('Loading...');
	$("#Done_Btn").attr("disabled",true);
	},
    success: function(data){
		console.log('Posted Success!');
		window.location = data;
	}
	
	});
						
		});//End ofbutton Click
		
	}//End of funtion 

    //Click Delegation	
	$("#photo").click(function(){
	$("#photoSelector").click();
	});
	
	//Custom Scrollbar
   $('#filterContainer #filters').enscroll({
   horizontalScrolling: true,
   showOnHover: true,
    horizontalTrackClass: 'horizontal-track2',
    horizontalHandleClass: 'horizontal-handle2',
    cornerClass: 'corner2'
});
	
//Set class if IE 10
if(Function('/*@cc_on return document.documentMode===10@*/')()){
document.documentElement.className+=' ie10';
}


//Geo Location Button Press
$("#locationButton").click(function(){

//If google maps api has been Loaded
if (typeof google === 'object' && typeof google.maps === 'object') {
	    //If Browser Supports Geolocation
		if (navigator && navigator.geolocation) {
            // make the request for the user's position
            navigator.geolocation.getCurrentPosition(geo_success, showError);
              }
}
//Google maps api ha not been Loaded
else{
//Get Script, and trigger function
$.getScript('https://www.google.com/jsapi', function(){	
$("#location_input").val('Loading...');
google.load('maps', '3', { other_params: 'sensor=false', callback: function(){
   // Callback code here
   //If Browser Supports Geolocation
    if (navigator && navigator.geolocation) {
   // make the request for the user's position
    navigator.geolocation.getCurrentPosition(geo_success, showError);

}

    }});
});
	}
	
});

	//Geolocation Function
	function geo_success(position) {
		
    printAddress(position.coords.latitude, position.coords.longitude);
}
 
function showError(error)
  {

$("#modal_error").fadeIn();
	  
	
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
	$("#modal_error section h1").html('You have denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
	$("#modal_error section h1").html('Location information is unavailable.');
      break;
    case error.TIMEOUT:
	$("#modal_error section h1").html('The request to get user location timed out.');
      break;
    case error.UNKNOWN_ERROR:
	
	$("#modal_error section h1").html('An unknown error occurred.');
      break;
    }
  }
 

// use Google Maps API to reverse geocode our location
function printAddress(latitude, longitude) {
    // set up the Geocoder object
    var geocoder = new google.maps.Geocoder();
 
    // turn coordinates into an object
    var yourLocation = new google.maps.LatLng(latitude, longitude);
 
 
    // find out info about our location
    geocoder.geocode({ 'latLng': yourLocation }, function (results, status) {
        
//If Everything is Ok
if (status == google.maps.GeocoderStatus.OK) {
//If we get results            
if (results[0]) {
//Do a for loop to get variables for City, State & Country from the Formatted address
for (var i = 0; i < results[0].address_components.length; i++) { for (var j = 0; j < results[0].address_components[i].types.length; j++) {
	if(results[0].address_components[i].types[j] == "administrative_area_level_2") { var city_code = results[0].address_components[i].long_name; }
if(results[0].address_components[i].types[j] == "administrative_area_level_1") { var state_code = results[0].address_components[i].short_name; } if(results[0].address_components[i].types[j] == 'country') { var country_code = results[0].address_components[i].long_name; }
} } 

//Print Results at cursor position in the Location Textarea
var input = $("#location_input");
input.val(city_code+", "+ state_code +", "+ country_code);
input.focus();
tmpStr = input.val();
input.val('');
input.val(tmpStr);
//remove disabled button attr
	$("#Done_Btn").removeAttr("disabled");
		       
         } else {//PostError handling
     $("#modal_error").fadeIn();
	$("#modal_error section h1").html('Location information is unavailable.');
            }
        } else { //PostError #2 handling
	$("#modal_error").fadeIn();
	$("#modal_error section h1").html('An unknown error occurred.');
        }
    });
 
}

//Focus for parent Selectors [couldn't be done with css] 

$("#website_input").focus(function(){
	$("#inputSub").css({"border":"2px solid #09f"});
});

$("#website_input").blur(function(){
	$("#inputSub").css({"border":"2px solid #999"});
});

$("#location_input").focus(function(){
	$("#inputSub_2").css({"border":"2px solid #09f"});
});

$("#location_input").blur(function(){
	$("#inputSub_2").css({"border":"2px solid #999"});
});
 

//On close Modal click, Hide Modal Error
$("#close_modal").click(function(){
	$("#modal_error").fadeOut();
	if($("#location_input").val('Loading...')){
		$("#location_input").val('');
	}
});

//If Location Input has a character
 $('#location_input').keyup(function(e){
var locInput = $(this).val();

//If the comments box is empty && No image has been loaded, return false	
	if( (locInput.length<=1 || (!locInput.match(/\S/))) && LoadedImg ==0 )
     {            
	$("#Done_Btn").attr("disabled",true);
	}
	else{
	$("#Done_Btn").removeAttr("disabled");	
	}

 });
	
	
});//End of Document.Ready
