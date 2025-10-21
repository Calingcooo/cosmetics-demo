export type LoginResponse = {
    success: boolean;
    message: string;
};

export type LoginFormData = {
    email: string;
    password: string;
}

export type SignupFormData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}