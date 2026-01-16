User Story: Admin
Title: As an admin, I want to manage doctor profiles and platform security, so that the clinic registry remains accurate and the system stays protected.

Acceptance Criteria:

Admin can log in/out securely using validated credentials and JWT tokens.

Admin can add new doctor profiles with specialization and contact details to the MySQL database.

Admin can delete existing doctor profiles and run stored procedures to track monthly appointment statistics.

Priority: High Story Points: 8 
Notes:

Deleting a doctor should trigger a check for existing appointments to maintain referential integrity.

Stored procedures must be executed via the MySQL repository layer.

User Story: Patient
Title: As a patient, I want to explore doctors and book appointments, so that I can receive timely medical care and manage my consultations.

Acceptance Criteria:

Patient can view a list of doctors without logging in to explore options.

Patient can sign up, log in, and book an hour-long appointment slot with a selected doctor.

Patient can view a chronological list of their upcoming appointments on their personal dashboard.

Priority: High Story Points: 8 
Notes:

Booking logic must prevent double-booking the same time slot for a specific doctor in MySQL.

Unauthorized users should be redirected to the login page when attempting to book.

User Story: Doctor
Title: As a doctor, I want to manage my availability and review patient details, so that I can stay organized and provide prepared consultations.

Acceptance Criteria:

Doctor can log in to view a private appointment calendar and update their professional specialization/contact info.

Doctor can mark specific time slots as unavailable to block them from patient booking.

Doctor can view detailed patient profiles and medical history for all upcoming scheduled appointments.

Priority: High 
Story Points: 5 
Notes:

Patient details involve fetching relational data from MySQL and prescription history from MongoDB.

Unavailability slots should be stored in a dedicated table to filter the "Available Slots" view for patients.
