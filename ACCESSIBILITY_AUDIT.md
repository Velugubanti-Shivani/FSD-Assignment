# Accessibility Audit — Before/After

## Targeted issues
1. Missing form label
2. Missing informative-image alt text
3. Low-contrast text
4. Non-semantic modal
5. No keyboard focus trap / focus restoration

## Corrected implementation
The current `src/main.jsx` implements:
- `<label htmlFor>` + input `id`
- meaningful `alt` text
- higher-contrast text and controls
- `role="dialog"` and `aria-modal="true"`
- `aria-labelledby`
- initial focus
- Tab/Shift+Tab focus trap
- Escape-to-close
- focus restoration

## Verification
Run:
- `npm run lint`
- `npm run build`
- axe DevTools in the browser
- NVDA or VoiceOver
- keyboard-only walkthrough

Record the actual axe violation count before and after in the final report.
