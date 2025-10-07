import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    let { email, password } = body;

    // Trim and normalize email
    email = email?.trim().toLowerCase();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, error: "Please provide both email and password" }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Ensure JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in .env.local");
      return new Response(
        JSON.stringify({ success: false, error: "Server misconfiguration. Contact admin." }),
        { status: 500 }
      );
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        token,
        user: { id: user._id, name: user.name, email: user.email },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Something went wrong. Please try again." }),
      { status: 500 }
    );
  }
}
