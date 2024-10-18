import { getDataFromToken } from "../../../../../helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../../dbconfig/dbconfig";
import Doubt from "../../../../../models/doubtModel";

connect();

export async function GET(request, { params }) {
  try {
    const userId = getDataFromToken(request);
    const { doubtId } = params;

    console.log(userId);

    console.log(doubtId);

    // Find the doubt by ID and ensure it was created by the logged-in user
    const doubt = await Doubt.findOne({ _id: doubtId, createdBy: userId });
    console.log(doubt);

    if (!doubt) {
      return NextResponse.json({ error: "Doubt not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Doubt fetched successfully",
      data: doubt
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
