# AccessBank — Accessibility Audit and Remediation in React

## Assignment
**Accessibility (a11y) in React — Audit a React App and Fix Accessibility Issues**

This project is a small but realistic banking dashboard designed to demonstrate accessibility remediation for a 15-mark practical assignment.

## Features
- Banking dashboard with balance, spending and savings cards
- Recent transaction list
- Smart spending insight panel
- Accessible transfer modal
- Form labels and descriptive help text
- Keyboard navigation and visible focus
- Modal focus trap
- Escape-to-close and focus restoration
- Screen-reader-friendly roles, labels and status messages
- Responsive mobile layout
- Accessibility feature banner

## Accessibility issues addressed
- Missing form labels → programmatic `<label>` associations
- Low contrast → accessible text/control colors
- Non-keyboard-accessible modal → keyboard-operable dialog
- Missing focus trap → Tab/Shift+Tab are contained within the modal
- Missing alt text → meaningful alternative text for informative imagery

## Tools
- React
- Vite (development/build tooling)
- axe DevTools
- eslint-plugin-jsx-a11y
- NVDA / VoiceOver
- Keyboard-only testing

## Run
```bash
npm install
npm run dev
```

## Build and lint
```bash
npm run build
npm run lint
```

## Manual keyboard test
1. Press Tab until **Send money** is focused.
2. Press Enter.
3. Confirm focus enters the transfer dialog.
4. Tab through the controls; focus should remain inside the dialog.
5. Press Shift+Tab to reverse.
6. Press Escape to close.
7. Confirm focus returns to **Send money**.

## Repository
Add the final GitHub repository URL to the assignment report.
