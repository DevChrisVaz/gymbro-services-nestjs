export enum GYMRoles {
    "OWNER",
    "MANAGER",
    "TRAINER"
}

export enum ApplicationRoles {
    "ADMINISTRATOR",
    "USER",
    "CUSTOMER_SERVICE"
}

export const Roles = { ...GYMRoles, ...ApplicationRoles }