MySQL Database Design
Table: admin
id: INT, Primary Key, Auto Increment

username: VARCHAR(50), Unique, Not Null

password: VARCHAR(255), Not Null (hashed)

email: VARCHAR(100), Unique, Not Null

full_name: VARCHAR(100), Not Null

Table: doctors
id: INT, Primary Key, Auto Increment

full_name: VARCHAR(100), Not Null

specialization: VARCHAR(100), Not Null

email: VARCHAR(100), Unique, Not Null

phone: VARCHAR(20)

availability_status: BOOLEAN, Default: True

Table: patients
id: INT, Primary Key, Auto Increment

full_name: VARCHAR(100), Not Null

email: VARCHAR(100), Unique, Not Null

phone: VARCHAR(20)

date_of_birth: DATE

medical_history_summary: TEXT

Table: appointments
id: INT, Primary Key, Auto Increment

doctor_id: INT, Foreign Key → doctors(id), Not Null

patient_id: INT, Foreign Key → patients(id), Not Null

appointment_time: DATETIME, Not Null

duration_minutes: INT, Default: 60

status: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled, 3 = No-show)

MongoDB Collection Design
Collection: prescriptions
JSON

{
  "_id": "65b2f1e4c9e7a12345678901",
  "appointment_id": 102,
  "patient_id": 45,
  "doctor_id": 12,
  "issue_date": "2026-01-16T14:30:00Z",
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Three times a day",
      "duration": "7 days"
    },
    {
      "name": "Ibuprofen",
      "dosage": "200mg",
      "frequency": "As needed for pain",
      "duration": "3 days"
    }
  ],
  "doctor_notes": "Patient should finish the full course of antibiotics even if feeling better.",
  "vitals_at_visit": {
    "blood_pressure": "120/80",
    "weight_kg": 72.5,
    "temperature_c": 37.2
  },
  "follow_up_required": true
}
