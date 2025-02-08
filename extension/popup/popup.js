document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById("toggle-switch");
    const timeList = document.getElementById("time-list");

    // Initialize switch state
    chrome.storage.local.get(["isTracking"], data => {
        toggleSwitch.checked = data.isTracking ?? true; // Default to "on"
    });

    // Handle toggle switch
    toggleSwitch.addEventListener("change", () => {
        chrome.storage.local.set({ isTracking: toggleSwitch.checked });
    });

    // Display time information
    chrome.storage.local.get(["domainTime"], data => {
        const domainTime = data.domainTime || {};
        timeList.innerHTML = Object.entries(domainTime)
            .map(([domain, time]) => `<p>${domain}: ${Math.round(time)} seconds</p>`)
            .join("");
    });
});
