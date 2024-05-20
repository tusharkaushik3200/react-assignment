import { connectDB } from "../../../../lib/mongodb";

export async function GET(req, res, context) {
  try {
    const id = req.url.split("/")[req.url.split("/").length - 1];
    const db = await connectDB();
    console.log("Connected to MongoDB");
    const result = await db.collection("work").find({ id: id }).toArray();
    if (result) {
      return Response.json({
        status: true,
        message: "Data retrieved successfully.",
        data: result,
      });
    } else {
      return Response.json({
        status: false,
        message: "Data not found for the specified email.",
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

export async function PUT(req, res) {
  try {
    const data = await req.json();
    const id = req.url.split("/")[req.url.split("/").length - 1];
    const { ...updateData } = data;

    const db = await connectDB();
    console.log("Connected to MongoDB");

    const result = await db
      .collection("work")
      .updateOne({ id: id }, { $set: { ...updateData } });

    if (result.modifiedCount > 0) {
      return Response.json({
        status: true,
        message: "Data updated successfully.",
      });
    } else {
      return Response.json({
        status: false,
        message: "No document matched the provided id.",
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

export async function DELETE(req, res) {
  try {
    const id = req.url.split("/")[req.url.split("/").length - 1];

    const db = await connectDB();
    console.log("Connected to MongoDB");

    const result = await db.collection("work").deleteOne({ id: id });
    if (result.deletedCount > 0) {
      return Response.json({
        status: true,
        message: "Data deleted successfully.",
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
