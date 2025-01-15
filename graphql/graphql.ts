
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserRole {
    Admin = "Admin",
    Owner = "Owner"
}

export interface GraphqlUserResponse {
    id: string;
    login: string;
    role: UserRole;
}

export interface IQuery {
    getUser(): GraphqlUserResponse | Promise<GraphqlUserResponse>;
}

type Nullable<T> = T | null;
