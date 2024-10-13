import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_env === "production",
    auth: {
      user: "abusayedstudent855@gmail.com",
      pass: "nhlk qvtv prgl ttkc",
    },
  });
  await transporter.sendMail({
    from: '"abusayedstudent855@gmail.com', // sender address
    to, // list of receivers
    subject: "Reset your password withín 10 minute ✔", // Subject line
    text: "Reset your password withín 10 minute ?", // plain text body
    html, // html body
  });
};
