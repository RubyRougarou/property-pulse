import connectDb from "../../../../configs/db";
import User from "../../../../models/user";
import Property from "../../../../models/property";
import { getUserSession } from "@/app/_libs/getUserSession";

export const dynamic = "force-dynamic";

// GET
export const GET = async (req) => {
  try {
    await connectDb();

    const userSession = await getUserSession();
    if (!userSession || !userSession.userId)
      return new Response("Unauthorized!", { status: 401 });

    const { userId } = userSession;

    // Find user in database
    const user = await User.findById(userId);

    // Get users bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Something went wrong!", {
      status: 500,
    });
  }
};

// POST
export const POST = async (req) => {
  try {
    await connectDb();

    const { propertyId } = await req.json();

    const userSession = await getUserSession();
    if (!userSession || !userSession.userId)
      return new Response("Unauthorized!", { status: 401 });

    const { userId } = userSession;

    // Find user in database
    const user = await User.findById(userId);

    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      // If already bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully!";
      isBookmarked = false;
    } else {
      // If not bookmarked, add it
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully!";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Something went wrong!", {
      status: 500,
    });
  }
};
