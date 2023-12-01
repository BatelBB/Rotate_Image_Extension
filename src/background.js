chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "rotateClockwise",
        title: "Rotate Clockwise",
        contexts: ["image"]
    });

    chrome.contextMenus.create({
        id: "rotateCounterclockwise",
        title: "Rotate Counterclockwise",
        contexts: ["image"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "rotateClockwise" || info.menuItemId === "rotateCounterclockwise") {
        chrome.tabs.sendMessage(tab.id, {
            action: info.menuItemId
        });
    }
});

chrome.commands.onCommand.addListener((command) => {
    if(command === "rotate_clockwise") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "rotateClockwise",
            });
        });
    }
    if(command === "rotate_counterclockwise") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "rotateCounterclockwise",
            });
        });
    }
});

if (chrome.runtime) {
    chrome.runtime.setUninstallURL("https://forms.gle/K1v6S13SnPKzsE2b7"); // a google form that opens if the user uninstalls the extension
  }