import { connect } from "../../../../dbconfig/dbconfig";
import { NextResponse, NextRequest } from "next/server";
import User from "../../../../models/userModel";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);

        // Fixing Date.now() usage and finding the user with a valid token
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() } // Corrected Date.now()
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        console.log(user);

        // Update user verification status
        user.isverified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully.",
            success: true,
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
