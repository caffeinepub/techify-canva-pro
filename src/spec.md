# Techify Canva Pro

## Current State

The website currently has:
- Header with logo and WhatsApp support button
- Hero section with yearly payment button (₹299)
- What You Get features section
- Features cards (Team Collaboration, Content Planner, Storage)
- Customer Reviews
- Live Purchases section
- FAQ accordion
- Footer with 3 payment options displayed inline:
  - Monthly subscription (₹49)
  - Yearly subscription (₹299)
  - Reseller Admin Panel (₹699)
- Thank You page with Meta Pixel Purchase event
- Meta Pixel installed on all pages

## Requested Changes (Diff)

### Add
- Fixed footer bar at bottom of screen (sticky)
- "Canva Pro Subscription starting at just ₹49" teaser text in footer
- Click interaction to expand/show all 3 plans
- Expandable panel animation for plan selection

### Modify
- Footer becomes fixed/sticky at viewport bottom
- Footer starts collapsed showing only teaser
- Remove "Cancel Anytime" text from monthly subscription plan card
- Update hero section to show ₹49 starting price instead of ₹299

### Remove
- "Cancel Anytime" text from monthly plan description

## Implementation Plan

### Backend
- No backend changes required

### Frontend
1. Update hero section headline to show "Starting at just ₹49/month"
2. Create fixed footer bar component with:
   - Collapsed state: "Canva Pro Subscription starting at just ₹49" + expand button
   - Expanded state: All 3 plan cards (Monthly, Yearly, Reseller)
3. Implement click toggle to expand/collapse footer
4. Add CSS for:
   - `position: fixed` at bottom
   - Smooth transition animation
   - z-index to stay above content
5. Remove "Cancel Anytime" from Monthly plan card
6. Update footer payment section to be expandable panel

## UX Notes

- Fixed footer remains visible while scrolling
- Users can click anywhere on collapsed footer to expand
- Expanded view shows all 3 plans side-by-side (responsive grid)
- Click outside or close button collapses footer
- Starting price (₹49) prominently displayed in hero and footer
- Monthly plan description updated to remove cancellation text (manual basis)
