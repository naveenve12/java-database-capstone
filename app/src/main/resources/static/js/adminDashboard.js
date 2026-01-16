import { getDoctors, saveDoctor, filterDoctors } from './doctorServices.js';
import { openModal, closeModal } from './utils.js';
import { createDoctorCard } from './render.js';

// 1. Attach listener to "Add Doctor" button
const addDoctorBtn = document.getElementById('addDoctorBtn');
if (addDoctorBtn) {
    addDoctorBtn.onclick = () => openModal('addDoctor');
}

// 2. Load doctors on DOM load
window.addEventListener('DOMContentLoaded', () => {
    loadDoctorCards();
    setupFilters();
});

// 3. Function: loadDoctorCards
async function loadDoctorCards() {
    try {
        const doctors = await getDoctors();
        renderDoctorCards(doctors);
    } catch (error) {
        console.error("Error loading doctor cards:", error);
    }
}

// 4. Setup Filter Event Listeners
function setupFilters() {
    const searchBar = document.getElementById('searchBar');
    const timeFilter = document.getElementById('timeFilter');
    const specialtyFilter = document.getElementById('specialtyFilter');

    [searchBar, timeFilter, specialtyFilter].forEach(element => {
        if (element) {
            element.addEventListener('input', filterDoctorsOnChange);
        }
    });
}

// 5. Function: filterDoctorsOnChange
async function filterDoctorsOnChange() {
    const name = document.getElementById('searchBar').value || "null";
    const time = document.getElementById('timeFilter').value || "null";
    const specialty = document.getElementById('specialtyFilter').value || "null";

    try {
        const data = await filterDoctors(name, time, specialty);
        if (data.doctors && data.doctors.length > 0) {
            renderDoctorCards(data.doctors);
        } else {
            document.getElementById('content').innerHTML = "<p>No doctors found with the given filters.</p>";
        }
    } catch (error) {
        alert("Error filtering doctors");
    }
}

// 6. Function: renderDoctorCards
function renderDoctorCards(doctors) {
    const content = document.getElementById('content');
    content.innerHTML = "";
    doctors.forEach(doctor => {
        const card = createDoctorCard(doctor);
        content.appendChild(card);
    });
}

// 7. Function: adminAddDoctor (Global for Form Submission)
window.adminAddDoctor = async () => {
    const name = document.getElementById('docName').value;
    const email = document.getElementById('docEmail').value;
    const phone = document.getElementById('docPhone').value;
    const password = document.getElementById('docPassword').value;
    const specialty = document.getElementById('docSpecialty').value;
    const availableTimes = document.getElementById('docTimes').value.split(',');

    const token = localStorage.getItem('adminToken');
    if (!token) {
        alert("Session expired. Please login again.");
        return;
    }

    const doctor = { name, email, phone, password, specialty, availableTimes };

    const result = await saveDoctor(doctor, token);

    if (result.success) {
        alert("Doctor added successfully!");
        closeModal();
        location.reload();
    } else {
        alert("Failed to add doctor: " + result.message);
    }
};