import { connect } from "@/app/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
// import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log("reqbody", username);

    //check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }

    //hash password

    const newUser = new User({
      username,
      email,
      password: password,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification email

    // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    // return NextResponse.json({
    //   message: "User created successfully",
    //   success: true,
    //   savedUser,
    // });

    return NextResponse.json({
      message: "User is created Succesfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {}
}
