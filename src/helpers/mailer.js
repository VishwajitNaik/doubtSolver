import nodemailer from "nodemailer";
import User from "../models/userModel";
import bcryptjs from 'bcryptjs';

const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create a hashed token 
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3d61e4de26cbc2",
        pass: "your_password_here"
      }
    });

    const mailOptions = {
      from: 'vishwajitnaik1999@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset Your password",
      html: `<p>Click <a href="http://localhost:3000/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser.
      <br /> http://localhost:3000/verifyemail?token=${hashedToken}</p>`
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default sendEmail;
