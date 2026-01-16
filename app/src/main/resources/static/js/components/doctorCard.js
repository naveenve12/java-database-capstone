// js/components/doctorCard.js

/**
 * Creates a dynamic, reusable doctor card based on user role.
 * @param {Object} doctor - The doctor object from the database.
 */
export function createDoctorCard(doctor) {
    // 1. Create the Main Card Container
    const card = document.createElement("div");
    card.classList.add("doctor-card");

    // 2. Fetch the User’s Role
    const role = localStorage.getItem("userRole");

    // 3. Create Doctor Info Section
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("doctor-info");

    const name = document.createElement("h3");
    name.textContent = doctor.name;

    const specialization = document.createElement("p");
    specialization.textContent = `Specialty: ${doctor.specialization}`;

    const email = document.createElement("p");
    email.textContent = `Email: ${doctor.email}`;

    const availability = document.createElement("p");
    // Joins array if multiple times exist, otherwise displays the value
    availability.textContent = `Availability: ${Array.isArray(doctor.availability) ? doctor.availability.join(", ") : doctor.availability}`;

    // Append info elements
    infoDiv.appendChild(name);
    infoDiv.appendChild(specialization);
    infoDiv.appendChild(email);
    infoDiv.appendChild(availability);

    // 4. Create Button Container
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("card-actions");

    // 5. Conditionally Add Buttons Based on Role
    if (role === "admin") {
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete";
        removeBtn.classList.add("delete-btn");

        removeBtn.addEventListener("click", async () => {
            const confirmed = confirm(`Are you sure you want to delete Dr. ${doctor.name}?`);
            if (confirmed) {
                const token = localStorage.getItem("token");
                // Import logic will be handled in service labs
                // await deleteDoctor(doctor.id, token); 
                card.remove(); 
            }
        });
        actionsDiv.appendChild(removeBtn);

    } else if (role === "patient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "Book Now";
        bookNow.addEventListener("click", () => {
            alert("Patient needs to login first.");
        });
        actionsDiv.appendChild(bookNow);

    } else if (role === "loggedPatient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "Book Now";
        bookNow.addEventListener("click", async (e) => {
            const token = localStorage.getItem("token");
            // Placeholder for service calls to be implemented in future labs
            // const patientData = await getPatientData(token);
            // showBookingOverlay(e, doctor, patientData);
            console.log("Triggering booking overlay for:", doctor.name);
        });
        actionsDiv.appendChild(bookNow);
    }

    // 6. Final Assembly
    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);

    return card;
}