// app/api/auth/signup/route.js

import dbConnect from '@/app/lib/mongoConn/mongodb';
import User from '@/app/models/User';

import bcrypt from 'bcryptjs';

// POST request for user signup
export async function POST(req) {
  dbConnect()
  const { username, email, password } = await req.json();

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), {
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return new Response(JSON.stringify({ message: 'User created successfully' }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    });
  }
}

// GET request for fetching all users
export async function GET(req) {
  dbConnect()
  try {
    // Fetch all users
    const users = await User.find({});
    console.log(users);
    
    if (users.length === 0) {
      return new Response(JSON.stringify({ message: 'No users found' }), {
        status: 404,
      });
    }

    // Exclude passwords from the response
    const usersWithoutPassword = users.map(user => {
      const { password, ...userData } = user.toObject();
      return userData;
    });

    return new Response(JSON.stringify(usersWithoutPassword), {
      status: 200,
    });
  } catch (error) {
    // console.log(error);
    
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    });
  }
}
