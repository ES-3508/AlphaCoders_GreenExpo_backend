import nodemailer from "nodemailer";

// Create the transporter object using your email service credentials
const transporter = nodemailer.createTransport({
  service: "Gmail", // or any other email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export const sendEmail = async (email, templateParams) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #e0f7fa;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: #00796b;
            font-size: 28px;
            margin-bottom: 20px;
        }
        p {
            color: #555555;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .verify-button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            color: #ffffff;
            background-color: #00796b;
            text-decoration: none;
            font-size: 18px;
            border-radius: 25px;
            transition: background-color 0.3s ease;
        }
        .verify-button:hover {
            background-color: #004d40;
        }
        .footer {
            margin-top: 40px;
            color: #ffffff;
            font-size: 14px;
            background-color: #00796b;
            padding: 15px;
            border-radius: 25px;
            text-align: center;
            width: 100%;
            margin: auto;
        }

        /* Responsive Design */
        @media only screen and (max-width: 600px) {
            .container {
                padding: 20px;
                margin: 20px auto;
            }
            h1 {
                font-size: 24px;
                margin-bottom: 15px;
            }
            p {
                font-size: 14px;
            }
            .verify-button {
                padding: 10px 20px;
                font-size: 16px;
            }
            .footer {
                font-size: 12px;
                padding: 10px;
                border-radius: 20px;
            }
        }

        @media only screen and (max-width: 400px) {
            .container {
                padding: 15px;
                margin: 10px auto;
            }
            h1 {
                font-size: 20px;
                margin-bottom: 10px;
            }
            p {
                font-size: 13px;
            }
            .verify-button {
                padding: 8px 16px;
                font-size: 14px;
            }
            .footer {
                font-size: 11px;
                padding: 8px;
                border-radius: 18px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Green Expo!</h1>
        <p>Hello ${templateParams.to_name},</p>
        <p>We're excited to have you on board. To get started, please confirm your email address by clicking the button below:</p>
        <a href="${templateParams.verification_link}" class="verify-button">Verify Email</a>
        <p>If the button above doesn't work, you can also verify your email by copying and pasting the following link into your browser:</p>
        <p><a href="${templateParams.verification_link}" style="color: #00796b;">${templateParams.verification_link}</a></p>
        <p class="footer">If you did not sign up for Green Expo, please ignore this email.</p>
    </div>
</body>
</html>`;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Green Expo Email Verification",
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
};
