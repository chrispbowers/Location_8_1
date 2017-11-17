
document.addEventListener("deviceready", onDeviceReady, false);


//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {
	
    //set up listener for button click
	$(document).on('click', getPosition);
	
	//change time box to show message
	$('#time').val("Press the button to get location data");
	
});

function onDeviceReady() {
    
    permissions.requestPermission(permissions.ACCESS_COARSE_LOCATION, function() {
        alert("Permission granted");
    }, function() {
        alert("Permission denied");
    });
    
}




//Call this function when you want to get the current position
function getPosition() {
    
    var permissions = cordova.plugins.permissions;
    permissions.checkPermission(permissions.ACCESS_COARSE_LOCATION, function(status) {
        alert(status.hasPermission)
        
    });
   
    
	
	//change time box to show updated message
	$('#time').val("Getting data...");
	
	//instruct location service to get position with appropriate callbacks
	navigator.geolocation.getCurrentPosition(successPosition, failPosition);
}


//called when the position is successfully determined
function successPosition(position) {
	
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp
	

	//lets get some stuff out of the position object
	var time = position.timestamp;
	var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
	
	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved data at " + time);
	$('#lattext').val(latitude);
    $('#longtext').val(longitude);
	
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error.message);
	
}

