import {Response, Request} from "express";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import {firebaseAuth} from "../config/firebaseConfig";
import prismaClient from "../config/prismaConfig";
import {
    resetPasswordSchema,
    userLoginSchema,
    userResetPasswordSchema,
    userSignUpSchema,
    verifyCodeSchema
} from "../schema/UserSchema";
import bcrypt from 'bcrypt';
import {sendEmail} from "../utils/sendEmail";
import {
    EntryNotFoundException,
    InternalException,
    InvalidEmailOrPasswordException
} from "../exceptions/HttpExceltions";
import admin from "firebase-admin";

export const signup = async (req: Request, res: Response) => {
    const validatedUser = userSignUpSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(validatedUser.password, 10);
    const firebaseUserCredentials = await createUserWithEmailAndPassword(firebaseAuth, validatedUser.email, validatedUser.password);
    const user = firebaseUserCredentials.user;

    const registeredUser = await prismaClient.user.create({
        data: {
            id: String(user.uid),
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
        }
    });
    const token = await user?.getIdToken();
    res.status(201).json({user: {...registeredUser, token}});

}
export const login = async (req: Request, res: Response) => {
    const validatedUser = userLoginSchema.parse(req.body);

    const foundUser = await prismaClient.user.findFirstOrThrow({
        where: {email: validatedUser.email},
    });
    const isPasswordValid = await bcrypt.compare(validatedUser.password, foundUser.password);
    if (!isPasswordValid) {
        throw new InvalidEmailOrPasswordException("Invalid email or password!")
    }
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, validatedUser.email, validatedUser.password);
    const firebaseUser = userCredential.user;
    const token = await firebaseUser.getIdToken();
    res.status(200).json({user: foundUser, token});
};

export const requestPasswordReset = async (req: Request, res: Response) => {
    const validatedEmail = userResetPasswordSchema.parse(req.body)

    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60000);

    await prismaClient.user.update({
        where: {email: validatedEmail?.email},
        data: {
            passwordResetCode: verificationCode,
            passwordResetExpiresAt: expiresAt,
        },
    });

    await sendEmail(validatedEmail?.email, "erzabegu3@gmail.com", "Your Password Reset Code", `Your verification code is: ${verificationCode}`);

    return res.status(200).json({message: "Verification code sent to your email."});

};
export const verifyCode = async (req: Request, res: Response) => {
    const {email, code} = verifyCodeSchema.parse(req.body);
    const resetEntry = await prismaClient.user.findFirstOrThrow({
        where: {email: email, passwordResetCode: code},
    });

    if (resetEntry?.passwordResetExpiresAt! < new Date()) {
        throw new InternalException("Code has expired!");
    }

    res.status(200).json({message: "Verification code is valid."});
};


export const resetPassword = async (req: Request, res: Response) => {
    const {email, newPassword} = resetPasswordSchema.parse(req.body);

    const user = await prismaClient.user.findUnique({
        where: {email},
    });

    if (!user) {
        throw new EntryNotFoundException('User not found!');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prismaClient.user.update({
        where: {email},
        data: {
            password: hashedPassword,
        }
    })
    const userRecord = await admin.auth().getUserByEmail(email);

    if (!userRecord.uid) {
        throw new EntryNotFoundException('User not found!');
    }

    await admin.auth().updateUser(userRecord.uid, {
        password: newPassword
    });
    return res.status(201).json({message: "Successfully updated password for user!"});

};

