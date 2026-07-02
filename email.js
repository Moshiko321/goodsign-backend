const { Resend } = require("resend");

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.EMAIL_FROM || "GoodSign <onboarding@resend.dev>";

async function sendEmail({ to, subject, html, attachments = [] }) {
  if (!to) return;
  if (!resend) {
    console.log("\n[email · DRY RUN — set RESEND_API_KEY in .env to actually send]");
    console.log("  to:", to);
    console.log("  subject:", subject);
    return;
  }
  await resend.emails.send({ from: FROM, to, subject, html, attachments });
}

module.exports = { sendEmail };
