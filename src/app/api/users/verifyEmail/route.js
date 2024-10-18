import {connect} from "../../../../dbconfig/dbconfig"
import { NextResponse, NextRequest } from "next/server"
import User from "../../../../models/userModel"


connect()

export async function middleware(request){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        const user = await User.findOne({verifyToken: token,
        verifyTokenExpiry: {$gt: date.now()}})

        if(!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        user.isverified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save()

        return NextResponse.json({
            message: "Email verified success...",
            success: true
        })

    } catch (error) {
        return NextResponse.json({error: error.message })
    }
}
