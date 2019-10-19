// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyCQm05tikMRYAR5axTm2TrcSDl-h66RV0s",
    authDomain: "coffee-deploy.firebaseapp.com",
    databaseURL: "https://coffee-deploy.firebaseio.com",
    projectId: "coffee-deploy",
    storageBucket: "coffee-deploy.appspot.com",
    messagingSenderId: "78716926460"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
