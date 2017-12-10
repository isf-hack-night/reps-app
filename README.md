# reps-app
Homepage app for CA-StateStrong
Contains functionality linking Mapping, Reps, Actions

# Clone the repo:
Download and install [Git](https://git-scm.com/downloads).


(Optional) Download and install [Github Desktop](https://desktop.github.com/).

Clone this repository by clicking on the "Clone or Download" button above and click "Open in Desktop". After cloning the repository, navigate to the folder containing the repository.

Check that `src/constants.js` contains the following line:
```INJECTION_DEV_MODE = true```

Ask someone in ISF for the `KEYS.js` file and copy it into the `src` folder of the repository. If you received a zip file with the `KEYS.js` contained inside, only copy the `KEYS.js` itself to the `src` folder.


# Setup:

## Start your local server (you can pick Docker or Local):

### Docker
* Install docker
  * [Docker for mac](https://store.docker.com/editions/community/docker-ce-desktop-mac)
  * [Docker for windows](https://store.docker.com/editions/community/docker-ce-desktop-windows)
* Run `docker-compose up`

### Local:
* Install [Node](https://nodejs.org/en/download/) if you don't have it already.
If on Windows, you will probably have to restart your computer.

* Open up a terminal (or command prompt on Windows) and navigate to where you cloned the repository.

* Run `npm install` 
The install command may take several minutes and may produce several warnings. These are safe to ignore.

* Run `npm run watch`
Runnning this command will set up the local webserver bundle. It shouldn't produce any errors.

## Inject your local code into the test website:
* Install chrome plugin ['Custom Javascript for Websites'](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija).

* Go to [https://0.0.0.0:9000](https://0.0.0.0:9000). You should see a bad certificate error. Click on the ADVANCED link on the Chrome error page, and click "Proceed anyway".

* Go to the CA StateStrong [website test page](https://ca.state-strong.org/index.php/test).

* Click on the CJS plugin's icon, copy code from `src/extension_injection.js` into the plugin box and check 'enable cjs for this host'.

* Reload the page. It should now load with a working map. Any changes you make to the javascript should now automatically be injected into the page.

# To Deploy to CA_SS site

check that constants.js INJECTION_DEV_MODE = false

run 'webpack' to create dist/bundle.js

go to wordpress and delete old bundle.js from the media library and upload new bundle.js
(note, wp media folder does permalinks by month, so should check functions.php to make sure the path to new bundle is correct)


