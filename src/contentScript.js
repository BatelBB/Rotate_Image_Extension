let rotation = 90;

function rotateImage() {
  document.getElementsByTagName("img")[0].style.transform = 'rotate(' + rotation + 'deg)';
  rotation += 90;
  if (rotation >= 360) {
  	rotation = 0;
  }
};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.type === 'rotateImage') {
		rotateImage();
	}
});