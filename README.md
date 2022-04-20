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

- useAuthentication: sets and gets the JSON Web Token

  ```
  const { getToken, setToken } = useAuthentication()

  // getting the token
  const token = getToken() // "opfhp1o2i83unyp1o2u3rno..."

  // setting the token
  setToken("opfhp1o2i83unyp1o2u3rno...")
  ```

## How to reduce hours of pain

If you change the contents of `.env` and the content of the app doesn't follow, run this script

`yarn start --reset-cache`

## How to use the rn-tourguide

- Adds the ability to display a walkthrough of the page by highlighting the selected portion of the screen and displaying a text popup
- Able to navigate forward and backward between each tutorial popups
- For implementation demo and prop descriptions, see this link
  - https://morioh.com/p/3444d39c7926

Usage

```ts
// setup
const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter // an object for listening some events
  } = useTourGuideController();

...

// starting the tour
<TouchableOpacity
  onPress={() => {
    if (start) {
      start();
    }
  }}>
 <YourComponentHere />
</TouchableOpacity>

// selecting the highlighted areas and the sequence of the tour
<TourGuideZone zone={2} shape="rectangle" text={'Zone 2'}>
  <YourComponentHere />
</TourGuideZone>

```

## Send image to the back-end

```ts
const imagePayload = {
  base64: profileImage.base64,
  name: profileImage.fileName,
  type: profileImage.type,
  size: profileImage.fileSize
};

// then send this as the body
```

## useFocusEffect

This hook will run whenever that screen is visited (focused).

Example usage

```ts
const SomeScreen = () => {
  const [showScreen, setShowScreen] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      setShowScreen(false);
      setTimeout(() => {
        setShowScreen(true);
      }, 0);
    }, [])
  );

  if (!showScreen) return null;
  return (
    // JSX here
  )
}
```

## If your app build fails due to firebase

Add `google-services.json` which is provided privately to `android/app/`

Add classpath below to dependencies in `android/build.gradle `

```
  dependencies {
        ...
        classpath 'com.google.gms:google-services:4.3.10'
        ...
    }
```

Add the following to `android/app/build.gradle `

```
apply plugin: "com.android.application"
apply plugin: 'com.google.gms.google-services' // <- Add this line


dependencies {

  ...

  implementation 'com.google.firebase:firebase-core:16.0.1'
  implementation 'com.google.firebase:firebase-messaging:17.0.0'
  implementation platform('com.google.firebase:firebase-bom:29.2.1')
  implementation 'com.google.firebase:firebase-analytics'

  ...

}

...


```
