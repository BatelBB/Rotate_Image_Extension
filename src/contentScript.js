let rotation = 0;
let flagZomm = true;

function rotateImageClockWise() {
  if(document.getElementsByTagName("img")[0].style.cursor == "zoom-out" && flagZomm == true){ // in case the image is zoomed in
    rotation = 0;
    flagZomm = false;
  }
  if(document.getElementsByTagName("img")[0].style.cursor == "zoom-in" && flagZomm == false){// in case the image is back to zoom out, reset the flag
    flagZomm = true;
  }
  rotation += 90; // everytime the button is clicked it rotates one more time.
  document.getElementsByTagName("img")[0].style.transform = 'rotate(' + rotation + 'deg)'; // getElementsByTageName - because there is no id tag
  if (rotation >= 360) {
  	rotation = 0;
  }
  
};

function rotateImageAntiClockWise() {
  if(document.getElementsByTagName("img")[0].style.cursor == "zoom-out" && flagZomm == true){ // in case the image is zoomed in
    rotation = 0;
    flagZomm = false;
  }
  if(document.getElementsByTagName("img")[0].style.cursor == "zoom-in" && flagZomm == false){// in case the image is back to zoom out, reset the flag
    flagZomm = true;
  }
  rotation -= 90; // everytime the button is clicked it rotates one more time.
  document.getElementsByTagName("img")[0].style.transform = 'rotate(' + rotation + 'deg)'; // getElementsByTageName - because there is no id tag
  if (rotation <= -360) {
  	rotation = 0;
  }
  
};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) { // this waits for any message 
	if (msg.type === 'rotateImageClockWise') { // onces there is a message with a type of "rotateImageClockWise"
		rotateImageClockWise(); // it activates the function
	}
  if (msg.type === 'rotateImageAntiClockWise') { // onces there is a message with a type of "rotateImageAntiClockWise"
		rotateImageAntiClockWise(); // it activates the function
	}
Promise.resolve("").then(result => sendResponse(result)); // to close the port of the listener
return true;
});
