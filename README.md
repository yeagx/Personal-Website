## Abdulrhman Mohamed — Data‑focused Frontend Developer 👨‍💻📊

> I turn messy data into decisions and delightful UIs. ✨

[🌐 Portfolio](/index.html) • [📄 Resume](./CV.pdf) • [▶️ YouTube](https://www.youtube.com/@YeagX) • [🔗 LinkedIn](https://www.linkedin.com/in/ayeager13/) • [🐙 GitHub](https://github.com/AYeagerr)

---

### Highlights ✨

- **Modern hero ✨**: Gradient‑ring avatar, crisp typography, focused value prop
- **Micro‑interactions 🎛️**: Smooth GSAP + ScrollTrigger animations across sections
- **YouTube integration 📺**: Latest video + 3 recent uploads via RSS, “NEW” badge, channel logo fetch
- **Projects grid 🧩**: Hover lift, clean CTAs to Live Demo and Code
- **Clash Royale spotlight 👑**: Personal stats, deck cards with elixir badges, favorite card highlight
- **Zero‑backend contact ✉️**: Validated form submitting to Google Forms with a custom success popup
- **Performance‑minded 🚀**: Lazy-loaded images/iframe, skeleton placeholders, lightweight vanilla JS

---

## Demo ▶️

- Open `index.html` directly, or run a static server:
```bash
# VS Code (Live Server extension)
# Click "Go Live"

# npx (Node)
npx serve .

# Python
python -m http.server 8080
```

---

## Tech Stack 🧰

- **Core 🧱**: HTML5, CSS3, Vanilla JS
- **Libraries 📚**: GSAP + ScrollTrigger, Bootstrap 5, Font Awesome
- **Fonts 🔤**: Inter, Luckiest Guy (for Clash Royale flair)
- **Integrations 🔌**:
  - YouTube via RSS (`js/youtube-rss.js`) [default] 📡
  - Optional YouTube Data API (`js/youtube-api.js`) 🔑
  - Google Forms for contact submissions (`js/google-form-handler.js`) ✉️

---

## Features in Detail 🔍

- **GSAP-powered flow 🎬**
  - Animated nav, hero reveal, section entrances, hover scaling on projects, footer fade‑in
  - Active nav link syncing while scrolling

- **YouTube section 📺**
  - Embeds the latest upload and shows 3 recent videos with thumbnails
  - Auto “NEW” badge for uploads within 7 days
  - Fetches channel avatar from RSS with graceful fallback

- **Projects 🧩**
  - Curated cards with images for IGYM, ARIA, and Red E‑commerce
  - Buttons for “Live Demo” and “Code” open in new tabs

- **Clash Royale corner ⚔️**
  - Profile stats, achievements chips, last updated date
  - Deck with card art, elixir badges, and golden highlight for favorite card

- **Contact 📬**
  - Client-side validation (name/email/message)
  - No backend needed — submits to Google Forms
  - Animated “Message Sent!” popup with auto‑dismiss and ESC/overlay close

---

## Quick Start 🚀

```bash
git clone <REPO_URL>
cd Portfolio
# open index.html or start a local server
```

File structure:
```
Portfolio/
  CSS/                # Sectioned styles (nav, hero, about, projects, youtube, clash-royale, contact, footer)
  Images/             # Avatar, project images, Clash Royale cards, favicon
    cards/            # Deck card art and metadata
  js/
    animations.js     # GSAP + ScrollTrigger animations and interactions
    youtube-rss.js    # RSS-based YouTube integration (default, no API key)
    youtube-api.js    # Optional YouTube Data API integration (requires API key)
    google-form-handler.js # Validations + Google Forms submit + success popup
  index.html
  CV.pdf
```

---

## Configuration ⚙️

### YouTube (RSS — default, no API key) 📡
- Already enabled via `js/youtube-rss.js`. It:
  - Fetches latest upload + recent videos
  - Sets channel avatar from RSS
  - Uses a CORS proxy (`api.allorigins.win`) for the feed

### YouTube (Data API — optional) 🔑
1. Get an API key from Google Cloud Console.
2. In `js/youtube-api.js`, set:
   - `this.apiKey = 'YOUR_API_KEY_HERE'`
   - `this.channelId = 'YOUR_CHANNEL_ID'`
3. In `index.html`, replace the RSS script with the API script:
```html
<!-- Remove -->
<script src="js/youtube-rss.js"></script>
<!-- Add -->
<script src="js/youtube-api.js"></script>
```

### Contact (Google Forms) ✉️
- In `js/google-form-handler.js`, update:
  - The form action to your form: `https://docs.google.com/forms/d/e/<YOUR_FORM_ID>/formResponse`
  - `GOOGLE_FORM_ENTRIES` to match your form field entry IDs
- Works without any server; all client‑side.

---

## Customize 🎨

- **Branding**: Update name, tagline, and avatar in `index.html`
- **Colors/Type**: Tune palettes in `CSS/main.css` and section styles
- **Socials**: Edit links in the `About` section
- **Projects**: Replace images in `Images/` and update links/titles under `#projects`
- **Clash Royale**: Swap images in `Images/cards/` and adjust stats/deck labels

---

## Screens 🖼️

![Hero](Images/hero.png)
![About](Images/about.png)
![Projects](Images/projects.png)

---

## Deployment 🚀

- **GitHub Pages**: Settings → Pages → Deploy from Branch → `main` → `/root`
- **Vercel / Netlify**: New Project → Import repo → Framework: Static site → Deploy

---

## Accessibility & Performance ♿⚡

- Lazy `loading="lazy"` and `decoding="async"` on media
- Responsive layout with Bootstrap grid + custom CSS
- Keyboard/overlay dismiss on the popup
- Fallback content for YouTube and avatar fetching

---


## License 📄

Copyright © 2025 Abdulrhman Mohamed.

Assets and trademarks for Clash Royale belong to Supercell. External libraries remain under their respective licenses.

---

## Contact 📬

- Email: abdulrhman.mohamed026@gmail.com
- Phone: +201023232234
- Cairo, Egypt
- YouTube: @YeagX
- LinkedIn: /in/ayeager13/
- GitHub: @AYeagerr
