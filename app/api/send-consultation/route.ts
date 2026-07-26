import { NextResponse } from "next/server";
import { createTransporter, renderConsultationTemplate, ConsultationEmailData } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body: ConsultationEmailData = await request.json();

    const recipient = process.env.RECIPIENT_EMAIL;
    const sender = process.env.SMTP_USER;

    const transporter = createTransporter();

    const htmlContent = renderConsultationTemplate(body);

    await transporter.sendMail({
      from: `"Ink Nation Studio" <${sender}>`,
      to: recipient,
      replyTo: body.email,
      subject: `⚡ [Consultation Enquiry] ${body.name} - ${body.service} (${body.branch.toUpperCase()})`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: "Consultation email sent successfully." });
  } catch (error: any) {
    console.error("Error sending consultation email:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send consultation email." },
      { status: 500 }
    );
  }
}
