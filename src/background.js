chrome.runtime.onInstalled.addListener(() => { // Once the extension is created, the context menu is created.
  
    chrome.contextMenus.create({
        "id": "parent", // id of the context menu
        "title": "Rotate Image", // what will be written in the context menu
        "contexts": ["image"] // on which items the right-click will show this context menu
    });

    chrome.contextMenus.create({
        "id": "clock-wise",
        "title": "Rotate Clock-Wise",
        "parentId": "parent",
        "contexts": ["image"]
    });

    chrome.contextMenus.create({
        "id": "anti-clock-wise",
        "title": "Rotate Anti-Clock-Wise",
        "parentId": "parent",
        "contexts": ["image"]
    }); 
});

try{
    chrome.contextMenus.onClicked.addListener((info, tab) => { // once the item in the context menu this waits for the user to click it
        if(info.menuItemId === "clock-wise"){ // if the user clicked on the correct item
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) { // it takes the active tab
                chrome.tabs.sendMessage(tabs[0].id, { // sends a message with the tab id and the "rotateImage" type
                    type: "rotateImageClockWise",
                });
            });
        }
        if(info.menuItemId === "anti-clock-wise"){ // if the user clicked on the correct item
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) { // it takes the active tab
                chrome.tabs.sendMessage(tabs[0].id, { // sends a message with the tab id and the "rotateImage" type
                    type: "rotateImageAntiClockWise",
                });
            });
        }
    });
} catch (e) {
    console.error(e);
}


if (chrome.runtime) {
    chrome.runtime.setUninstallURL("https://forms.gle/K1v6S13SnPKzsE2b7"); // a google form that opens if the user uninstalls the extension
  }