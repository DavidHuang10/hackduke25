let domainTime = {};   // Object to store time per domain

class Session {
    constructor(domain) {
      this.domain = domain;
      this.start = Date.now();
    }

    close() {
        this.end = Date.now();
    }

    toString() {
        return this.domain + " is activated at " + startTime;
    }
}

// Track active tabs when they change
chrome.tabs.onActivated.addListener(activeInfo => {
    // close session
    chrome.tabs.get(activeInfo.tabId, tab => {
        if (tab.url) {
            let currentTab = getDomain(tab.url); // Get domain of the new tab
            let session = Session(currentTab);
            // send signal
            console.log(session);
        }
    });
});

// Track when the active tab is updated (e.g., URL changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
        // close session
        let session = Session(currentTab);
        // send signal
        console.log(session);
    }
});

// Pause tracking when the browser loses focus
chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        // close session
        // send special signal (inactive)
    }
});

// Pause tracking when the user is idle
chrome.idle.setDetectionInterval(60); // Detect idle after 60 seconds
chrome.idle.onStateChanged.addListener(state => {
    if (state === "idle" || state === "locked") {
        // close session
        // send special signal (inactive)
    } else if (state === "active") {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            if (tabs[0] && tabs[0].url) {
                currentTab = getDomain(tabs[0].url); // Resume tracking
                let session = Session(currentTab);
                // send signal
                console.log(session);
            }
        });
    }
});

// Helper function to track time
// function trackTime() {
//     if (currentTab && startTime) {
//         let timeSpent = (Date.now() - startTime) / 1000; // Convert to seconds
//         timeSpent = Math.round(timeSpent * 10) / 10;

//         // Store time for the previous site
//         if (timeSpent > 0) { // Only save if there's actual time spent
//             domainTime[currentTab] = (domainTime[currentTab] || 0) + timeSpent;
//             chrome.storage.local.set({ domainTime });
//             console.log(`Time recorded for ${currentTab}: ${timeSpent} seconds`);
//         }
//     }
// }


// Helper function to get domain from URL
function getDomain(url) {
    try {
        return new URL(url).hostname; // Extract hostname (e.g., "google.com")
    } catch (e) {
        return null;
    }
}

// Periodically log data (for debugging)
// chrome.alarms.create("logTime", { periodInMinutes: 0.2 });
// chrome.alarms.onAlarm.addListener(alarm => {
//     if (alarm.name === "logTime") {
//         console.log("Time tracked so far:", domainTime);
//     }
// });
