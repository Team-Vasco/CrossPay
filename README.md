# CrossPay

## Mobile development environment

You'll need to set up a mobile development environment to run the app on iOS or Android. The steps and features depend on if you have a MacOS or Windows. 
A MacOS is ideal for development since it allows for both iOS and Android testing.

Follow the environment setup instructions found in the official React Native docs: https://reactnative.dev/docs/environment-setup. This would including installing XCode (for iOS only), Android Studio, Ruby (for iOS only)...etc.
You'll specifically need to follow the instructions under "React Native CLI Quickstart". Select your "Development OS" and follow the installation instructions for both iOS and Android (under "Target OS").

## Setup

Install dependencies:  
Ensure your Node version is 16.14.0. Next, run `npm install` in the root folder. 
Navigate to the ios/ folder and run `pod install` to install all necessary iOS dependencies or `bundle install` and then `pod install` if necessary gem dependencies don't exist.

Insert PLAID Variables:
Inside the .env.example file is 5 variables relating to creating a PLAID connection. Two of these, 'PLAID_CLIENT_ID' and 'PLAID_SECRET' need to be filled with your instances. Once these are filled with your Client ID and Secret, create a .env file and copy the contents of .env.example into the .env file.

Start the backend server:
In a terminal window, run `node server.js` in the root folder. This will run a local server on port 8080.

## Running the app

Open a new terminal window and run one of the following commands in the TinyQuickstartReactNative/ folder:

To run on iOS, run this command:  
`npx react-native run-ios`    
To run on Android, run this command:  
`npx react-native run-android`


Both commands start Metro, build the app, open a simulator/emulator, and launch the app in the simulator/emulator. For iOS, if you encounter an error related to a simulator not being found, you can specify a simulator like so:   
`npx react-native run-ios --simulator="iPhone 14"`


To observe OAuth in action, type "oauth" into the search bar when prompted to select a bank. Select "Platypus OAuth Bank". On the next screen, select the first instance of "Platypus OAuth Bank". Click "Continue" when prompted. You'll be redirected to the login page for "First Platypus Bank". Click "Sign in" to proceed. Link will connect the account at the OAuth bank, prompt you to continue, and then redirect you back to the app.
