import connectDb from "../../../../configs/db";
import Property from "../../../../models/property";

//GET
export async function GET(req) {
  try {
    await connectDb();
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("the worst api route ever!", { status: 500 });
  }
}
