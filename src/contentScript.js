function rotateImage() {
  document.getElementsByTagName("img")[0].style.transform = "rotate(90deg)";
};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.type === 'rotateImage') {
		rotateImage();
	}
});