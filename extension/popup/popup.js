document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const toggleSwitch = document.getElementById("toggle-switch");

    const loginSection = document.getElementById("login-section");
    const mainSection = document.getElementById("main-section");

    // Check if user is logged in
    chrome.storage.sync.get("user", (data) => {
        if (data.user) {
            showMainUI();
        } else {
            showLoginUI();
        }
    });

    // Handle Login
    loginBtn.addEventListener("click", () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        // Simulate login API call (Replace with real authentication later)
        fetch("http://127.0.0.1:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email.toLowerCase(), password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token && data.userId) {  // Expecting userId from backend
                chrome.storage.sync.set({ userId: data.userId, token: data.token }, () => {
                    showMainUI();
                });
            } else {
                alert("Login failed: " + (data.error || "Unknown error"));
            }
        })
        .catch(error => console.error("Login error:", error));
    });

    // Load tracking state when popup opens
    chrome.storage.local.get(["isTracking"], data => {
        const isTracking = data.isTracking ?? true; // Default to ON if undefined
        toggleSwitch.checked = isTracking;
        updateUI(isTracking);
    });
    
    chrome.storage.sync.get(["user"], (userData) => {
        if (userData.user) {
            chrome.storage.local.get(["isTracking"], data => {
                const isTracking = data.isTracking ?? false; // Default to OFF
                toggleSwitch.checked = isTracking;
                updateUI(isTracking);
            });
        }
    });
    

    // Handle Logout
    logoutBtn.addEventListener("click", () => {
        chrome.storage.sync.remove(["user", "token"], () => {
            showLoginUI();
        });
    });

    // Handle Toggle Switch
    toggleSwitch.addEventListener("change", () => {
        const isTracking = toggleSwitch.checked;
        chrome.storage.local.set({ isTracking });
        updateUI(isTracking);
    });

    function showMainUI() {
        loginSection.classList.add("hidden");
        mainSection.classList.remove("hidden");
    }

    function showLoginUI() {
        loginSection.classList.remove("hidden");
        mainSection.classList.add("hidden");
    }

    function updateUI(isTracking) {
        document.body.className = isTracking ? "on-mode" : "off-mode";
    }
});

