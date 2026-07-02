const twilio = require("twilio");

const client =
  process.env.TWILIO_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

async function sendSms({ to, body }) {
  if (!to) return;
  if (!client) {
    console.log("\n[sms · DRY RUN — set TWILIO_SID / TWILIO_AUTH_TOKEN in .env to actually send]");
    console.log("  to:", to);
    console.log("  body:", body);
    return;
  }
  await client.messages.create({ to, from: process.env.TWILIO_FROM, body });
}

module.exports = { sendSms };
