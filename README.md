# Facebook Page Title Fixer (Smart Start)

A lightweight, high-performance UserScript that fixes missing, generic, or slow-updating tab titles when navigating Facebook.

## 🚀 The Problem

When navigating Facebook, the browser tab title often gets stuck showing generic text (like "Facebook" or "Home") or fails to update promptly due to Facebook's Single Page Application (SPA) dynamic rendering behavior.

## 💡 How It Works

Instead of relying on fragile CSS selectors that frequently break, this script uses a **Smart Cover Photo Anchoring Technique**:

1. **Primary Search:** Looks for the standard `<h1>` heading element first.
2. **Cover Photo Anchoring:** Identifies the page cover photo in the DOM and uses `Node.compareDocumentPosition()` to skip all navigation elements (Navbar, sidebars) appearing *before* the cover photo.
3. **Smart Label Filtering:** Evaluates candidate `aria-label` text against an ignore list (e.g., *Notifications*, *Menu*, *Your Profile*) to extract the true page name.
4. **Zero Overhead:** Uses a `MutationObserver` set at `document-start` that **disconnects immediately** once the title is set. A 10-second safety fallback prevents long-running background tasks.

## ✨ Key Features

* **High Performance:** Instant disconnection upon title resolution prevents CPU & memory bloat.
* **Smart DOM Anchoring:** Bypasses top navigation bars without heavy XPath queries.
* **Multilingual Filtering:** Ignores common system labels in both English and Thai.
* **Zero Dependencies:** Pure vanilla JavaScript.

## 📥 Installation

1. Install a UserScript manager in your browser:
   * [Tampermonkey](https://www.tampermonkey.net/) (Recommended)
   * [Violentmonkey](https://violentmonkey.github.io/)
2. Click to install the script directly from your repository or paste the script content manually.

## ⚙️ Metadata Header Example

```javascript
// ==UserScript==
// @name         Facebook Page Title Fixer (Smart Start)
// @namespace    [https://github.com/YOUR_USERNAME/facebook-page-title-fixer](https://github.com/YOUR_USERNAME/facebook-page-title-fixer)
// @version      0.6
// @description  Fix slow or missing Facebook page titles using Smart Cover Photo Anchoring.
// @author       YOUR_NAME
// @match        [https://www.facebook.com/](https://www.facebook.com/)*
// @match        [https://web.facebook.com/](https://web.facebook.com/)*
// @grant        none
// @run-at       document-start
// ==/UserScript==
