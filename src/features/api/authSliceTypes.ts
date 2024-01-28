export interface UserData {
    id: string,
    createdOn: Date,
    email: string,
    userName: string,
    phoneNumber: string,
}


export interface AuthResponse {
    success: boolean;
    data: UserData;
    errors: string[];
    message: string;
    token: string;
}
  

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    email: string;
    userName: string
    password: string;
}