import MAIL_TEMPLATE from "../config/mailTemplate.js"
import transporter from "../config/mailConfig.js";

const sendMail = async (otp, to, subject) => {
    const options = {
        from: process.env.EMAIL, // sender address
        to, // receiver email
        subject, // Subject line
        text: otp,
        html: MAIL_TEMPLATE(otp),
    }
    try {
        const info = await transporter.sendMail(options);  // Await the result of sendMail
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.log("I am getting error in the sendMail");
        throw new Error("Error in sending OTP. Kindly resend the OTP.");
    }
}

export default sendMail;