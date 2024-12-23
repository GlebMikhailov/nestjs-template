export enum EUserRole {
    User = 'User',
    Admin = 'Admin',
}

export type TUserRole = keyof typeof EUserRole;
