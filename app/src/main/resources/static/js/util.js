// util.js

export function setRole(role) {
    localStorage.setItem("userRole", role);
}

export function getRole() {
    return localStorage.getItem("userRole");
}

export function clearRole() {
    localStorage.removeItem("userRole");
}

export function openModal(modalId) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;

    let content = '';

    // Patient Login is now also a Modal to ensure consistency and fix redirection issues
    if (modalId === 'adminLogin') {
        content = `
            <h3>Admin Login</h3>
            <form id="adminLoginForm">
                <input type="text" id="adminUsername" placeholder="Username" required>
                <input type="password" id="adminPassword" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>`;
    } else if (modalId === 'doctorLogin') {
        content = `
            <h3>Doctor Login</h3>
            <form id="doctorLoginForm">
                <input type="email" id="doctorEmail" placeholder="Doctor Email" required>
                <input type="password" id="doctorPassword" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>`;
    } else if (modalId === 'patientLogin') {
        content = `
            <h3>Patient Login</h3>
            <form id="patientLoginForm">
                <input type="email" id="patientEmail" placeholder="Patient Email" required>
                <input type="password" id="patientPassword" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>`;
    } else if (modalId === 'addDoctor') {
        content = `
            <h3>Add New Doctor</h3>
            <form id="addDoctorForm">
                <input type="text" id="docName" placeholder="Full Name" required>
                <input type="email" id="docEmail" placeholder="Email Address" required>
                <input type="text" id="docPhone" placeholder="Phone Number" required>
                <input type="password" id="docPassword" placeholder="Password" required>
                <input type="text" id="docSpecialty" placeholder="Specialty (e.g. Cardiology)" required>
                <input type="text" id="docTimes" placeholder="Available Times (e.g. 09:00-17:00)" required>
                <button type="submit">Save Doctor</button>
            </form>`;
    }

    modalBody.innerHTML = content;
    modal.style.display = 'block';

    // Event Listener Attachment for Forms (Safer than onsubmit in Modules)
    if (modalId === 'adminLogin') {
        document.getElementById('adminLoginForm').addEventListener('submit', (e) => window.adminLoginHandler(e));
    } else if (modalId === 'doctorLogin') {
        document.getElementById('doctorLoginForm').addEventListener('submit', (e) => window.doctorLoginHandler(e));
    } else if (modalId === 'patientLogin') {
        document.getElementById('patientLoginForm').addEventListener('submit', (e) => window.patientLoginHandler(e));
    } else if (modalId === 'addDoctor') {
        document.getElementById('addDoctorForm').addEventListener('submit', (e) => window.adminAddDoctor(e));
    }

    // Close logic
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
        closeBtn.onclick = () => closeModal();
    }

    // Close when clicking outside the modal content
    window.onclick = (event) => {
        if (event.target == modal) {
            closeModal();
        }
    };
}

export function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('modal-body').innerHTML = '';
    }
}