const explanations: Record<string, string> = {
  eligible: "Eligible for this marketing purpose. Eligibility is checked again when sending.",
  contact_not_registered: "Add this contact to the channel first.",
  contact_suppressed: "This contact is suppressed or disabled. Adding it again cannot reactivate it.",
  marketing_consent_missing: "Marketing permission has not been recorded for this contact.",
  marketing_consent_expired: "This contact's marketing permission has expired.",
  marketing_purpose_not_consented: "The recorded permission does not cover this marketing purpose.",
  contact_frequency_limit_reached: "This contact has reached the daily marketing limit.",
  template_not_approved: "This template is not currently approved for this channel.",
  meta_channel_not_active: "This WhatsApp channel is not active.",
};

export function marketingEligibilityMessage(reason: string): string {
  return explanations[reason] || "This message is not eligible for sending.";
}
