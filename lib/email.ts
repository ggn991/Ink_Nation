import nodemailer from "nodemailer";

export interface EmailAttachment {
  filename: string;
  content: string; // base64 string
  contentType?: string;
}

export const createTransporter = () => {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP credentials are missing in environment variables.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: {
      user,
      pass,
    },
  });
};

export interface ConsultationEmailData {
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  branch: string;
  service: string;
  project: string;
}

export const renderConsultationTemplate = (data: ConsultationEmailData) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ink Nation - Consultation Enquiry</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #ffffff;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050505; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0d0d0d; border: 1px solid #1f1f1f; border-radius: 16px; overflow: hidden; box-shadow: 0 0 30px rgba(0, 240, 255, 0.08);">
                
                <!-- Header Banner -->
                <tr>
                  <td style="padding: 32px 32px 24px 32px; background: linear-gradient(180deg, #111111 0%, #0d0d0d 100%); border-bottom: 1px solid #1a1a1a; text-align: center;">
                    <div style="font-size: 22px; font-weight: 800; tracking-spacing: 4px; color: #ffffff; text-transform: uppercase;">
                      INK <span style="color: #00f0ff;">NATION</span>
                    </div>
                    <div style="font-size: 10px; font-weight: 600; letter-spacing: 3px; color: #00f0ff; text-transform: uppercase; margin-top: 8px;">
                      ⚡ NEW CONSULTATION ENQUIRY
                    </div>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 32px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      
                      <!-- Item Row -->
                      <tr>
                        <td style="padding-bottom: 16px; border-bottom: 1px solid #1a1a1a;">
                          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">FULL NAME</span>
                          <span style="font-size: 15px; font-weight: 500; color: #ffffff;">${data.name}</span>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid #1a1a1a;">
                          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">CONTACT DETAILS</span>
                          <div style="font-size: 14px; color: #e4e4e7; margin-bottom: 2px;">📧 <a href="mailto:${data.email}" style="color: #00f0ff; text-decoration: none;">${data.email}</a></div>
                          <div style="font-size: 14px; color: #e4e4e7; margin-bottom: 2px;">📞 <a href="tel:${data.phone}" style="color: #00f0ff; text-decoration: none;">${data.phone}</a></div>
                          ${data.instagram ? `<div style="font-size: 14px; color: #a1a1aa;">📸 @${data.instagram.replace("@", "")}</div>` : ""}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid #1a1a1a;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td width="50%">
                                <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">PREFERRED STUDIO</span>
                                <span style="font-size: 14px; font-weight: 600; color: #00f0ff; text-transform: uppercase;">${data.branch}</span>
                              </td>
                              <td width="50%">
                                <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">SERVICE</span>
                                <span style="font-size: 14px; font-weight: 600; color: #ffffff; text-transform: uppercase;">${data.service}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding-top: 16px;">
                          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; display: block; margin-bottom: 6px;">PROJECT IDEA & NOTES</span>
                          <div style="font-size: 13px; font-weight: 300; line-height: 1.6; color: #d4d4d8; background-color: #141414; padding: 14px; border-radius: 8px; border: 1px solid #27272a; white-space: pre-wrap;">${data.project || "No additional notes provided."}</div>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 32px; background-color: #080808; border-top: 1px solid #1a1a1a; text-align: center;">
                    <span style="font-size: 10px; color: #52525b; text-transform: uppercase; letter-spacing: 2px;">
                      INK NATION TATTOO STUDIO &copy; ${new Date().getFullYear()}
                    </span>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

export interface BookingEmailData {
  branch: string;
  service: string;
  placement?: string;
  notes?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  referenceImageName?: string;
}

