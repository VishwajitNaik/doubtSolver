import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbconfig/dbconfig";
import Doubt from "../../../../models/doubtModel";

connect();

export async function GET(request) {
  try {
    const userId = getDataFromToken(request);

    // Find doubts created by the logged-in user
    const userDoubts = await Doubt.find({ createdBy: userId });

    return NextResponse.json({
      message: "User doubts fetched successfully",
      data: userDoubts
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
