# reps-app
Homepage app for CA-StateStrong
Contains functionality linking Mapping, Reps, Actions 



# To Run Local:

Download and install [Git](https://git-scm.com/downloads).

(Optional) Download and install [Github Desktop](https://desktop.github.com/).

Clone this repository by clicking on the "Clone or Download" button above and click "Open in Desktop". After cloning the repository, navigate to the folder containing the repository.

Check that `src/constants.js` contains the following line:
```INJECTION_DEV_MODE = true```

Download and install [Node](https://nodejs.org/en/download/) if you don't have it already.
If on Windows, you will probably have to restart your computer.

Open up a terminal (or command prompt on Windows) and navigate to where you cloned the repository.

Ask someone in ISF for the `KEYS` file and copy it to src.

Run the following command in the terminal:

>> npm install

The install command may take several minutes.

>> npm run watch

Install chrome plugin ['Custom Javascript for Websites'](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija).

Navigate to [https://localhost:9000](https://localhost:9000). You should see a bad certificate error. Click on the ADVANCED link on the Chrome error page, and click "Proceed anyway".

Navigate to the CA StateStrong [website test page](https://ca.state-strong.org/index.php/test).

Click on the CJS plugin's icon, copy code from `src/extension_injection.js` into the plugin box 
and check 'enable cjs for this host'.



# To Deploy to CA_SS site

check that constants.js INJECTION_DEV_MODE = false

run 'webpack' to create dist/bundle.js

go to wordpress and delete old bundle.js from the media library and upload new bundle.js
(note, wp media folder does permalinks by month, so should check functions.php to make sure the path to new bundle is correct)


