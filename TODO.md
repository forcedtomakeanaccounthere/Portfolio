# TODO

## Implement: Experience modal responsive double-image (desktop vs mobile)

- [x] Update `src/data/experiences.json` (and/or `experiences.js`) to support two image URLs per experience: one for desktop and one for mobile.

- [x] Update `src/app/experience/page.jsx` modal header image to choose desktop vs mobile source.
- [x] Update `src/components/Experience.jsx` modal header image similarly.

- [ ] Add helper component (optional) to avoid duplicating logic.
- [x] Ensure Next/Image usage remains correct (client component restrictions, `fill`, `sizes`).
- [x] Document ideal desktop image dimensions/resolution for the modal hero banner.


## Validation

- [ ] Run `npm run dev` and open `/experience`.
- [ ] Verify modal hero image does not crop incorrectly in desktop and mobile widths.
- [ ] Check Lighthouse / console for Next/Image warnings (sizes/layout-fill).

