import { describe, expect, it } from "vitest";
import { marketingEligibilityMessage } from "@/lib/whatsapp-management/eligibility";

describe("marketing recipient eligibility feedback", () => {
  it("does not treat a saved contact as permission", () => {
    expect(marketingEligibilityMessage("marketing_consent_missing")).toContain("has not been recorded");
  });

  it.each(["marketing_consent_expired", "marketing_purpose_not_consented", "contact_suppressed", "contact_frequency_limit_reached", "template_not_approved", "unexpected"])("explains a blocked reason: %s", (reason) => {
    expect(marketingEligibilityMessage(reason)).not.toMatch(/^Eligible/);
  });
});
