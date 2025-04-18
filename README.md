[TRY IT OUT HERE!](https://mikebelanger.github.io/pouchdb-todo-webcomponents/)

NOTE: There's no minification or bundling.  That means you can open up the above link in your browser dev tools, and just check out how it works!
# Basic Todo List

Seeing how far I can get with just [PouchDB](https://pouchdb.com/) and some [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements).  No React, no Typescript, not even a bundler or NPM. I did bring in [Pico.css](https://picocss.com/).

# Developing Locally

Download this repo, and http-serve from the root of your repo. I'm using [basic-http-server](https://github.com/brson/basic-http-server), but anything that can serve an index.html will work. [http-serve](https://www.npmjs.com/package/http-server) works too.  Loading the index.html file directly from your filesystem **won't work**, and will trigger a CORS error.

Open it up in the browser, and start adding items. Click on items to remove them. Hit refresh.  Note how you get persistence "for free".

# Using with Chrome Developer tools

Personally, my favorite way to work is in a [Chrome Workspace](https://developer.chrome.com/docs/devtools/workspaces/). Once you're serving this locally, open it into a Chrome Workspace.  You can modify stuff in the "Sources" tab. You can use breakpoints, throw in debugger statements, etc.

# Known Issues (TODO)

- [x] Re-rendering list items is O(N). Find some way to lazily render them.
- [ ] Icon on hover for styling
