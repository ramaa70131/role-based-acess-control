Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
Running Tests
Note: this feature is available with react-scripts@0.3.0 and higher.

Read the migration guide to learn how to enable it in older projects!

Create React App uses Jest as its test runner. To prepare for this integration, we did a major revamp of Jest so if you heard bad things about it years ago, give it another try.

Jest is a Node-based runner. This means that the tests always run in a Node environment and not in a real browser. This lets us enable fast iteration speed and prevent flakiness.

While Jest provides browser globals such as window thanks to jsdom, they are only approximations of the real browser behavior. Jest is intended to be used for unit tests of your logic and your components rather than the DOM quirks.

We recommend that you use a separate tool for browser end-to-end tests if you need them. They are beyond the scope of Create React App.

Filename Conventions
Jest will look for test files with any of the following popular naming conventions:

Files with .js suffix in __tests__ folders.
Files with .test.js suffix.
Files with .spec.js suffix.
The .test.js / .spec.js files (or the __tests__ folders) can be located at any depth under the src top level folder.

We recommend to put the test files (or __tests__ folders) next to the code they are testing so that relative imports appear shorter. For example, if App.test.js and App.js are in the same folder, the test only needs to import App from './App' instead of a long relative path. Collocation also helps find tests more quickly in larger projects.

Command Line Interface
When you run npm test, Jest will launch in watch mode*. Every time you save a file, it will re-run the tests, like how npm start recompiles the code.
Version Control Integration
By default, when you run npm test, Jest will only run the tests related to files changed since the last commit. This is an optimization designed to make your tests run fast regardless of how many tests you have. However it assumes that you don’t often commit the code that doesn’t pass the tests.

Jest will always explicitly mention that it only ran tests related to the files changed since the last commit. You can also press a in the watch mode to force Jest to run all tests.
