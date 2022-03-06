let rotateButton = document.getElementById("rotate");

rotateButton.addEventListener("click", async () => {
    edge.storage.local.set({ rotate: rotateButton.clicked})
})

edge.storage.local.get(["rotateImage"], ({rotateImage})=>
{
    if(rotateImage){
        rotateButton.clicked = true;
        rotateImageFun();
    }
});