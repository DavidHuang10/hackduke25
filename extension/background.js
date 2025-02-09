let domainTime = {};   // Object to store time per domain
let idleTime = 180; // considered idle after [idleTime] seconds of no action
let verbose = true; // print session data to console

class Session {
    constructor(domain) {
      this.domain = domain;
      this.start = Date.now();
    }

    toString() {
        return this.domain + " is activated at " + this.start;
    }
}

// Helper function to get domain from URL
function getDomain(url) {
    try {
        return new URL(url).hostname; // Extract hostname
    } catch (e) {
        return null;
    }
}

// Helper function to send signal to web app
function record(url) {
    chrome.storage.local.get(["isTracking"], data => {
        if (data.isTracking === false) return;

        if (!url) return;

        let currentTab = getDomain(url); // Resume tracking
        if (!currentTab) return;

        let session = new Session(currentTab);
        // send signal

        if (verbose) {
            console.log(session.toString());
        }
    });
}


// Track active tabs when they change
chrome.tabs.onActivated.addListener(activeInfo => {
    // close session
    chrome.tabs.get(activeInfo.tabId, tab => {
        if (tab.url) {
            record(tab.url)
        }
    });
});

// Track when the active tab is updated (e.g., URL changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
        // close session
        record(tab.url)
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
chrome.idle.setDetectionInterval(idleTime); // Detect idle after 60 seconds
chrome.idle.onStateChanged.addListener(state => {
    if (state === "idle" || state === "locked") {
        // close session
        // send special signal (inactive)
    } else if (state === "active") {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            if (tabs[0] && tabs[0].url) {
                record(tabs[0].url)
            }
        });
    }
});