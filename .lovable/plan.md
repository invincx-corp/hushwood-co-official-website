# Finish the requested website behavior

## What will change
- Make the Moments that Count player reliably open as a centered, sound-enabled modal. Keep the background blurred and inactive, and verify its playback controls in the live preview.
- Give quote requests category- and product-aware questions, record those answers with the existing quote submission, and include the selected product in its notification.
- Remove redundant in-site back links and avoid resetting scroll when browser Back or Forward is used.
- Check the existing contact, quote, and checkout submission paths and clearly report what stores successfully and what email behavior is confirmed.

## Technical approach
- Reuse the current React Router, product catalog, quotes table, and quote email function; no database schema change is planned.
- Store tailored answers in the existing customization/additional-requirements quote fields so they remain visible in the current admin/profile workflow.
- Test the modal and navigation in the running preview; inspect submission code and available runtime signals for the form audit.
