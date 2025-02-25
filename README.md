# ![Blogify Logo](https://main.d331yi1p7vboi5.amplifyapp.com/assets/assets/images/logo.04aee1113800c61583d4f4497ab59efd.png)

Blogify is a intuitive blogging platform built with [Expo](https://expo.dev). This project was created using [`create-expo-app`](https://www.npmjs.com/package/create-expo-app), making it easy to develop and deploy for web and iOS.

## Tech Stack

Blogify is built using the following technologies:

- **React Native & Expo** – For building cross-platform mobile and web applications
- **React Navigation** – For handling navigation in the app
- **TanStack React Query** – For efficient state and data management
- **Axios** – For making HTTP requests
- **React Testing Library** – For testing UI components
- **Jest & Jest-Expo** – For running unit and integration tests
- **ESLint** – For maintaining code quality and consistency
- **Prettier** – For code formatting
- **TypeScript** – For static typing and improved developer experience

## Get Started

1. Install dependencies and start the application

   ```bash
   npm run bootstrap
   ```

You'll have options to open the app in a:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

The app is written mainly to target web but it works in iOS and Android as well.

You can start developing by editing the files inside the **app** directory. Blogify uses [file-based routing](https://docs.expo.dev/router/introduction/) for seamless navigation.

## Available Scripts

The following scripts are available for development and testing:

```json
"start": "expo start",
"reset-project": "node ./scripts/reset-project.js",
"ios": "expo start --ios",
"web": "expo start --web",
"test": "jest --watchAll",
"test:coverage": "jest --coverage=true",
"lint": "expo lint",
"build:web": "expo export -p web "
```

## Deployment

Blogify is deployed on AWS Amplify. You can access the live application at:

🔗 [Blogify on AWS Amplify](https://main.d331yi1p7vboi5.amplifyapp.com/)

## Features

- Responsive design for a smooth experience on web and iOS
- Dark mode support

## Missing Features (To Be Added)

- **PWA Support with Service Workers** – Enable Progressive Web App (PWA) capabilities, allowing offline access, improved performance, and an app-like experience on the web.
- **More test coverage** – More tests means more quality.
- **Logging and monitoring** – Logging and monitoring for better error handling and improvements.

