import { Role } from "./enums/role";

export class User {
    email?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    role?: Role;
}
