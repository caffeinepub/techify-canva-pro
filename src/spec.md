# Techify Canva Pro - Meta Pixel Integration Fix

## Current State

**Meta Pixel Installation:**
- Meta Pixel code exists in `index.html` with WRONG Pixel ID: `1611219826854076`
- PageView event fires on all pages
- Noscript fallback is present

**Purchase Tracking (ThankYouPage.tsx):**
- Purchase event fires with HARDCODED value of 299
- Uses sessionStorage to prevent duplicate tracking on refresh
- Does not capture actual payment amount from Razorpay

**Payment Flow:**
- 3 Razorpay payment buttons with IDs:
  - Monthly (₹49): `pl_SItIRZSgxWFNjq`
  - Yearly (₹299): `pl_SIrXp6zPDOixDu`
  - Reseller (₹699): `pl_SItKXEzqislZKZ`
- Razorpay redirects to `/thank-you` page after successful payment
- No amount data is currently passed to thank you page

## Requested Changes (Diff)

### Modify

1. **index.html** - Fix Meta Pixel ID
   - Change from `1611219826854076` to `1611219726854076`
   - Ensure single instance across all pages
   - Maintain PageView tracking

2. **ThankYouPage.tsx** - Dynamic Purchase Tracking
   - Read payment amount from URL query parameters
   - Track correct value: 49, 299, or 699 based on plan
   - Fire Purchase event only once per transaction
   - Handle missing/invalid amount gracefully

3. **Pricing.tsx** - Pass Amount to Thank You Page
   - Configure Razorpay buttons to redirect with amount parameter
   - Add `data-order_id` to track payment
   - Ensure proper URL encoding

### Add

- URL parameter handling for payment amount on thank you page
- Fallback mechanism if amount is not passed

### Remove

- Hardcoded value of 299 in Purchase event

## Implementation Plan

1. **Fix Meta Pixel ID in index.html**
   - Update Pixel ID in both script and noscript tags
   - Verify no duplicates exist

2. **Update Razorpay Button Configuration**
   - Modify Pricing.tsx to configure custom redirect URLs with amount
   - Use Razorpay's `data-redirect_url` attribute
   - Pass plan amount as query parameter: `/thank-you?amount=49`

3. **Update ThankYouPage.tsx Purchase Tracking**
   - Parse URL query parameters for `amount`
   - Validate amount (must be 49, 299, or 699)
   - Use parsed amount in fbq Purchase event
   - Keep sessionStorage prevention for duplicate tracking
   - Default to 299 if amount is missing/invalid (backward compatibility)

4. **Testing Validation**
   - Confirm Pixel loads with correct ID
   - Confirm PageView fires on all pages
   - Confirm Purchase event fires with dynamic amount
   - Confirm no duplicate tracking on refresh

## UX Notes

- Users will see no visual changes
- Meta Pixel will correctly track all 3 plan purchases
- Purchase event will fire immediately on thank you page load
- Protected against duplicate firing on page refresh
- Facebook Events Manager will show accurate conversion values
