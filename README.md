# Toastmasters Timer
A Toastmasters Timer made for Timers

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Astro](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=fff)](https://astro.build)
[![Alpine.js](https://img.shields.io/badge/Alpine.js-8BC0D0?logo=alpinedotjs&logoColor=fff)](https://alpinejs.dev)
[![Bun](https://img.shields.io/badge/Bun-000?logo=bun&logoColor=fff)](https://bun.sh)

A professional timing tool for Toastmasters meetings with dual-screen functionality - perfect for both physical and virtual meetings.

_I recommended using a desktop or laptop for ease of use._
_Also, it is usable but I am still planning to add some styling for the main page_

## Features

- **Dual-screen workflow**:
  - **Main Page**: Set custom timing thresholds
  - **Present View**: Clean, full-screen color display
- **Customizable thresholds**:
  - 🟢 Green (Qualified)
  - 🟡 Yellow (Warning)
  - 🔴 Red (Danger)
  - ⚪ White (Reset/Disqualified)

## Usage

1. **Setup**:
   - Open the main page
   - Configure your timing thresholds
   - Click "Open Present View" (opens in either a new window or tab depending on your browser settings - if as a tab, move it to separate window)

2. **During Meeting**:
   - Share the Present View window `/present` (fullscreen for best effect)
   - Manage timing from main page
   - Colors auto-update in real-time

## Development

Built with modern web technologies:

- [Astro](https://astro.build) - Static site generator
- [Alpine.js](https://alpinejs.dev) - Reactive interactivity
- [Bun](https://bun.sh) - Fast JavaScript runtime

### Local Setup

```sh
bun install          # Install dependencies
bun run dev          # Start development server
bun run build        # Production build
```

## Contributing

If there's anything you think that will be useful, feel free to create an issue or a PR.

## License

Apache 2.0 © Mike Nitres