import {z} from "zod";

export const registerSchema = z.object({
    firstName: z.string()
    .trim()
    .min(2,"First name must be at least 2 characters long")
    .max(100,"First name must be at most 100 characters long"),

    lastName: z.string()
    .trim()
    .min(2,"Last name must be at least 2 characters long")
    .max(100,"Last name must be at most 100 characters long"),

    phoneNumber: z.string()
    .trim()
    .regex(/^\d{10}$/,"Phone number must be a valid 10-digit number"),

    email: z.string()
    .trim()
    .email("Invalid email address")
    .max(100,"Email must be at most 100 characters long"),

    password: z.string()
    .min(8,"Password must be at least 8 characters long")
    .max(100,"Password must be at most 100 characters long")
})

export const loginSchema = z.object ({
    email: z.string()
    .trim()
    .email("Invalid email address")
    .max(100,"Email must be at most 100 characters long"),

    password: z.string()
    .min(8,"Password must be at least 8 characters long")
})