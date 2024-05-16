export interface PatientInput {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface PatientLogin {
  email: string;
  password: string;
}
