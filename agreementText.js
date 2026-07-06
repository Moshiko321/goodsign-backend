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
      `Η περιγραφή των ως άνω ακινήτων παραδόθηκε στον μεσίτη από τον διαχειριστή τους και δεν έχει διενεργηθεί εκ μέρους του μεσίτη κανένας νομικός ή τεχνικός έλεγχος επ' αυτών, ούτε έχει εξακριβωθεί η ορθότητα του αριθμού των θέσεων στάθμευσης και των αποθηκών ή η αντιστοίχισή τους σε συγκεκριμένο διαμέρισμα.<br/><br/><em>The description of the above properties was provided to the broker by their manager, and the broker has not carried out any legal or technical inspection of them, nor verified the accuracy of the number of parking spaces or storage units, or their correspondence to a specific apartment.</em>`,
      `Σε περίπτωση που καταρτιστεί σύμβαση μεταβίβασης ή μίσθωσης όλων ή κάποιων εκ των ως άνω περιγραφομένων ακινήτων, μεταξύ του/της εντολέως ή άλλου φυσικού ή νομικού προσώπου συνδεδεμένου με αυτόν/αυτή και του πωλητή, εκμισθωτή, ιδιοκτήτη ή άλλου συνδεδεμένου προσώπου, ή σε κάθε άλλη περίπτωση κατάρτισης κύριας σύμβασης πώλησης ή μίσθωσης σε συνέχεια της υπόδειξης, ο/η εντολέας υποχρεούται να καταβάλει, ατομικά και αλληλεγγύως και εις ολόκληρον με όσους στο όνομά τους καταρτιστεί η κύρια σύμβαση, την αμοιβή: ${ct}.<br/><br/><em>Should the client, or another person or entity connected to them, enter into a sale or lease agreement concerning one or more of the properties listed above with the seller, landlord, owner, or a party connected to them — or should any other main sale or lease contract be concluded following this introduction — the client shall be liable, individually and jointly and severally with any party in whose name the main contract is concluded, to pay the agreed fee: ${ct}.</em>`,
      `Τα μέρη θεωρούν την αμοιβή αυτή εύλογη, δίκαιη και όχι υπέρμετρη, ανταποκρινόμενη στις παρεχόμενες υπηρεσίες του μεσίτη. Ο/Η εντολέας υποχρεούται να την καταβάλει κατά την ημέρα υπογραφής του συμβολαίου αγοραπωλησίας ή της μίσθωσης, ακόμη κι αν αυτό υπογραφεί με αναβλητική ή διαλυτική αίρεση ή πιστωθεί μέρος του τιμήματος, ενώ συναινεί στην κατάρτιση σύμβασης μεσιτείας μεταξύ του μεσίτη και του αντισυμβαλλομένου.<br/><br/><em>The parties consider this fee reasonable, fair, and proportionate to the services provided by the broker. The client is obligated to pay it on the day the sale or lease contract is signed, even if signed subject to a suspensive or resolutory condition, or if part of the price is financed, and consents to the broker entering into a brokerage agreement with the other contracting party.</em>`,
      `Ο/Η εντολέας δεσμεύεται να μην έλθει σε οποιαδήποτε απευθείας συνεννόηση, διαπραγμάτευση ή συμφωνία με τον πωλητή/εκμισθωτή των ανωτέρω ακινήτων ή με άλλο ενδιάμεσο πρόσωπο, με σκοπό την αγορά ή μίσθωσή τους. Σε αντίθετη περίπτωση οφείλει στον μεσίτη ποινική ρήτρα ίση με το 2% της αξίας της αγοραπωλησίας ή με ένα (1) μηνιαίο μίσθωμα, αντίστοιχα.<br/><br/><em>The client undertakes not to enter into any direct communication, negotiation, or agreement with the seller/landlord of the above properties, or with any other intermediary, for the purpose of purchasing or leasing them. Otherwise, the client shall owe the broker a penalty equal to 2% of the sale value, or one (1) month's rent, respectively.</em>`,
      `Ο/Η εντολέας δηλώνει ότι έλαβε γνώση πως ο μεσίτης τηρεί τα προσωπικά του/της στοιχεία σύμφωνα με τον Ευρωπαϊκό Κανονισμό 2016/679 (GDPR) και συναινεί στην κοινοποίησή τους για τον σκοπό της παρούσας σύμβασης. Ο μεσίτης δεσμεύεται να χρησιμοποιεί τα στοιχεία αυτά μόνο για τον σκοπό αυτό και δηλώνει ότι διατηρεί κατάλληλες συμφωνίες εμπιστευτικότητας με τους συνεργάτες του.<br/><br/><em>The client acknowledges that the broker processes their personal data in accordance with EU Regulation 2016/679 (GDPR) and consents to its disclosure for the purpose of this agreement. The broker undertakes to use this data only for that purpose and confirms it maintains appropriate confidentiality agreements with its associates.</em>`,
      `Ο/Η εντολέας δεσμεύεται να ενημερώσει τον μεσίτη τουλάχιστον τρεις (3) εργάσιμες ημέρες πριν την υπογραφή του συμβολαίου αγοραπωλησίας, ώστε ο μεσίτης να δηλώσει τη διαμεσολάβησή του και να λάβει το σχετικό παραστατικό αμοιβής. Σε αντίθετη περίπτωση, ο/η εντολέας ευθύνεται για κάθε ζημία που θα προκληθεί στον μεσίτη από την παράλειψη αυτή.<br/><br/><em>The client undertakes to notify the broker at least three (3) business days before signing the sale contract, so the broker can formally record their mediation and issue the corresponding invoice for their fee. Otherwise, the client shall be liable for any damage caused to the broker by this omission.</em>`,
      `Η παρούσα εντολή χορηγείται για αόριστο χρονικό διάστημα και μπορεί να τροποποιηθεί μόνο εγγράφως. Ως «υπόδειξη» νοείται κάθε ενέργεια του μεσίτη χωρίς την οποία ο/η εντολέας δεν θα ήταν σε θέση να συμβληθεί για την απόκτηση των ανωτέρω ακινήτων.<br/><br/><em>This mandate is granted for an indefinite period and may only be amended in writing. "Introduction" means any action of the broker without which the client would not have been able to contract for the acquisition of the above properties.</em>`,
      `Η παρούσα εντολή διέπεται από τις σχετικές διατάξεις του ν. 4072/2012, τα άρθρα 703 επ. ΑΚ και την παρ. 1 του άρθρου 2 του Π.Δ. 248/1993. Αμφότερα τα μέρη παραιτούνται από κάθε δικαίωμα διάρρηξης, ακύρωσης ή προσβολής της παρούσας, καθώς και από κάθε σχετική αγωγή ή ένσταση.<br/><br/><em>This mandate is governed by the relevant provisions of Law 4072/2012, Articles 703 et seq. of the Greek Civil Code, and paragraph 1 of Article 2 of Presidential Decree 248/1993. Both parties waive any right to rescind, annul, or otherwise challenge this agreement, as well as any related claim or objection.</em>`,
      `Η παρούσα σύμβαση διέπεται από το Ελληνικό Δίκαιο και αρμόδια για την επίλυση οποιασδήποτε διαφοράς είναι τα Δικαστήρια Αθηνών.<br/><br/><em>This agreement is governed by Greek law, and the courts of Athens shall have exclusive jurisdiction over any dispute arising from it.</em>`,
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
