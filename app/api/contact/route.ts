import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import Contact from "@/lib/database/models/contact.model";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new contact submission
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json(
      { message: "Message sent successfully", contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { message: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