export const renderBookingTemplate = (data: BookingEmailData, hasAttachment: boolean) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ink Nation - New Booking Request</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #ffffff;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050505; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0d0d0d; border: 1px solid #1f1f1f; border-radius: 16px; overflow: hidden; box-shadow: 0 0 30px rgba(0, 240, 255, 0.1);">
                
                <!-- Header Banner -->
                <tr>
                  <td style="padding: 32px 32px 24px 32px; background: linear-gradient(180deg, #111111 0%, #0d0d0d 100%); border-bottom: 1px solid #1a1a1a; text-align: center;">
                    <div style="font-size: 22px; font-weight: 800; letter-spacing: 4px; color: #ffffff; text-transform: uppercase;">
                      INK <span style="color: #00f0ff;">NATION</span>
                    </div>
                    <div style="font-size: 10px; font-weight: 600; letter-spacing: 3px; color: #00f0ff; text-transform: uppercase; margin-top: 8px;">
                      🔥 NEW APPOINTMENT BOOKING
                    </div>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 32px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      
                      <!-- Customer Info -->
                      <tr>
                        <td style="padding-bottom: 16px; border-bottom: 1px solid #1a1a1a;">
                          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">CLIENT DETAILS</span>
                          <div style="font-size: 16px; font-weight: 600; color: #ffffff; margin-bottom: 4px;">${data.name}</div>
                          <div style="font-size: 13px; color: #e4e4e7;">📧 <a href="mailto:${data.email}" style="color: #00f0ff; text-decoration: none;">${data.email}</a></div>
                          <div style="font-size: 13px; color: #e4e4e7;">📞 <a href="tel:${data.phone}" style="color: #00f0ff; text-decoration: none;">${data.phone}</a></div>
                        </td>
                      </tr>

                      <!-- Booking Info Grid -->
                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid #1a1a1a;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td width="50%" style="vertical-align: top;">
                                <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">STUDIO BRANCH</span>
                                <span style="font-size: 14px; font-weight: 600; color: #00f0ff; text-transform: uppercase;">${data.branch}</span>
                              </td>
                              <td width="50%" style="vertical-align: top;">
                                <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">SERVICE TYPE</span>
                                <span style="font-size: 14px; font-weight: 600; color: #ffffff; text-transform: uppercase;">${data.service}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Date & Time Grid -->
                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid #1a1a1a;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td width="50%" style="vertical-align: top;">
                                <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">SCHEDULED DATE</span>
                                <span style="font-size: 14px; font-weight: 600; color: #ffffff;">📅 ${data.date}</span>
                              </td>
                              <td width="50%" style="vertical-align: top;">
                                <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">TIME SLOT</span>
                                <span style="font-size: 14px; font-weight: 600; color: #00f0ff;">⏰ ${data.time}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      ${data.placement ? `
                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid #1a1a1a;">
                          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">PLACEMENT AREA</span>
                          <span style="font-size: 14px; font-weight: 500; color: #ffffff;">📍 ${data.placement}</span>
                        </td>
                      </tr>
                      ` : ""}

                      <!-- Concept Notes / Learning Goals -->
                      <tr>
                        <td style="padding-top: 16px;">
                          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; display: block; margin-bottom: 6px;">
                            ${data.service.toLowerCase().includes("academy") ? "LEARNING GOALS & PRIOR EXPERIENCE" : "CONCEPT DESCRIPTION & NOTES"}
                          </span>
                          <div style="font-size: 13px; font-weight: 300; line-height: 1.6; color: #d4d4d8; background-color: #141414; padding: 14px; border-radius: 8px; border: 1px solid #27272a; white-space: pre-wrap;">${data.notes || "No additional notes specified."}</div>
                        </td>
                      </tr>

                      ${hasAttachment ? `
                      <tr>
                        <td style="padding-top: 16px;">
                          <div style="font-size: 11px; font-weight: 600; color: #00f0ff; background-color: rgba(0,240,255,0.08); border: 1px solid rgba(0,240,255,0.2); padding: 10px; border-radius: 8px; text-align: center;">
                            📎 REFERENCE IMAGE ATTACHED: <strong>${data.referenceImageName || "Attached Image"}</strong>
                          </div>
                        </td>
                      </tr>
                      ` : ""}

                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 32px; background-color: #080808; border-top: 1px solid #1a1a1a; text-align: center;">
                    <span style="font-size: 10px; color: #52525b; text-transform: uppercase; letter-spacing: 2px;">
                      INK NATION TATTOO STUDIO &copy; ${new Date().getFullYear()}
                    </span>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
