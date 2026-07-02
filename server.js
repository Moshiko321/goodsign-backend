require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const crypto = require("crypto");

const db = require("./db");
const { sendEmail } = require("./email");
const { sendSms } = require("./sms");
const { agreementTitle } = require("./agreementText");

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

const PORT = process.env.PORT || 3000;
const PUBLIC_URL = process.env.PUBLIC_URL || `http://localhost:${PORT}`;

app.get("/api/profile", (req, res) => {
  res.json(db.getProfile());
});
app.post("/api/profile", (req, res) => {
  res.json(db.saveProfile(req.body));
});

app.get("/api/clients", (req, res) => res.json(db.listClients()));
app.post("/api/clients", (req, res) => res.json(db.createClient(req.body)));
app.put("/api/clients/:id", (req, res) => res.json(db.updateClient(req.params.id, req.body)));
app.delete("/api/clients/:id", (req, res) => {
  db.deleteClient(req.params.id);
  res.json({ ok: true });
});

app.get("/api/properties", (req, res) => res.json(db.listProperties()));
app.post("/api/properties", (req, res) => res.json(db.createProperty(req.body)));
app.put("/api/properties/:id", (req, res) => res.json(db.updateProperty(req.params.id, req.body)));
app.delete("/api/properties/:id", (req, res) => {
  db.deleteProperty(req.params.id);
  res.json({ ok: true });
});

app.get("/api/agreements", (req, res) => res.json(db.listAgreements()));

app.get("/api/agreements/:id", (req, res) => {
  const a = db.getAgreement(req.params.id);
  if (!a) return res.status(404).json({ error: "not found" });
  res.json(a);
});

app.post("/api/agreements", async (req, res) => {
  const token = crypto.randomBytes(16).toString("hex");
  const agreement = db.createAgreement({ ...req.body, token });

  try {
    await notifyPartyOfNewAgreement(agreement);
    db.markSent(agreement.id);
  } catch (err) {
    console.error("Failed to send agreement notifications:", err.message);
  }

  res.json(db.getAgreement(agreement.id));
});

app.post("/api/agreements/:id/resend", async (req, res) => {
  const agreement = db.getAgreement(req.params.id);
  if (!agreement) return res.status(404).json({ error: "not found" });
  try {
    await notifyPartyOfNewAgreement(agreement);
    db.markSent(agreement.id);
  } catch (err) {
    console.error("Failed to resend agreement notifications:", err.message);
  }
  res.json(db.getAgreement(agreement.id));
});

app.delete("/api/agreements/:id", (req, res) => {
  db.deleteAgreement(req.params.id);
  res.json({ ok: true });
});

app.get("/api/sign/:token", (req, res) => {
  const agreement = db.getAgreementByToken(req.params.token);
  if (!agreement) return res.status(404).json({ error: "not found" });
  res.json({ agreement, profile: db.getProfile() });
});

app.post("/api/sign/:token", async (req, res) => {
  const agreement = db.getAgreementByToken(req.params.token);
  if (!agreement) return res.status(404).json({ error: "not found" });

  const { signatureDataUrl } = req.body;
  if (!signatureDataUrl) return res.status(400).json({ error: "signature required" });

  db.markSigned(agreement.id, signatureDataUrl);
  const signed = db.getAgreement(agreement.id);

  try {
    await notifyAgentOfSignature(signed);
  } catch (err) {
    console.error("Failed to email the agent about the signature:", err.message);
  }

  res.json(signed);
});

app.get("/sign/:token", (req, res) => {
  res.sendFile(path.join(__dirname, "sign.html"));
});

app.get(["/", "/dashboard"], (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

async function notifyPartyOfNewAgreement(agreement) {
  const profile = db.getProfile();
  const link = `${PUBLIC_URL}/sign/${agreement.token}`;
  const title = agreementTitle(agreement.type);

  const partyEmail = agreement.type === "cooperation" ? agreement.otherBroker?.email : agreement.client?.email;
  const partyPhone = agreement.type === "cooperation" ? agreement.otherBroker?.phone : agreement.client?.phone;
  const partyName = agreement.type === "cooperation" ? agreement.otherBroker?.name : agreement.client?.name;

  if (partyEmail) {
    await sendEmail({
      to: partyEmail,
      subject: `${profile.companyName || "Your broker"} sent you an agreement to sign`,
      html: `
        <p>Hi ${partyName || ""},</p>
        <p>${profile.agentName || profile.companyName || "Your broker"} has sent you a
        "<strong>${title}</strong>" (No. ${agreement.number}) to review and sign.</p>
        <p><a href="${link}" style="background:#1c2b45;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;display:inline-block;">Review &amp; sign</a></p>
        <p style="color:#777;font-size:13px;">Or copy this link into your browser: ${link}</p>
      `,
    });
  }

  if (partyPhone) {
    await sendSms({
      to: partyPhone,
      body: `${profile.companyName || "Your broker"} sent you a "${title}" to review and sign: ${link}`,
    });
  }

  if (!partyEmail && !partyPhone) {
    console.warn(`Agreement ${agreement.id} has no email or phone on file — nothing was sent.`);
  }
}

async function notifyAgentOfSignature(agreement) {
  const profile = db.getProfile();
  if (!profile.email) {
    console.warn("No agent email set in the profile — skipping signed-copy notification.");
    return;
  }
  const title = agreementTitle(agreement.type);
  const partyName = agreement.type === "cooperation" ? agreement.otherBroker?.name : agreement.client?.name;

  await sendEmail({
    to: profile.email,
    subject: `Signed: ${title} — No. ${agreement.number}`,
    html: `
      <p>${partyName || "The other party"} just signed "<strong>${title}</strong>" (No. ${agreement.number}).</p>
      <p>Signed at: ${new Date(agreement.signedAt).toLocaleString()}</p>
      <p>Their signature is attached as an image.</p>
    `,
    attachments: agreement.signatureDataUrl
      ? [{ filename: `signature-${agreement.number}.png`, content: agreement.signatureDataUrl.split(",")[1] }]
      : [],
  });
}

app.listen(PORT, () => {
  console.log(`GoodSign backend running at ${PUBLIC_URL}`);
  if (!process.env.RESEND_API_KEY) console.log("→ RESEND_API_KEY not set: emails will be logged, not sent.");
  if (!process.env.TWILIO_SID) console.log("→ TWILIO_SID not set: texts will be logged, not sent.");
});
