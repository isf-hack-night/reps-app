# reps-app
Homepage app for CA-StateStrong
Contains functionality linking Mapping, Reps, Actions 



# To Run Local:

check that constants.js INJECTION_DEV_MODE = true

>> npm install
>> npm run watch

navigate to ca.state-strong.org/index.php/test

Need to install chrome plugin 'Custom Javascript for Websites'
https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija

copy code from extension_injection.js into the plugin box 
and check 'enable cjs for this host'



# To Deploy to CA_SS site

check that constants.js INJECTION_DEV_MODE = false

run 'webpack' to create dist/bundle.js

go to wordpress and delete old bundle.js from the media library and upload new bundle.js
(note, wp media folder does permalinks by month, so should check functions.php to make sure the path to new bundle is correct)


