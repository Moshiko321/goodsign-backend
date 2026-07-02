const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const FILE = path.join(__dirname, "data.json");
const uid = () => crypto.randomBytes(6).toString("hex");

function loadState() {
  if (!fs.existsSync(FILE)) {
    return { profile: {}, clients: [], properties: [], agreements: [] };
  }
  try {
    const raw = JSON.parse(fs.readFileSync(FILE, "utf8"));
    return {
      profile: raw.profile || {},
      clients: raw.clients || [],
      properties: raw.properties || [],
      agreements: raw.agreements || [],
    };
  } catch (e) {
    console.error("Could not read data.json, starting fresh:", e.message);
    return { profile: {}, clients: [], properties: [], agreements: [] };
  }
}

let state = loadState();

function persist() {
  fs.writeFileSync(FILE, JSON.stringify(state, null, 2));
}

function getProfile() {
  return { companyName: "", agentName: "", license: "", phone: "", email: "", ...state.profile };
}
function saveProfile(p) {
  state.profile = {
    companyName: p.companyName || "",
    agentName: p.agentName || "",
    license: p.license || "",
    phone: p.phone || "",
    email: p.email || "",
  };
  persist();
  return getProfile();
}

function listClients() {
  return state.clients;
}
function createClient(c) {
  const client = { id: uid(), name: c.name || "", phone: c.phone || "", email: c.email || "" };
  state.clients.unshift(client);
  persist();
  return client;
}
function updateClient(id, c) {
  state.clients = state.clients.map((x) => (x.id === id ? { ...x, ...c, id } : x));
  persist();
  return state.clients.find((x) => x.id === id);
}
function deleteClient(id) {
  state.clients = state.clients.filter((x) => x.id !== id);
  persist();
}

function listProperties() {
  return state.properties;
}
function createProperty(p) {
  const property = { id: uid(), address: p.address || "", city: p.city || "", price: Number(p.price) || 0 };
  state.properties.unshift(property);
  persist();
  return property;
}
function updateProperty(id, p) {
  state.properties = state.properties.map((x) =>
    x.id === id ? { ...x, ...p, price: Number(p.price) || 0, id } : x
  );
  persist();
  return state.properties.find((x) => x.id === id);
}
function deleteProperty(id) {
  state.properties = state.properties.filter((x) => x.id !== id);
  persist();
}

function hydrate(a) {
  if (!a) return null;
  const client = a.clientId ? state.clients.find((c) => c.id === a.clientId) || null : null;
  const properties = (a.propertyIds || [])
    .map((pid) => state.properties.find((p) => p.id === pid))
    .filter(Boolean);
  return { ...a, client, properties };
}

function createAgreement(a) {
  const agreement = {
    id: uid(),
    number: state.agreements.length + 1,
    type: a.type,
    dealType: a.dealType || "sale",
    commissionPercent: a.commissionPercent || 2,
    exclusive: !!a.exclusive,
    exclusiveMonths: a.exclusiveMonths || 6,
    splitPercent: a.splitPercent ?? 50,
    otherBroker: a.otherBroker || null,
    clientId: a.clientId || null,
    propertyIds: a.propertyIds || [],
    notes: a.notes || "",
    status: "draft",
    token: a.token,
    signatureDataUrl: null,
    createdAt: Date.now(),
    sentAt: null,
    signedAt: null,
  };
  state.agreements.unshift(agreement);
  persist();
  return getAgreement(agreement.id);
}

function getAgreement(id) {
  return hydrate(state.agreements.find((a) => a.id === id));
}
function getAgreementByToken(token) {
  return hydrate(state.agreements.find((a) => a.token === token));
}
function listAgreements() {
  return [...state.agreements].sort((a, b) => b.createdAt - a.createdAt).map(hydrate);
}
function markSent(id) {
  const a = state.agreements.find((x) => x.id === id);
  if (a && a.status !== "signed") {
    a.status = "sent";
    a.sentAt = Date.now();
    persist();
  }
}
function markSigned(id, signatureDataUrl) {
  const a = state.agreements.find((x) => x.id === id);
  if (a) {
    a.status = "signed";
    a.signatureDataUrl = signatureDataUrl;
    a.signedAt = Date.now();
    persist();
  }
}
function deleteAgreement(id) {
  state.agreements = state.agreements.filter((a) => a.id !== id);
  persist();
}

module.exports = {
  getProfile, saveProfile,
  listClients, createClient, updateClient, deleteClient,
  listProperties, createProperty, updateProperty, deleteProperty,
  listAgreements, createAgreement, getAgreement, getAgreementByToken, markSent, markSigned, deleteAgreement,
};
