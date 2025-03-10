import connectDb from "../../../../configs/db";
import Message from "../../../../models/message";
import { getUserSession } from "@/app/_libs/getUserSession";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    await connectDb();

    const userSession = await getUserSession();
    if (!userSession || !userSession.userId) {
      return new Response("You must log in first!", { status: 401 });
    }
    const { userId } = userSession;

    const messages = await Message.find({ recipient: userId })
      .populate("sender", "username")
      .populate("property", "name");

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};

export const POST = async (req) => {
  try {
    await connectDb();

    const { name, email, phone, message, property, recipient } =
      await req.json();

    const userSession = await getUserSession();
    if (!userSession || !userSession.userId) {
      return new Response(
        JSON.stringify({ message: "You must log in first!" }),
        { status: 401 },
      );
    }

    const { user } = userSession;

    // Cannot send message to self
    if (user.id === recipient)
      return new Response(
        JSON.stringify({ message: "Cannot send a message to yourself!" }),
        { status: 400 },
      );

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      email,
      phone,
      name,
      body: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: "Message has been sent." }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};
