import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.HMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// render a EJS mail templete
const renderEmailTemplete = async (
  templateName: string,
  data: Record<string, any>
): Promise<string> => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "packages",
    "utils",
    "email-templates",
    `${templateName}.ejs`
  );

  return ejs.renderFile(templatePath, data);
};

//send email
export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  data: Record<string, any>
) => {
  try {
    const html = await renderEmailTemplete(templateName, data);
    await transporter.sendMail({
      from: `<${process.env.SMTP_USER}`,
      to: to,
      subject: subject,
      html: html,
    });
    return true;
  } catch (e) {
    console.log("Error sending mail", e);
    return false;
  }
};
