import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { query } from '@/lib/db';

export async function GET(req: Request) {
  try {
    // Get email and verified status from the URL query parameters
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const verified = searchParams.get('verified') === 'true'; // convert to boolean

    // Ensure email is provided
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Update the database based on the verified status
    const sql = `UPDATE users SET verified = $1 WHERE email = $2`;
    const result = await query(sql, [verified, email]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Send a confirmation email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h1 style="color: #4CAF50;">${verified ? 'Congratulations!' : 'Oops!'}</h1>
        <p style="font-size: 18px;">
          ${verified 
            ? 'Your profile has been successfully verified!' 
            : 'Unfortunately, your profile verification was declined.'}
        </p>
        <p style="font-size: 16px;">${verified 
          ? 'You can now enjoy full access to our services.'
          : 'Please check your details and try again.'}
        </p>
        <footer style="margin-top: 20px;">
          <p style="font-size: 14px;">Thank you for using Aarogya Minds.</p>
          <p><a href="https://aarogyaminds.com" style="color: #4CAF50;">Visit our website</a></p>
        </footer>
      </div>
    `;

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

    // Email options
    const mailOptions = {
      from: '"Aarogya Minds" <support@aarogyaminds.com>',
      to: email,
      subject: `Profile Verification ${verified ? 'Success' : 'Failure'}`,
      html: htmlContent,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({
      message: `User verification status updated and email sent to ${email}.`,
    });
  } catch (error) {
    console.error("Error processing verification:", error);
    return NextResponse.json({ error: "An error occurred while processing verification." }, { status: 500 });
  }
}
