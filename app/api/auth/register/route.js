import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    let { name, email, password } = body;

    // Trim and normalize email
    email = email?.trim().toLowerCase();
    name = name?.trim();

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, error: "All fields are required" }),
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is already registered" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Registration successful",
        user: { id: user._id, name: user.name, email: user.email },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Something went wrong. Please try again." }),
      { status: 500 }
    );
  }
}
