<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Review &amp; sign your agreement</title>
<style>
  :root {
    --ink: #1c2b45; --ink-soft: #33456a; --paper: #f6f4ee; --line: #ddd6c6;
    --seal: #a8752c; --teal: #0e6b5c; --text-muted: #756c5c;
  }
  * { box-sizing: border-box; }
  body { margin:0; background:#ece7da; font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: var(--ink); }
  .wrap { max-width: 620px; margin: 24px auto; padding: 0 16px 60px; }
  .banner { background: var(--ink); color:#f3ead3; text-align:center; font-size:12.5px; padding:8px; border-radius:8px; margin-bottom:14px; }
  .card { background:#fff; border:1px solid var(--line); border-radius:16px; padding:26px; }
  .letterhead { display:flex; justify-content:space-between; align-items:flex-start; padding-bottom:16px; border-bottom:1px solid var(--line); margin-bottom:18px; gap:10px; }
  .brand { display:flex; gap:12px; align-items:center; }
  .seal { width:34px; height:34px; border-radius:50%; background:var(--seal); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; flex-shrink:0; }
  .company { font-weight:700; font-size:15px; }
  .agentline { font-size:12.5px; color:var(--text-muted); }
  .meta { text-align:right; font-size:12.5px; color:var(--text-muted); line-height:1.7; }
  h2 { font-size:20px; margin:0 0 4px; }
  .num { font-size:12.5px; color:var(--text-muted); margin-bottom:16px; }
  .stamp { display:inline-block; padding:6px 14px; border:2px dashed var(--teal); color:var(--teal); border-radius:999px; font-size:11px; font-weight:700; transform:rotate(-6deg); }
  .party { background:var(--paper); border-radius:10px; padding:12px 14px; margin-bottom:16px; }
  .party .label { font-size:11.5px; text-transform:uppercase; letter-spacing:.05em; color:var(--text-muted); }
  .party .name { font-weight:700; font-size:15px; }
  table { width:100%; border-collapse:collapse; margin-bottom:18px; font-size:13.5px; }
  th, td { border:1px solid var(--line); padding:8px 10px; text-align:left; }
  th { background:var(--paper); }
  ol.clauses { padding-left:20px; display:flex; flex-direction:column; gap:10px; font-size:14.5px; line-height:1.7; color:var(--ink-soft); }
  .sign-area { border-top:1px dashed var(--line); padding-top:18px; margin-top:18px; }
  .checkbox-row { display:flex; align-items:center; gap:8px; font-size:14px; margin-bottom:14px; }
  canvas { width:100%; max-width:420px; height:150px; background:#fff; border:1px dashed var(--line); border-radius:10px; touch-action:none; cursor:crosshair; display:block; margin-bottom:8px; }
  button { font-family:inherit; font-size:14px; font-weight:600; border-radius:10px; padding:11px 18px; cursor:pointer; border:1px solid transparent; }
  .btn-primary { background:var(--ink); color:#fff; }
  .btn-primary:disabled { opacity:.4; cursor:not-allowed; }
  .btn-ghost { background:transparent; border-color:var(--line); color:var(--ink); margin-inline-start:8px; }
  .success { text-align:center; padding:10px 0; }
  .success img { max-width:260px; max-height:100px; margin-top:10px; }
  .checkicon { width:46px; height:46px; border-radius:50%; background:#e0efec; color:var(--teal); display:flex; align-items:center; justify-content:center; margin:0 auto 10px; font-size:22px; }
  .loading, .error { text-align:center; padding:60px 20px; color:var(--text-muted); }
</style>
</head>
<body>
  <div class="wrap">
    <div class="banner">You've been sent an agreement to review and sign</div>
    <div id="app" class="card"><div class="loading">Loading agreement…</div></div>
  </div>

<script>
const token = location.pathname.split("/").filter(Boolean).pop();
let signatureDataUrl = null;

function commissionText(a) {
  if (a.dealType === "rent") return "A commission equal to one month's rent (100% of the agreed monthly rent), plus applicable tax";
  return (a.commissionPercent || 2) + "% of the final transaction price, plus applicable tax";
}
function agreementTitle(type) {
  if (type === "interested") return "Brokerage Engagement – Prospective Buyer/Tenant";
  if (type === "owner") return "Listing Agreement – Sale / Rental";
  return "Broker Co-operation Agreement";
}
function buildClauses(a) {
  const ct = commissionText(a);
  if (a.type === "interested") {
    return [
      `The client requests the broker's assistance in locating and brokering a property/properties for the purpose of ${a.dealType === "rent" ? "rental" : "purchase"}, including the property/properties listed above.`,
      "The client acknowledges that the property/properties above were introduced by the broker, and understands they may not deal directly with the seller/landlord, or through another broker, regarding these properties without notifying the broker.",
      "Should the client, or anyone acting on their behalf, enter into a transaction concerning one or more of the properties listed above within 12 months of signing this agreement, the client shall owe the broker a commission as detailed below, even if the transaction was concluded without the broker's direct involvement.",
      `Commission rate: ${ct}.`,
      "The commission is due immediately upon signing a sale/lease agreement between the parties, or upon any other binding commitment to complete the transaction, whichever occurs first.",
      "The client agrees to keep the details of the property/properties provided by the broker confidential and not to disclose them to any third party.",
      "The absence of a written transaction agreement, or wording that differs from what was agreed, does not affect the broker's right to a commission, provided the conditions above are met.",
      "This agreement binds only the broker and the client, and does not obligate any third party.",
    ];
  }
  if (a.type === "owner") {
    const excl = a.exclusive
      ? `The parties agree that the broker will act as the exclusive listing broker for this property for a period of ${a.exclusiveMonths || 6} months from the date this agreement is signed.`
      : "The broker will work to locate potential buyers/tenants for the property, without this granting exclusive marketing rights.";
    return [
      "The property owner engages the broker to market the property described above for sale/rental and to provide brokerage services.",
      "The property owner represents that they are the lawful owner of the property, and/or are duly authorized by the owner to enter into this agreement.",
      excl,
      `Commission rate: ${ct}, payable by the property owner immediately upon signing a sale/lease agreement with a buyer/tenant introduced by the broker.`,
      "The property owner agrees to forward to the broker any inquiry received regarding the property, and to inform any interested party that the property is being marketed by the broker.",
      "Should the owner withdraw from a transaction after the broker has introduced a potential buyer/tenant interested in the property on the proposed terms, this shall not affect the broker's right to a commission.",
      "The property owner authorizes the broker to advertise the property through the broker's usual marketing channels, including listing an approximate address only unless otherwise agreed.",
    ];
  }
  const split = a.splitPercent ?? 50;
  return [
    "The undersigned brokers agree to cooperate on the property described above, with each broker representing a different party to the transaction.",
    `Split of the total commission received on the transaction: ${split}% to the referring broker, and ${100 - split}% to the other broker (${(a.otherBroker && a.otherBroker.name) || "Broker B"}).`,
    "Each broker is solely responsible to the client they introduced, and this agreement does not create a partnership, agency, or employment relationship between the brokers.",
    "The broker who collects the full commission from the parties to the transaction shall transfer the other broker's agreed share within 7 business days of receipt.",
    "This agreement applies only to the specific transaction on the property described above and does not constitute a general cooperation agreement between the parties.",
  ];
}
function money(n) {
  if (n === undefined || n === null || n === "") return "—";
  return "$" + Number(n).toLocaleString("en-US");
}
function initials(str) { return str ? str.trim().slice(0,1).toUpperCase() : "M"; }

async function load() {
  const res = await fetch(`/api/sign/${token}`);
  if (!res.ok) {
    document.getElementById("app").innerHTML = '<div class="error">This link is invalid or has expired.</div>';
    return;
  }
  const { agreement, profile } = await res.json();
  render(agreement, profile);
}

function render(a, profile) {
  const already = a.status === "signed";
  const partyName = a.type === "cooperation" ? (a.otherBroker && a.otherBroker.name) : (a.client && a.client.name);
  const propsHtml = (a.properties || []).length ? `
    <table>
      <thead><tr><th>Property address</th><th>Asking price</th></tr></thead>
      <tbody>
        ${a.properties.map(p => `<tr><td>${p.address}${p.city ? ", " + p.city : ""}</td><td>${money(p.price)}</td></tr>`).join("")}
      </tbody>
    </table>` : "";

  const clauses = buildClauses(a).map(c => `<li>${c}</li>`).join("");

  document.getElementById("app").innerHTML = `
    <div class="letterhead">
      <div class="brand">
        <div class="seal">${initials(profile.companyName)}</div>
        <div>
          <div class="company">${profile.companyName || "My Brokerage"}</div>
          ${profile.agentName ? `<div class="agentline">${profile.agentName}</div>` : ""}
        </div>
      </div>
      <div class="meta">
        ${profile.license ? `<div>License No.: ${profile.license}</div>` : ""}
        ${profile.phone ? `<div>Phone: ${profile.phone}</div>` : ""}
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
      <div>
        <h2>${agreementTitle(a.type)}</h2>
        <div class="num">No. ${a.number}</div>
      </div>
      <span class="stamp">${already ? "Signed" : "Awaiting signature"}</span>
    </div>
    ${a.client ? `<div class="party"><div class="label">Client</div><div class="name">${a.client.name}</div></div>` : ""}
    ${propsHtml}
    <ol class="clauses">${clauses}</ol>
    <div id="signBlock"></div>
  `;

  const block = document.getElementById("signBlock");
  if (already) {
    block.innerHTML = `
      <div class="success">
        <div class="checkicon">✓</div>
        <p>This agreement has already been signed.</p>
        ${a.signatureDataUrl ? `<img src="${a.signatureDataUrl}" alt="Signature" />` : ""}
      </div>`;
    return;
  }

  block.innerHTML = `
    <div class="sign-area">
      <label class="checkbox-row"><input type="checkbox" id="agree" /> I've read and agree to the terms of this agreement</label>
      <p style="font-size:13.5px;font-weight:600;margin-bottom:6px;">Signature:</p>
      <canvas id="pad" width="420" height="150"></canvas>
      <button class="btn-ghost" id="clearBtn" type="button">Clear signature</button>
      <div style="margin-top:16px;">
        <button class="btn-primary" id="submitBtn" disabled>Confirm &amp; sign</button>
      </div>
    </div>
  `;
  setupPad();
}

function setupPad() {
  const canvas = document.getElementById("pad");
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = 2.4; ctx.lineCap = "round"; ctx.strokeStyle = "#1c2b45";
  let drawing = false, hasInk = false;

  function pos(e) {
    const rect = canvas.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: p.clientX - rect.left, y: p.clientY - rect.top };
  }
  function start(e) { e.preventDefault(); drawing = true; const { x, y } = pos(e); ctx.beginPath(); ctx.moveTo(x, y); }
  function move(e) {
    if (!drawing) return; e.preventDefault();
    const { x, y } = pos(e); ctx.lineTo(x, y); ctx.stroke(); hasInk = true;
  }
  function end() {
    if (!drawing) return; drawing = false;
    if (hasInk) { signatureDataUrl = canvas.toDataURL("image/png"); updateSubmit(); }
  }
  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", move);
  canvas.addEventListener("mouseup", end);
  canvas.addEventListener("mouseleave", end);
  canvas.addEventListener("touchstart", start);
  canvas.addEventListener("touchmove", move);
  canvas.addEventListener("touchend", end);

  document.getElementById("clearBtn").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasInk = false; signatureDataUrl = null; updateSubmit();
  });
  document.getElementById("agree").addEventListener("change", updateSubmit);
  document.getElementById("submitBtn").addEventListener("click", submit);

  function updateSubmit() {
    const agree = document.getElementById("agree").checked;
    document.getElementById("submitBtn").disabled = !(agree && signatureDataUrl);
  }
}

async function submit() {
  const btn = document.getElementById("submitBtn");
  btn.disabled = true; btn.textContent = "Sending…";
  const res = await fetch(`/api/sign/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ signatureDataUrl }),
  });
  if (!res.ok) {
    btn.disabled = false; btn.textContent = "Confirm & sign";
    alert("Something went wrong — please try again.");
    return;
  }
  document.getElementById("signBlock").innerHTML = `
    <div class="success">
      <div class="checkicon">✓</div>
      <p>Agreement signed successfully! A signed copy has been sent to the broker.</p>
      <img src="${signatureDataUrl}" alt="Signature" />
    </div>`;
}

load();
</script>
</body>
</html>
