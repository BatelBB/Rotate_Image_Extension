chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "rotateImage",
        "title": "Rotate Image",
        "contexts": ["image"]
    })
});

try{
    chrome.contextMenus.onClicked.addListener((info, tab) => {
        if(info.menuItemId === "rotateImage"){
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: "rotateImage",
                });
            });
        }
    });
} catch (e) {
    console.error(e);
}