// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dbToken: 'add_your_own_api_key',
  baseUrl: 'https://api.themoviedb.org/3',
  imgBaseUrl: 'https://image.tmdb.org/t/p',
  idmbUrl: 'https://www.imdb.com/title',
  idmbUserUrl: 'https://www.imdb.com/name',
  androidDeepLinkBaseUrl: 'arflix://',
  newAppUrl: 'https://actionanand.github.io/arflix/',
  manPlaceholderImg: 'assets/images/man-placeholder.jpg',
  movieNotFoundUrl: 'assets/images/movie-not-found.png',
  // manPlaceholderImg: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Man_Silhouette2.jpg',
  // movieNotFoundUrl: 'https://cdn.pixabay.com/photo/2017/01/25/17/35/camera-2008489_1280.png',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
