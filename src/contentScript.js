let currentRotation = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let img = getImageElement();
    if (!img) return;

    if (request.action === "rotateClockwise") {
        currentRotation += 90;
    } else if (request.action === "rotateCounterclockwise") {
        currentRotation -= 90;
    }

    applyRotation(img, currentRotation);
});

function getImageElement() {
    return document.querySelector('img[src^="blob:https://web.whatsapp.com/"]');
}

function applyRotation(img, degrees) {
    img.style.transform = 'rotate(' + degrees + 'deg)';
}

function getRotationDegrees(img) {
    let matrix = window.getComputedStyle(img).getPropertyValue('transform');
    if (matrix !== 'none') {
        let values = matrix.split('(')[1].split(')')[0].split(',');
        let a = values[0];
        let b = values[1];
        let angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        return (angle < 0) ? angle + 360 : angle;
    }
    return 0;
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.tagName === 'IMG') {
        setTimeout(function() {
            let img = getImageElement();
            if (img) {
                applyRotation(img, currentRotation);
            }
        }, 5); // Adjust the timeout if necessary
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let img = getImageElement();
    if (!img) return;

    if (request.type === "rotateClockwise") {
        currentRotation += 90;
    } else if (request.type === "rotateCounterclockwise") {
        currentRotation -= 90;
    }

    applyRotation(img, currentRotation);
    sendResponse({}); 
    return true;
});