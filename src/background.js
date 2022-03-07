chrome.runtime.onInstalled.addListener(() => { // Once the extension is created, the context menu is created.
    chrome.contextMenus.create({
        "id": "rotateImage", // id of the context menu
        "title": "Rotate Image", // what will be written in the context menu
        "contexts": ["image"] // on which items the right-click will show this context menu
    })
});

try{
    chrome.contextMenus.onClicked.addListener((info, tab) => { // once the item in the context menu this waits for the user to click it
        if(info.menuItemId === "rotateImage"){ // if the user clicked on the correct item
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) { // it takes the active tab
                chrome.tabs.sendMessage(tabs[0].id, { // sends a message with the tab id and the "rotateImage" type
                    type: "rotateImage",
                });
            });
        }
    });
} catch (e) {
    console.error(e);
}