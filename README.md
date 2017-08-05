# webpack-pipe
Boilerplate for compiling/transpiling JS/ES6/CSS/LESS etc. into a single JS bundle for easy injection

# Why do I want this?
Working within WordPress can be slow and frustrating, alongside awkward (or no) versioning AND requiring of giving certain permissions before work can be done. Using this, you can compile whatever JS/CSS you like into a single file, and see how it would look/work via injection. After that, a pull request can be made, reviewed, and properly added to the project elsewhere.

# How do I use it?
- First, obviously, pull down the repo
- Then, run `npm install`
- To start the server:
- `npm run watch`
- This will make all JS imported to `index.js` accessible at (by default) `https://localhost:9000/dist/bundle.js`
- To surface the bundle onto a page (using Chrome), first download [Custom JavaScript Chrome Extension](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija?hl=en)
- Navigate to the page you want to inject the bundle to and:
- Click the extension icon (icon with the letters 'CJS')
- Select `your own external scripts`
- In the popup, **delete the 2nd commented out line** and replace it with `https://localhost:9000/dist/bundle.js`
- Click out of the popup to close it, click the save button
- The page should reload, and the bundle code should run on the page. You should see different colors and a log statement in the console
- Now, as you change the JS/CSS and save your work, the server will automatically update the bundle, and the page will refresh and reflect those changes

_NOTE:_ You don't have to limit yourself to just JS and CSS. You can also use [ES6](http://es6-features.org/) or [LESS](http://lesscss.org/) syntax, if you prefer.

# How should I update things?
If you look at the current `index.js` file, you'll see two `import` statements. These are pulling in the `.css` and `.less` files. As long as `import` statements with the right filepath are included in the `index.js` file, AKA `import './my-code-folder/my-code.js'`, they'll be bundled and available.

_NOTE:_ This particular repo is just boilerplate! Unless you're improving the boilerplate itself, make a new repo and jumpstart yourself with this boilerplate.
