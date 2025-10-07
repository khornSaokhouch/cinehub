import { connectDB } from '../../lib/mongodb';
import User from '../../models/user';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    if (!process.env.JWT_SECRET) {
      return new Response(JSON.stringify({ success: false, error: 'Server misconfiguration' }), { status: 500 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid token' }), { status: 401 });
    }

    const user = await User.findById(decoded.userId).lean();
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, createdAt: user.createdAt }
    }), { status: 200 });

  } catch (error) {
    console.error("Profile API error:", error);
    return new Response(JSON.stringify({ success: false, error: 'Something went wrong' }), { status: 500 });
  }
}
