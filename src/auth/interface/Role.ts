export enum Role {
    Admin = 'admin',
    User = 'user'
}

type User = {
    id: string;
    userName: string;
    password: string;
    email: string;
    role: Role;
}


// To check if user authenticated
export interface IAuthenticate {
    user: User;
    token: string;
}