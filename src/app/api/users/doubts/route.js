import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbconfig/dbconfig";
import Doubt from "../../../../models/doubtModel";

connect();

export async function POST(request) {
    try {
        const userId = getDataFromToken(request); // Extract the user ID from the token

        const reqBody = await request.json();
        const { title, type, description, image, video, bidRange } = reqBody;

        console.log(reqBody);

        // Create a new doubt instance
        const newDoubt = new Doubt({
            title,
            type,
            description,
            image,
            video,
            bidRange,
            createdBy: userId, // Use the extracted user ID here
        });

        // Save the new doubt to the database
        const savedDoubt = await newDoubt.save();

        return NextResponse.json({
            message: "Doubt created successfully",
            data: savedDoubt,
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
