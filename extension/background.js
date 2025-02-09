let domainTime = {};   // Object to store time per domain
let idleTime = 180; // considered idle after [idleTime] seconds of no action
let verbose = true; // print session data to console
const REDIRECT_URL = "https://www.google.com";

class Session {
    constructor(name) {
      this.info = {
        user: null,
        domain: name,
        time: Date.now(),
      }
    }

    toString() {
        return `${this.info.domain} is activated at ${new Date(this.info.time).toLocaleString()}`
    }
}

// Helper function to get domain from URL
function getDomain(url) {
    try {
        return new URL(url).hostname.replace("www.", ""); // Extract hostname
    } catch (e) {
        return null;
    }
}

function getBlocked() {
    return ["reddit.com"];
}

function isFocus() {
    return true
}

function report(session) {
    const BACKEND_URL = "http://localhost:3000/extension/record";

    fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session.info)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(`HTTP Error: ${response.status} - ${text}`); });
        }
        return response.json();
    })
    .then(data => console.log("Sent successfully:", data))
    .catch(error => console.error("Fetch error:", error.message));
}

// Helper function to send signal to web app
function record(url, tabId) {
    chrome.storage.local.get(["isTracking"], data => {
        if (data.isTracking === false) return;

        if (!url) return;

        let currentTab = getDomain(url); // Resume tracking
        if (!currentTab) return;

        // check if domain is blocked
        if (isFocus() && getBlocked().includes(currentTab)) {
            console.log(`Redirecting from ${currentTab} to ${REDIRECT_URL}`);
            chrome.tabs.update(tabId, { url: REDIRECT_URL });
            return
        }

        let session = new Session(currentTab);
        
        report(session);

        if (verbose) {
            console.log(session.toString());
        }
    });
}

function inactive() {
    chrome.storage.local.get(["isTracking"], data => {
        if (data.isTracking === false) return;

        let session = new Session(null);
        
        report(session);

        if (verbose) {
            console.log(session.toString());
        }
    });
}


// Track active tabs when they change
chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {
        if (tab.url) {
            record(tab.url, activeInfo.tabId)
        }
    });
});

// Track when the active tab is updated (e.g., URL changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
        record(tab.url, tabId)
    }
});

// Pause tracking when the browser loses focus
chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        inactive();
    }
});

// Pause tracking when the user is idle
chrome.idle.setDetectionInterval(idleTime); // Detect idle after 60 seconds
chrome.idle.onStateChanged.addListener(state => {
    if (state === "idle" || state === "locked") {
        inactive();
    } else if (state === "active") {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            if (tabs[0] && tabs[0].url) {
                record(tabs[0].url, tabs[0].id,)
            }
        });
    }
});