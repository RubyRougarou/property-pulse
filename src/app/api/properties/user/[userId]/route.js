import connectDb from "../../../../../../configs/db";
import Property from "../../../../../../models/property";

//GET
export async function GET(req, { params }) {
  try {
    await connectDb();

    const { userId } = await params;
    if (!userId) {
      return new Response("User ID is required!", { status: 400 });
    }

    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("the worst api route ever!", { status: 500 });
  }
}
