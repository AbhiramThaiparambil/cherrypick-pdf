export interface SignupRequestDTO {
  email: string;
  password: string;
}

export interface SignupResponseDTO {
  id: string;
  email: string;
  createdAt: Date;
}
