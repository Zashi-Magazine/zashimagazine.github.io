# Zashi Magazine

The Zashi Magazine website, rebuilt by hand from the old Wix site (Edition 1). It's a plain static site with no build step, hosted free on GitHub Pages at **zashimagazine.com**.

## What's here

| Path | What it is |
|---|---|
| `index.html` | Front page: the Edition 1 home, same as `home-1.html` |
| `home-1.html` … `contact-1.html` | The 8 Edition 1 pages, using the same names as on Wix |
| `css/` | Shared styles (`site.css`) and font definitions (`fonts.css`) |
| `js/site.js` | Scales the layouts to fit, plays GIF-videos as they scroll into view, entrance animations, menus, slideshows, signup popup |
| `media/` | Every image, already resized (WebP). Big GIFs are converted to small looping MP4s |
| `fonts/` | Free open-licence fonts standing in for Wix's licensed ones, plus our own Leadville |

Each page has two hand-placed layouts like Wix did: desktop (1280 wide) and phone (320 wide), each scaled to the screen. Positions are inline on each element.

## Editing

- **Text:** open the page's `.html` and change the words in place. Each page has the text twice, once in the desktop layout (`<div class="stage d">`) and once in the phone layout (`<div class="stage m">`), so change both.
- **Images:** put the new file in `media/` and point the `<img src>` at it. Keep images under about 300 KB if you can.
- Any change pushed to `main` goes live in about a minute.

## Hosting

- **GitHub Pages:** deploys from the `main` branch, root folder. The custom domain is set under Settings → Pages.
- **Domain:** registered at Porkbun.
  - DNS has four `A` records on `@` pointing to GitHub Pages, and a `CNAME` on `www` pointing to `zashi-magazine.github.io`.
  - **Leave the MX and TXT records alone.** They run the Google Workspace email (contact@zashimagazine.com).

## Not done yet

- **Newsletter popup:** not connected yet. To connect it, pick a newsletter service and add `<script>window.ZASHI_SIGNUP_URL='…form endpoint…'</script>` before `js/site.js` on each page. Export the old signups from Wix first.
- **Vol 2 pages:** not rebuilt yet. Links to them still go to the old Wix site.
