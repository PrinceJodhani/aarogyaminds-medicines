// app/actions/editprofile.ts

'use server';
import { pool } from "@/lib/db";

interface EditProfileParams {
  degreeFile: any;
  profileImage: any;
  registration?: string;
  id?: string;
  name?: string;
  bio?: string;
  insta_url?: string;
  fb_url?: string;
  twitter_url?: string;
  youtube?:string;
  web_url?: string;
  psychiatrist?: boolean;
  psychologist?: boolean;
  degreeName?: string;
  email?: string;

  dob?: string;

  clinicName?: string;
  appointmentNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  PhoneNumber?:string;

}

export async function EditProfile(data: EditProfileParams) {
  const client = await pool.connect();
  try {

    
    console.log(data.registration);

    let query = `UPDATE users SET`;
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (data.name) {
      fields.push(`name = $${index++}`);
      values.push(data.name);
    }
    if (data.bio) {
      fields.push(`bio = $${index++}`);
      values.push(data.bio);
    }
 
    if (data.insta_url) {
      fields.push(`insta_url = $${index++}`);
      values.push(data.insta_url);
    }
    if (data.fb_url) {
      fields.push(`fb_url = $${index++}`);
      values.push(data.fb_url);
    }
    if (data.twitter_url) {
      fields.push(`twitter_url = $${index++}`);
      values.push(data.twitter_url);
    }
    if (data.web_url) {
      fields.push(`web_url = $${index++}`);
      values.push(data.web_url);
    }
    if (data.psychiatrist !== undefined) {
      fields.push(`psychiatrist = $${index++}`);
      values.push(data.psychiatrist);
    }
    if (data.psychologist !== undefined) {
      fields.push(`psychologist = $${index++}`);
      values.push(data.psychologist);
    }
    if (data.degreeName) {
      fields.push(`degree = $${index++}`);
      values.push(data.degreeName);
    }
    if (data.degreeFile) {
      fields.push(`degree_url = $${index++}`);
      values.push(data.degreeFile);
    }
    if (data.profileImage) {
      fields.push(`profile_picture = $${index++}`);
      values.push(data.profileImage);
    }
    if (data.registration) {
      fields.push(`reg_certy = $${index++}`);
      values.push(data.registration);
    }
   
    if (data.youtube) {
      fields.push(`yt_url = $${index++}`);
      values.push(data.youtube);
    }
    if (data.clinicName) {
      fields.push(`clinic_name = $${index++}`);
      values.push(data.clinicName);
    }
    if (data.dob) {
      fields.push(`dob = $${index++}`);
      values.push(data.dob);
    }
    if (data.appointmentNumber) {
      fields.push(`appointment = $${index++}`);
      values.push(data.appointmentNumber);
    }
    if (data.address) {
      fields.push(`address = $${index++}`);
      values.push(data.address);
    }
    if (data.city) {
      fields.push(`city = $${index++}`);
      values.push(data.city);
    }if (data.state) {
      fields.push(`state = $${index++}`);
      values.push(data.state);
    }if (data.pincode) {
      fields.push(`pincode = $${index++}`);
      values.push(data.pincode);
    }if (data.country) {
      fields.push(`country = $${index++}`);
      values.push(data.country);
    }
    if (data.PhoneNumber) {
      fields.push(`phonenumber = $${index++}`);
      values.push(data.PhoneNumber);
    }

    query += ` ${fields.join(", ")} WHERE email = $${index} RETURNING *`;
    values.push(data.email);

    console.log('Executing query:', query);  // Log the query for debugging
    console.log('With values:', values);    // Log the values for debugging

    const result = await client.query(query, values);
    console.log('Update result:', result.rows);  // Log the result of the update

  } catch (error) {
    console.error('Error updating profile:', error);  // Catch and log any errors
    throw new Error('Failed to update profile');
  } finally {
    client.release();
  }
}
