// js/components/header.js

document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
});

function renderHeader() {
    const headerDiv = document.getElementById("header");
    if (!headerDiv) return;

    // 1. Check current page - Clear storage if on landing page
    if (window.location.pathname.endsWith("/") || window.location.pathname.endsWith("index.html")) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
    }

    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    // 2. Validate session for logged-in roles
    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
        localStorage.removeItem("userRole");
        alert("Session expired or invalid login. Please log in again.");
        window.location.href = "/";
        return;
    }

    // 3. Build Header Content
    let headerContent = `
        <div class="header-container">
            <div class="logo">
                <a href="/">ClinicPlus</a>
            </div>
            <nav class="nav-links">
    `;

    if (role === "admin") {
        headerContent += `
            <button id="addDocBtn" class="adminBtn">Add Doctor</button>
            <a href="#" id="logoutBtn">Logout</a>
        `;
    } else if (role === "doctor") {
        headerContent += `
            <a href="/templates/doctor/doctorDashboard.html">Home</a>
            <a href="#" id="logoutBtn">Logout</a>
        `;
    } else if (role === "patient") {
        headerContent += `
            <button id="loginBtn" class="button">Login</button>
            <button id="signupBtn" class="button">Sign Up</button>
        `;
    } else if (role === "loggedPatient") {
        headerContent += `
            <a href="/pages/patientDashboard.html">Home</a>
            <a href="/pages/myAppointments.html">Appointments</a>
            <a href="#" id="patientLogoutBtn">Logout</a>
        `;
    }

    headerContent += `
            </nav>
        </div>
    `;

    // 4. Inject HTML and attach listeners
    headerDiv.innerHTML = headerContent;
    attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
    // Add Doctor Listener
    const addDocBtn = document.getElementById("addDocBtn");
    if (addDocBtn) {
        addDocBtn.addEventListener("click", () => openModal('addDoctor'));
    }

    // General Logout Listener
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            logout();
        });
    }

    // Patient Logout Listener
    const patientLogoutBtn = document.getElementById("patientLogoutBtn");
    if (patientLogoutBtn) {
        patientLogoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            logoutPatient();
        });
    }
}

// 5. Logout Functionalities
function logout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    window.location.href = "/";
}

function logoutPatient() {
    localStorage.removeItem("token");
    localStorage.setItem("userRole", "patient");
    window.location.href = "/pages/patientDashboard.html";
}