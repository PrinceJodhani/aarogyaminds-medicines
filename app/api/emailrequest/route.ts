export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();

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
      <title>Psychiatrist Approval Request</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #4caf50;
          padding: 20px;
          border-radius: 8px 8px 0 0;
          color: #fff;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
        }
        .content h2 {
          color: #4caf50;
          margin-bottom: 10px;
          font-size: 20px;
        }
        .content p {
          font-size: 16px;
          margin: 5px 0;
        }
        .content table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        .content table th, .content table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        .content table th {
          background-color: #f0f0f0;
          color: #333;
        }
        .content a {
          color: #4caf50;
          text-decoration: none;
        }
        .buttons {
          text-align: center;
          margin: 20px 0;
        }
        .buttons a {
          display: inline-block;
          margin: 0 10px;
          padding: 10px 20px;
          font-size: 16px;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
        }
        .approve {
          background-color: #4caf50;
        }
        .decline {
          background-color: #f44336;
        }
        .footer {
          text-align: center;
          padding: 10px;
          background-color: #f0f0f0;
          border-radius: 0 0 8px 8px;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Psychiatrist Approval Request</h1>
        </div>
    
        <div class="content">
          <h2>Request Details</h2>
          <p>A new psychiatrist has submitted their profile for approval. Please review the details below and take appropriate action.</p>
          
          <table>
            <tr>
              <th>Name</th>
              <td>${data.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>${data.email}</td>
            </tr>
            <tr>
              <th>Bio</th>
              <td>${data.bio}</td>
            </tr>
            <tr>
              <th>Degree</th>
              <td>${data.degree}</td>
            </tr>
            <tr>
              <th>Instagram</th>
              <td><a href="${data.insta_url}" target="_blank">${data.insta_url}</a></td>
            </tr>
            <tr>
              <th>Facebook</th>
              <td><a href="${data.fb_url}" target="_blank">${data.fb_url}</a></td>
            </tr>
            <tr>
              <th>Twitter</th>
              <td><a href="${data.twitter_url}" target="_blank">${data.twitter_url}</a></td>
            </tr>
            <tr>
              <th>Website</th>
              <td><a href="${data.web_url}" target="_blank">${data.web_url}</a></td>
            </tr>
            <tr>
              <th>Profile Image</th>
              <td><a href="${data.profileImage}" target="_blank">View Image</a></td>
            </tr>
            <tr>
              <th>Degree File</th>
              <td><a href="${data.degreeFile}" target="_blank">View Degree</a></td>
            </tr>
            <tr>
              <th>Registration Certificate</th>
              <td><a href="${data.registration}" target="_blank">View Certificate</a></td>
            </tr>
          </table>
        </div>
        <div class="buttons">
          <a href="https://aarogyaminds.com/api/verify?email=${data.email}&verified=true" class="approve">Approve</a>
          <a href="https://aarogyaminds.com/api/verify?email=${data.email}&verified=false" class="decline">Decline</a>
        </div>
    
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Aarogya Minds. All Rights Reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `;
    

    const mailOptions = {
      from: '"Aarogya Minds Support" <support@aarogyaminds.com>',
      to: 'princejodhani7@gmail.com',
      subject: 'New Psychiatrist Approval Request',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
