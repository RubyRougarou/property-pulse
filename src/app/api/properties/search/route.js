import connectDb from "../../../../../configs/db";
import Property from "../../../../../models/property";

export const GET = async (req) => {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");

    // Match location pattern against database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    // Only check for property if it's not 'All'
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Something went wrong!", {
      status: 500,
    });
  }
};
