function commissionText(a) {
  if (a.dealType === "rent") {
    return "A commission equal to one month's rent (100% of the agreed monthly rent), plus applicable tax";
  }
  return `${a.commissionPercent || 2}% of the final transaction price, plus applicable tax`;
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
    `Split of the total commission received on the transaction: ${split}% to the referring broker, and ${100 - split}% to the other broker (${a.otherBroker?.name || "Broker B"}).`,
    "Each broker is solely responsible to the client they introduced, and this agreement does not create a partnership, agency, or employment relationship between the brokers.",
    "The broker who collects the full commission from the parties to the transaction shall transfer the other broker's agreed share within 7 business days of receipt.",
    "This agreement applies only to the specific transaction on the property described above and does not constitute a general cooperation agreement between the parties.",
  ];
}

module.exports = { commissionText, agreementTitle, buildClauses };
