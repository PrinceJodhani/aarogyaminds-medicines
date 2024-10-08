
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { email } = await request.json();
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  
  console.log(`Generated OTP: ${otp}`); // Debugging log

  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: "support@aarogyaminds.com",
      pass: "Support$12g34o",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              margin: 0;
              padding: 0;
          }
  
          .container {
              background-color: #ffffff;
              margin: 50px auto;
              padding: 20px;
              max-width: 600px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          .header {
              text-align: center;
              padding: 10px 0;
          }
  
              .header h1 {
                  margin: 0;
                  color: #007bff;
              }
  
          .content {
              margin: 20px 0;
          }
  
              .content p {
                  font-size: 16px;
                  line-height: 1.6;
              }
  
          .otp {
              display: block;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
              color: #28a745;
              margin: 20px 0;
          }
  
          .footer {
              text-align: center;
              font-size: 12px;
              color: #777;
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Aarogya Minds</h1>
          </div>
          <div class="content">
              <p>Dear User,</p>
              <p>Thank you for registering with Aarogya Minds. Please use the following One-Time Password (OTP) to verify your email address:</p>
              <span class="otp">${otp}</span>
              <p>This OTP is valid for 10 minutes. Please do not share this OTP with anyone.</p>
              <p>If you did not request this email, please ignore it.</p>
          </div>
          <div class="footer">
              <p>&copy; 2024 Aarogya Minds. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `;

  try {
    await transporter.sendMail({
      from: '"Aarogya Minds Support" <support@aarogyaminds.com>',
      to: email,
      subject: "Your OTP Code",
      html: htmlContent,
    });

    console.log(`OTP sent to ${email}`); // Debugging log
    return NextResponse.json({ otp });
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
