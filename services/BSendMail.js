import BMAIL_TEMPLATE from "../config/BmailTemplate.js"
import transporter from "../config/mailConfig.js";

const BsendMail = async (to, subject,content) => {
    const options = {
        from: process.env.EMAIL, // sender address
        to, // receiver email
        subject, // Subject line
        //text,
        html: BMAIL_TEMPLATE(content),
    }
    try {
        const info = await transporter.sendMail(options);  // Await the result of sendMail
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.log("I am getting error in the sendMail");
        throw new Error("Error in sending OTP. Kindly resend the OTP.");
    }
}

export default BsendMail;