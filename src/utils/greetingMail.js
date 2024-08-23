// utils/sendMail.js

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const templates = {
  verification_success: (params) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Verified</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            h1 {
                color: #00796b;
                font-size: 24px;
                margin-bottom: 20px;
            }
            p {
                color: #555555;
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 20px;
            }
            .button {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 25px;
                color: #ffffff;
                background-color: #00796b;
                text-decoration: none;
                font-size: 16px;
                border-radius: 25px;
                transition: background-color 0.3s ease, transform 0.3s ease;
            }
            .button:hover {
                background-color: #004d40;
                transform: scale(1.05);
            }
            .footer {
                margin-top: 30px;
                color: #ffffff;
                font-size: 14px;
                background-color: #00796b;
                padding: 10px;
                border-radius: 25px;
                text-align: center;
            }
            .footer a {
                color: #ffffff;
                text-decoration: none;
                font-weight: bold;
            }

            /* Responsive Design */
            @media only screen and (max-width: 600px) {
                .container {
                    padding: 15px;
                }
                h1 {
                    font-size: 20px;
                }
                p {
                    font-size: 14px;
                }
                .button {
                    padding: 10px 20px;
                    font-size: 14px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Account Verified!</h1>
            <p>Hello ${params.to_name},</p>
            <p>Your email has been successfully verified. You can now log in to your account using the button below:</p>
            <a href="${params.verification_link}" class="button">Login to Your Account</a>
            <p class="footer">Thank you for joining Green Expo!</p>
        </div>
    </body>
    </html>
  `,
};

export const sendGreetingEmail = async (email, params, templateType) => {
  const html = templates[templateType](params);

  try {
    const mailOptions = {
      from: `"Green Expo" <${process.env.EMAIL_USER}>`,
      subject:
        templateType === "verification_success"
          ? "Account Verified"
          : "Email Verification",
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
};
