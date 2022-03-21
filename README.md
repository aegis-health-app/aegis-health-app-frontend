# Aegis Health App Frontend

Repository for Frontend codebase of Aegis Health App

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Xcode 12](https://developer.apple.com/xcode) (iOS)
- [Cocoapods 1.10.1](https://cocoapods.org) (iOS)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) (Android)
- [Android Studio and Android SDK](https://developer.android.com/studio) (Android)

## Commands

- Check if all prerequisites are met:
  ```
  npx react-native doctor
  ```
- Build Android and iOS build

  ```
  npx react-native upgrade
  ```

- When pulling new commits / adding dependencies / assets

  ```
  yarn install
  ```

  then run

  ```
  npx react-native link
  ```

  for linking assets to the project

- Run Android App: run

  ```
  yarn android
  ```

  then run

  ```
  yarn start
  ```

- Run iOS App: run on separate terminal

  ```
  yarn ios
  ```

  then run

  ```
  yarn start
  ```

- Run tests:
  ```
  yarn test
  ```

## Useful utils

- useDimensions: get height and width of screen
  ```
  const { ScreenHeight, ScreenWidth } = useDimensions()
  ```
- imageUtil: require all new assets in one file and easily import it later

  ```
  # src/assets/images/index.ts
  const images = {
    authBanner: require('./authBanner.png'),
    scanMe: require('./scanme.png'),
    sompochImg: require('./sompoch.png'),
    somyingImg: require('./somying.png'),
    ...add new images/icons path here...
  };

  export default images;
  ```
