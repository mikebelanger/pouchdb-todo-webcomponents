# Basic Todo List

Seeing how far I can get with just [PouchDB](https://pouchdb.com/) and some [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements).  No React, no Typescript, not even a bundler or NPM. I did bring in [Pico.css](https://picocss.com/).

# To run

Download this repo, and http-serve from the root of your repo. I'm using [basic-http-server](https://github.com/brson/basic-http-server), but anything that can serve an index.html will work. [http-serve](https://www.npmjs.com/package/http-server) works too.  Loading the index.html file directly from your filesystem **won't work**, and will trigger a CORS error.

Open it up in the browser, and start adding items. Click on items to remove them (I gotta make that more obvious). Hit refresh.  Note how you get persistence with so little code.

# Known Issues (TODO)

- [x] Re-rendering list items is O(N). Find some way to lazily render them.
- [ ] Icon on hover for styling
