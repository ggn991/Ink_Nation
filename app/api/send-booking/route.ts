import { NextResponse } from "next/server";
import { createTransporter, renderBookingTemplate, BookingEmailData } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingData, attachment } = body;

    const data: BookingEmailData = bookingData;
    const recipient = process.env.RECIPIENT_EMAIL;
    const sender = process.env.SMTP_USER;

    const transporter = createTransporter();

    const hasAttachment = Boolean(attachment && attachment.content);
    const htmlContent = renderBookingTemplate(data, hasAttachment);

    const attachmentsList = [];
    if (hasAttachment) {
      // Remove base64 data prefix if present (e.g. data:image/png;base64,...)
      const base64Clean = attachment.content.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Clean, "base64");

      attachmentsList.push({
        filename: attachment.filename || "reference-image.png",
        content: imageBuffer,
        contentType: attachment.contentType || "image/png",
      });
    }

    await transporter.sendMail({
      from: `"Ink Nation Studio" <${sender}>`,
      to: recipient,
      replyTo: data.email,
      subject: `🔥 [New Booking Request] ${data.name} - ${data.service} (${data.branch.toUpperCase()})`,
      html: htmlContent,
      attachments: attachmentsList,
    });

    return NextResponse.json({ success: true, message: "Booking email sent successfully." });
  } catch (error: any) {
    console.error("Error sending booking email:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send booking email." },
      { status: 500 }
    );
  }
}
