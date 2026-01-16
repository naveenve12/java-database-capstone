import { openModal } from '../util.js'; 

const BASE_URL = 'https://naveenvenve-8080.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai';
const ADMIN_API = `${BASE_URL}/admin/login`;
const DOCTOR_API = `${BASE_URL}/doctor/login`;

document.addEventListener('DOMContentLoaded', () => {
    const adminBtn = document.getElementById('adminBtn');
    const doctorBtn = document.getElementById('doctorBtn');
    const patientBtn = document.getElementById('patientBtn');

    if (adminBtn) {
        adminBtn.addEventListener('click', () => openModal('adminLogin'));
    }
    
    if (doctorBtn) {
        doctorBtn.addEventListener('click', () => openModal('doctorLogin'));
    }

    if (patientBtn) {
        patientBtn.addEventListener('click', () => {
            // Updated to use the modal version for consistency if you updated util.js
            // or keep as redirect if preferred:
            window.location.href = 'patient-login.html';
        });
    }
});

// Updated to handle "username" instead of "email" for Admin
window.adminLoginHandler = async (event) => {
    if (event) event.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    try {
        const response = await fetch(ADMIN_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('adminToken', data.token);
            window.location.href = 'admin-dashboard.html';
        } else {
            alert("Invalid Admin Credentials");
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("An error occurred during Admin login.");
    }
};

window.doctorLoginHandler = async (event) => {
    if (event) event.preventDefault();
    
    const email = document.getElementById('doctorEmail').value;
    const password = document.getElementById('doctorPassword').value;

    try {
        const response = await fetch(DOCTOR_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('doctorToken', data.token);
            window.location.href = 'doctor-dashboard.html';
        } else {
            alert("Invalid Doctor Credentials");
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("An error occurred during Doctor login.");
    }
};