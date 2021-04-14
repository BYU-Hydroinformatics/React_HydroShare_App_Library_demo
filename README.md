# React HydroShare App Library demo

This app is created for two purposes. The first as a demo of how the Dynamic components will appear for the proposed HydroShare App Library. The second is to act as a final project for a Web Development class at BYU. This app takes app metadata and automatically displays them. Features include, launching the app on clicking the icon, button to see more or less metadata, automatically generated tages for each app, automatically generated input button when a app accepts hydroshare inputs, and a dynamic form that allows the user to launch the app with user inputed HydroShare inputs.

This app automatically creates a table that displays app metadata and creates links to the host url for each app. The table also automatically create image tags for the correct apps. If the app has HydroShare resource inputs options, a button opens a form that allows the user to launch the app with the inputs. These forms are dynamically created and have between 1 and 7 inputs depending on the link. 

### The organization of the app goes as follows:

App has one and only one DynamicTable

DynamicTable has zero or more Entry(s)

Entry has one and only one ExpandedView

Entry has zero or one InputView

Entry has one and only one TagsDiv


This app is not ment to be a fully functional demo of the proposed HydroShare App library some features do not exist and may never be implemented. First, this is built outside of the HydroShare environment, as I had more experiance with React than Vue at the time of creation and time limitations. There is no search options, as most of its implementaion is already complete in HydroShare. There is no Animations of new elements being shown or hidden, this is due to time limitations at the time of creation.

If you have any questions, comments, or requests for additional features, please contact me using my Github information.

-Hart Henrichsen


# React App Introduction



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
