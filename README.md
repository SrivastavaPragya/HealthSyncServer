# HealthsyncServer API Documentation

## Libraries/Frameworks Used:
- **Express**: Web application framework for Node.js, simplifies building APIs.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment. Used for interacting with MongoDB.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens (JWT) for user authentication.
- **bcryptjs**: For hashing passwords before storing them in the database.
- **body-parser**: Middleware for parsing request bodies.
- **cors**: Middleware for enabling CORS in Express apps.
- **dotenv**: For loading environment variables from a .env file into process.env.
- **validator**: For input validation.

## API Endpoints:

### Hospitals:
- **Create Hospital**:
  - **Endpoint**: POST `/api/hospitals`
  - **Description**: Create a new hospital.
  - **Request Body**:
    ```json
    {
      "name": "Hospital Name",
      "TotalPatientCount": 0,
      "TotalDoctorCount": 0
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Hospital created successfully",
      "hospital": { "id": "hospital_id", "name": "Hospital Name", "TotalPatientCount": 0, "TotalDoctorCount": 0 }
    }
    ```

- **Get Hospital Details**:
  - **Endpoint**: GET `/api/hospitals/:hospitalId`
  - **Description**: Get details of a specific hospital, including its doctors.
  - **Response**:
    ```json
    {
      "hospital": { "id": "hospital_id", "name": "Hospital Name", "TotalPatientCount": 0, "TotalDoctorCount": 0, "doctors": [] }
    }
    ```

### Doctors:
- **Create Doctor**:
  - **Endpoint**: POST `/api/doctors`
  - **Description**: Create a new doctor and associate with a hospital.
  - **Request Body**:
    ```json
    {
      "name": "Doctor Name",
      "PatientCount": 0,
      "HospitalId": "hospital_id"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Doctor created successfully",
      "doctor": { "id": "doctor_id", "name": "Doctor Name", "PatientCount": 0, "HospitalId": "hospital_id" }
    }
    ```

- **Update Doctor Profile**:
  - **Endpoint**: PUT `/api/doctors/:doctorId`
  - **Description**: Update details of a specific doctor.
  - **Request Body**: (Fields to update)
    ```json
    {
      "name": "Updated Name",
      "PatientCount": 10
    }
    ```
  - **Response**:
    ```json
    {
      "id": "doctor_id",
      "name": "Updated Name",
      "PatientCount": 10,
      "HospitalId": "hospital_id"
    }
    ```

### Patients:
- **Create Patient**:
  - **Endpoint**: POST `/api/patients`
  - **Description**: Register a new patient.
  - **Request Body**:
    ```json
    {
      "name": "Patient Name",
      "address": "Patient Address",
      "email": "patient@example.com",
      "phoneNumber": "1234567890",
      "password": "password"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Patient created successfully",
      "patientId": "patient_id",
      "name": "Patient Name",
      "email": "patient@example.com"
    }
    ```

- **Login Patient**:
  - **Endpoint**: POST `/api/patients/login`
  - **Description**: Authenticate a patient and generate JWT token.
  - **Request Body**:
    ```json
    {
      "email": "patient@example.com",
      "password": "password"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Login successful",
      "token": "generated_jwt_token"
    }
    ```

- **Update Patient Profile**:
  - **Endpoint**: PUT `/api/patients/profile`
  - **Description**: Update profile details of the authenticated patient.
  - **Request Body**: (Fields to update)
    ```json
    {
      "name": "Updated Name",
      "address": "Updated Address",
      "email": "updated@example.com",
      "phoneNumber": "1234567890"
    }
    ```
  - **Response**:
    ```json
    {
      "id": "patient_id",
      "name": "Updated Name",
      "address": "Updated Address",
      "email": "updated@example.com",
      "phoneNumber": "1234567890"
    }
    ```