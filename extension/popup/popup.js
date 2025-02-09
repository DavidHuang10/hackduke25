document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById("toggle-switch");
    const statusText = document.getElementById("status-text");
    const body = document.body;

    // Load tracking state when popup opens
    chrome.storage.local.get(["isTracking"], data => {
        const isTracking = data.isTracking ?? true; // Default to ON if undefined
        toggleSwitch.checked = isTracking;
        updateUI(isTracking);
    });

    // Handle switch toggle
    toggleSwitch.addEventListener("change", () => {
        const isTracking = toggleSwitch.checked;
        chrome.storage.local.set({ isTracking });
        updateUI(isTracking);
    });

    function updateUI(isTracking) {
        body.className = isTracking ? "on-mode" : "off-mode";
    }
});
