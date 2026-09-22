# Landing  <br />  <img alt="Stargazers" src="https://img.shields.io/github/stars/i-is-evil-duck/landing?style=for-the-badge&logo=starship&color=C9CBFF&logoColor=D9E0EE&labelColor=302D41">


## Landing
Landing page for furryfemboys.top — a soft, cute corner of the internet. Static site with quick-links to Git, File Bin, Paste Bin, Drawing Board, Cheese Simulator, and Down Detector.

Live at [furryfemboys.top](https://furryfemboys.top).

## Downloads

Clone and serve the static files — no build step. Pre-built Docker image via [releases](https://github.com/i-is-evil-duck/landing/releases) (coming soon).

| Platform | File |
|----------|------|
| Docker | `docker compose up --build` (serves on `:8040`) |
| Static | `index.html` + `css/` + `js/` + assets |

## Build from Source

```bash
# Clone the repo
git clone https://github.com/i-is-evil-duck/landing.git
cd landing

# Run with Docker (httpd:alpine, port 8040 -> 80)
docker compose up --build

# Or serve statically
python -m http.server 8040
```

Then open http://localhost:8040 in your browser.

## Setup

No config files. Edit `index.html` for links/content:

- Nav links: Git (`https://git.furryfemboys.top`), Uptime (`https://down.j3ly.com/`), Discord invite
- Quick-link cards: Git Server, File Bin (`bin.j3ly.com`), Paste Bin (`haste.j3ly.com`), Drawing Board (`draw.j3ly.com`), Cheese Simulator (`cheese-simulator.j3ly.com`), Down Detector (`down.j3ly.com`)
- Assets: `favicon.png`, `hero-icon.webp`, `cursor.png`, `css/style.css`, `js/main.js`

`httpd.conf` + `Dockerfile` control the Apache static hosting.

## Usage

Open the site and click any quick-link card. Sections:

- `#top` hero with mascot + tagline
- `#Quick-links` feature grid (6 cards)

## Views

<img src="https://count.getloli.com/get/@Landing?theme=rule34" />
