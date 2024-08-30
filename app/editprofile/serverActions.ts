"use server"
import { query } from "@/lib/db"; // Your database query function

export async function insertUser(email: string, name: string = "", password: string = "") {
  try {
    // Check if the user already exists
    const existingUser = await query("SELECT id FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length === 0) {
      // Insert user based on the authentication method
      if (password) {
        // Insert user with email and password (credentials provider)
        await query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
      } else {
        // Insert user with email and name (Google provider)
        await query("INSERT INTO users (email, name) VALUES ($1, $2)", [email, name]);
      }
      console.log("User inserted into the database.");
    } else {
      console.log("User already exists.");
    }
  } catch (error) {
    console.error("Error inserting user:", error);
    throw new Error("Failed to insert user");
  }
}
