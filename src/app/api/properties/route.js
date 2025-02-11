import connectDb from "../../../../configs/db";
import Property from "../../../../models/property";
import { getUserSession } from "@/app/_libs/getUserSession";
import cloudinary from "../../../../configs/cloudinary";

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

//POST
export async function POST(req) {
  try {
    await connectDb();

    const userSession = await getUserSession();
    if (!userSession || !userSession.userId)
      return new Response("Unauthorized!", { status: 401 });

    const { userId } = userSession;

    const formData = await req.formData();

    // Access all values from amenities and images:
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    // Create propertyData object
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // Upload image(s) to Cloudinary
    const imagesUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert imageData to base64
      const imageBase64 = imageData.toString("base64");

      // Make request to upload to Cloudinary
      const result = cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "propertypulse" },
      );

      imagesUploadPromises.push((await result).secure_url);

      // Wait for all images to upload
      const uploadedImages = await Promise.all(imagesUploadPromises);

      // Add uploaded images to propertyData object
      propertyData.images = uploadedImages;
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`,
    );

    // return new Response(JSON.stringify({ message: "Success!" }), {
    //   status: 200,
    // });
  } catch (err) {
    console.log(err);
    return new Response("Failed to add a property!", { status: 500 });
  }
}
