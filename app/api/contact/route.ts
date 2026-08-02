import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactNotification } from "@/lib/email";
import { relayLeadToNgf } from "@/lib/ngf-lead";

const contactSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  topic: z.string().max(60).optional(),
  message: z.string().max(5000).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Please complete the required fields." }, { status: 400 });
    }

    // Persist FIRST, to the central NGF lead store, so the enquiry is recorded
    // even if the notification email fails. It also appears in the client's
    // portal under Form Submissions. Additive — the email below is unchanged.
    await relayLeadToNgf("contact", parsed.data);

    await sendContactNotification(parsed.data);

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("Contact submission error", error);
    return NextResponse.json({ message: "We could not submit your request. Please try again." }, { status: 500 });
  }
}
