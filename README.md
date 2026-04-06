
# AssignmentsReactNativeApps

A few different apps created with React Native. Based off the following tutorial from freeCodeCamp.org:
https://www.youtube.com/watch?v=sm5Y7Vtuihg

Expo React Native Documentation:
https://docs.expo.dev/

React Native Storage Options:
https://docs.expo.dev/develop/user-interface/store-data/

# Installations
### Software:

* Visual Studio Code
* Git

### VSCode Extenstions:
* ES7+ React/Redux/React-Native snippets
* Expo Tools
* React Native Tools

### Mobile Apps (iOS):

* Expo Go
* TestFlight
* Developer

# Basic Instructions

Bash commands to create a React Native project, then running it :

1. `npx create-expo-app@latest --template default@sdk-55`
2. `npx expo start`
3. Scan the QR code with the camera app to add it to Expo Go

Extra Commands :

To delete the default template project and start new without making a whole new folder, run:
`npm run reset-project`

To clear the cache when starting the app
`npx expo start -c`

### Notes:

* To open the developer mode in Expo Go, remember to ((shake)) the phone!
* To set Bash as your default terminal in VSCode after installing git, hit Ctrl+Shift+P, Type `Terminal: Select Default Profile`, then select `Git Bash`

# Expo Application Services (EAS)

Make sure you have an account at https://expo.dev/ in order to build development & production apps

* if it's not installed yet: `npm i -g eas-cli`
* reliable browser login method: `eas login -b`
* Start in your project directory: `eas init`
* Configuring the project: `eas build:configure`

Expo EAS Documentation: https://docs.expo.dev/tutorial/eas/introduction/

### Building for android devices

Note: When running a build for the 1st time, you may be prompted for your Android Application ID. This is simply `com.companyname.productname`

* developer build that requires an active server:
`eas build --profile development --platform android`
* developer build that can run without a server:
`eas build --profile preview --platform android`
* production build ready for the app store:
`eas build --profile production --platform android`

Once the project is built, download & install the app on android devices using the link provided by expo.dev
To run the development app, run the server (might need `npx expo start --tunnel`), 
