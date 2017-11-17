document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
 
    cordova.plugins.diagnostic.requestRuntimePermissions(
        
        function(statuses){
            for (var permission in statuses){
                switch(statuses[permission]){
                    case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                        console.log("Permission granted to use "+permission);
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                        console.log("Permission to use "+permission+" has not been requested yet");
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.DENIED:
                        console.log("Permission denied to use "+permission+" - ask again?");
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                        console.log("Permission permanently denied to use "+permission+" - guess we won't be using it then!");
                        break;
                }
            }
        }, 
        
        function(error){
            console.error("The following error occurred: "+error);
        },
        
        [
            cordova.plugins.diagnostic.permission.ACCESS_FINE_LOCATION,
            cordova.plugins.diagnostic.permission.ACCESS_COARSE_LOCATION
        ]
    );
    
}



//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {
	
    //set up listener for button click
	$(document).on('click', getPosition);
	
	//change time box to show message
	$('#time').val("Press the button to get location data");
	
    
    
    
    
    
    
});





//Call this function when you want to get the current position
function getPosition() {
	
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

