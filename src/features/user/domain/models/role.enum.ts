export enum EUserRole {
    Owner = 'Owner',
    Admin = 'Admin',
}

export type TUserRole = keyof typeof EUserRole;
