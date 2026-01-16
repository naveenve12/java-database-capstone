Section 1: Architecture Summary
This Smart Clinic application is built on a Layered Architecture with Polyglot Persistence, designed to handle both structured administrative data and flexible medical records. The backend uses Spring Boot, employing a hybrid controller approach where Thymeleaf MVC handles server-side rendering for Admin and Doctor dashboards, while RESTful APIs facilitate data exchange for client-side modules like Appointment booking and Patient records.

To optimize data storage, the system integrates two database engines: MySQL manages relational entities such as Users, Doctors, and Appointments, ensuring transactional integrity and strong relationships; meanwhile, MongoDB stores Prescriptions as document models to accommodate varying medical data structures. A unified Service Layer sits between the controllers and repositories, centralizing business logic, cross-layer validations, and coordination between the JPA and NoSQL data sources.

Section 2: Numbered Flow of Data and Control
Client Request: A user interacts with the UI, either by accessing a Thymeleaf dashboard (Admin/Doctor) or by triggering a REST client call (Patient/Appointments).

Controller Routing: The DispatcherServlet routes the request to the appropriate @Controller (for HTML views) or @RestController (for JSON data).

Business Logic Execution: The controller delegates the task to the Service Layer, which performs validations and applies specific business rules (e.g., checking appointment overlaps).

Data Access: The Service calls the relevant Repository; it either uses Spring Data JPA for MySQL operations or Spring Data MongoDB for prescription-related tasks.

Database Interaction: The repositories execute queries against MySQL (structured relational tables) or MongoDB (unstructured BSON documents).

Model Binding: Retrieved data is mapped into Java objects—either JPA Entities annotated with @Entity or MongoDB Documents annotated with @Document.

Response Delivery: The Service returns the data to the Controller, which either injects it into a Thymeleaf Model for browser rendering or serializes it into JSON for an API response.
