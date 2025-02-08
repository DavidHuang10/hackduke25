document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById("toggle-switch");
    const statusText = document.getElementById("status-text");

    // ✅ Load tracking state when popup opens
    chrome.storage.local.get(["isTracking"], data => {
        const isTracking = data.isTracking ?? true; // Default to ON if undefined
        toggleSwitch.checked = isTracking;
        updateStatusText(isTracking);
    });

    // ✅ Handle switch toggle
    toggleSwitch.addEventListener("change", () => {
        const isTracking = toggleSwitch.checked;
        chrome.storage.local.set({ isTracking });
        updateStatusText(isTracking);
    });

    // ✅ Function to update status text
    function updateStatusText(isTracking) {
        statusText.innerHTML = `Tracking is <strong>${isTracking ? "ON 🟢" : "OFF 🔴"}</strong>`;
    }
});
