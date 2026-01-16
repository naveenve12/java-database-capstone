import { getAllAppointments } from './appointmentServices.js';
import { createPatientRow } from './render.js';

const tableBody = document.querySelector('#appointmentTable tbody');
const datePicker = document.getElementById('datePicker');
const searchBar = document.getElementById('patientSearch');
const todayBtn = document.getElementById('todayBtn');

let selectedDate = new Date().toISOString().split('T')[0];
let patientName = "null";
const token = localStorage.getItem('doctorToken');

// Set initial date picker value
if (datePicker) datePicker.value = selectedDate;

// 1. Search Bar Event Listener
if (searchBar) {
    searchBar.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        patientName = value !== "" ? value : "null";
        loadAppointments();
    });
}

// 2. "Today" Button Listener
if (todayBtn) {
    todayBtn.onclick = () => {
        selectedDate = new Date().toISOString().split('T')[0];
        if (datePicker) datePicker.value = selectedDate;
        loadAppointments();
    };
}

// 3. Date Picker Change Listener
if (datePicker) {
    datePicker.onchange = (e) => {
        selectedDate = e.target.value;
        loadAppointments();
    };
}

// 4. Function: loadAppointments
async function loadAppointments() {
    try {
        const appointments = await getAllAppointments(selectedDate, patientName, token);
        tableBody.innerHTML = "";

        if (!appointments || appointments.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5">No Appointments found for today.</td></tr>`;
            return;
        }

        appointments.forEach(app => {
            // Construct patient object from appointment data
            const patient = {
                id: app.patientId,
                name: app.patientName,
                phone: app.patientPhone,
                email: app.patientEmail
            };
            
            const row = createPatientRow(app.id, app.appointmentTime, patient, app.status);
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Fetch error:", error);
        tableBody.innerHTML = `<tr><td colspan="5">Error loading appointments. Try again later.</td></tr>`;
    }
}

// 5. Initial Load
window.addEventListener('DOMContentLoaded', () => {
    // renderContent(); // Assumes this function is available globally or imported
    loadAppointments();
});