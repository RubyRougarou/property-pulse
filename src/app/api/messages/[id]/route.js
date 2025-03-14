import connectDb from "../../../../../configs/db";
import Message from "../../../../../models/message";
import { getUserSession } from "@/app/_libs/getUserSession";

export const dynamic = "force-dynamic";

export const PUT = async (req, { params }) => {
  try {
    await connectDb();

    const { id } = await params;

    const userSession = await getUserSession();
    if (!userSession || !userSession.userId) {
      return new Response("You must log in first!", { status: 401 });
    }
    const { userId } = userSession;

    const message = await Message.findById(id);
    if (!message) return new Response("Message not found!", { status: 404 });

    // Verify ownership
    if (message.recipient.toString() !== userId)
      return new Response("Unauthorized!", { status: 401 });

    // Update message to read/unread depending on the current status
    message.read = !message.read;
    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectDb();

    const { id } = await params;

    const userSession = await getUserSession();
    if (!userSession || !userSession.userId) {
      return new Response("You must log in first!", { status: 401 });
    }
    const { userId } = userSession;

    const message = await Message.findById(id);
    if (!message) return new Response("Message not found!", { status: 404 });

    // Verify ownership
    if (message.recipient.toString() !== userId)
      return new Response("Unauthorized!", { status: 401 });

    // Delete the message
    await message.deleteOne();

    return new Response("Message deleted successfully.", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};
