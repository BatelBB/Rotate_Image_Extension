let rotation = 90;

function rotateImage() {
  document.getElementsByTagName("img")[0].style.transform = 'rotate(' + rotation + 'deg)'; // getElementsByTageName - because there is no id tag
  rotation += 90; // everytime the button is clicked it rotates one more time.
  if (rotation >= 360) {
  	rotation = 0;
  }
};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) { // this waits for any message 
	if (msg.type === 'rotateImage') { // onces there is a message with a type of "rotateImage"
		rotateImage(); // it activates the function
	}
});