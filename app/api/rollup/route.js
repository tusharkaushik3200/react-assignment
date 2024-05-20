import { connectDB } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req, res) {
  try {
    const data = await req.json();
    console.log(data, "-----data");

    const db = await connectDB();
    console.log("Connected to MongoDB");

    const result = await db.collection("work").insertOne({ ...data });
    if (result.insertedId) {
      return Response.json({
        status: true,
        message: "Data inserted successfully.",
        user: result,
      });
    } else {
      return Response.json({
        status: false,
        message: "Something went wrong.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return Response.json({
      status: false,
      message: "Something went wrong.",
      data: error,
    });
  }
}

export async function GET() {
  try {
    const db = await connectDB();
    console.log("Get Connected to MongoDB");

    const result = await db.collection("work").find().toArray();

    if (result) {
      return Response.json({
        status: true,
        message: "Data retrieved successfully.",
        data: result,
      });
    } else {
      return Response.json({
        status: false,
        message: "Data not found.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return Response.json({
      status: false,
      message: "Something went wrong.",
      data: error,
    });
  }
}
