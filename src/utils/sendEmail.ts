import transporter from "../config/nodemailer";
import {InternalException} from "../exceptions/HttpExceltions";

export const sendEmail = async (to: string, from: string, subject: string, text: string) => {
    try {
        const mailOptions = {to, from, subject, text};
        const info = await transporter.sendMail(mailOptions);
        return info.response;
    } catch (error) {
        throw new InternalException("Failed to send email", error);
    }
};