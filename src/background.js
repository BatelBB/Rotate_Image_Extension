edge.runtime.onInstalled.addListener(() => {
    edge.storage.local.get({rotateButton});
  });

function rotateImageFun(){
    var currentLocation = window.location.href;
    let blob = await fetch(currentLocation).then(r => r.blob());
    console.log(blob.size)
};