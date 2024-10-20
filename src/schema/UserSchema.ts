import {z} from "zod";

const userSignUpSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
});

const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const userResetPasswordSchema = z.object({
    email: z.string().email(),
})

const verifyCodeSchema = z.object({
    email: z.string().email(),
    code: z.string().length(4),
})
const resetPasswordSchema = z.object({
    email: z.string().email(),
    newPassword: z.string(),
})

export {userSignUpSchema, userLoginSchema,userResetPasswordSchema,verifyCodeSchema,resetPasswordSchema};