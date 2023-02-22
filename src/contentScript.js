let rotationAngle = 0;
let flagZomm = true;

function rotateImageClockWise() {
  fixZoomRotation();
  rotationAngle += 90; // everytime the button is clicked it rotates one more time.
  rotateImage(rotationAngle);; // getElementsByTageName - because there is no id tag
  if (rotationAngle >= 360) {
  	rotationAngle = 0;
  }
};

function rotateImageAntiClockWise() {
  fixZoomRotation();
  rotationAngle -= 90; // everytime the button is clicked it rotates one more time.
  rotateImage(rotationAngle);
  if (rotationAngle <= -360) {
  	rotationAngle = 0;
  }
};


function rotateImage(angle) {
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    if (image.src.startsWith("blob")) {
      image.style.transform = `rotate(${angle}deg)`;
    }
  });
}

document.addEventListener("wheel", (event) => {
  if (event.ctrlKey) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -1 : 1;
    const scale = 1 + delta * 0.1;
    const images = document.querySelectorAll("img");
    images.forEach((image) => {
      if (image.src.startsWith("blob") && image.style.transform) {
        image.style.transform += `scale(${scale})`;
      } else {
        image.style.transform = `scale(${scale})`;
      }
    });
    rotateImage(rotationAngle); // reapply the rotation after zooming
  }
});

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


function fixZoomRotation(){
  if(document.getElementsByTagName("img")[0].style.cursor == "zoom-out" && flagZomm == true){ // in case the image is zoomed in
    rotationAngle = 0;
    flagZomm = false;
  }
  if(document.getElementsByTagName("img")[0].style.cursor == "zoom-in" && flagZomm == false){// in case the image is back to zoom out, reset the flag
    flagZomm = true;
  }
};