# Husk & Hive Website

A static one-page brand site with a simple product ordering flow for Husk & Hive, a Ghanaian natural foods brand offering raw honey and groundnut paste.

## Project Overview

The site is built with plain HTML, CSS, and JavaScript. It has:

- A responsive landing page with navigation, hero, products, story carousel, trust points, and footer socials.
- A product order page with package-size cards for honey and groundnut paste.
- WhatsApp order links with prefilled product and size messages.
- Local image assets for product cards, navbar branding, dividers, and story carousel photos.

## Pages

- `index.html` - Main landing page.
- `order.html` - Product-size selection page for the mini ecommerce flow.

## Main Files

- `stylesheet.css` - Site styling, responsive layout, product cards, carousel styling, footer, and order-page cards.
- `hh.js` - Mobile navigation toggle and story carousel behavior.
- `images/` - Brand, product, story, and divider assets.

## Current Order Flow

Customers click an `Order` or `Choose a Package` link from the landing page and are taken to `order.html`.

The order page currently offers:

- Raw Honey: `200ml`, `400ml`, `500ml`
- Groundnut Paste: `200ml`, `400ml`, `500ml`

Each `Choose Size` button opens WhatsApp with a prefilled message for that selected product and size. Prices are currently shown as `Confirm price` until final prices are added.

## Local Preview

Because this is a static site, you can open `index.html` directly in a browser.

For a cleaner local preview, run a simple static server from the project folder:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Notes

- Instagram currently links to `https://www.instagram.com/huskandhivegh/`.
- WhatsApp orders currently use `+233 55 910 1078`.
- Font Awesome is loaded from CDN for the footer social icons.
- Google Fonts are loaded from CDN for `Poppins` and `Quicksand`.

## Next Steps

- Add final product prices for each size.
- Replace placeholder or generated product labels with final photography when available.
- Add cart state if the mini ecommerce flow grows beyond WhatsApp checkout.
# husk-and-hive-newdesign
# husk-and-hive-newdesign
