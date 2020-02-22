# Bodgam Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Test

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Git

### Commits convention

From [Quentin Busuttil](https://buzut.net/git-bien-nommer-ses-commits/).

- build : changements qui affectent le système de build ou des dépendances externes (npm, make…)
- ci : changements concernant les fichiers et scripts d’intégration ou de configuration (Travis, Ansible, BrowserStack…)
- feat : ajout d’une nouvelle fonctionnalité
- fix : correction d’un bug
- perf : amélioration des performances
- refactor : modification qui n’apporte ni nouvelle fonctionalité ni d’amélioration de performances
- revert : permet comme son nom l’indique, d’annuler un précédent commit
- style : changement qui n’apporte aucune alteration fonctionnelle ou sémantique (indentation, mise en forme, ajout d’espace, renommante d’une variable…)
- docs : rédaction ou mise à jour de documentation
- test : ajout ou modification de tests

## Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Font Awesome

https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/usage/features.md

## Todo

- EventForm : add isPrivate option
- UserForm : country list (https://www.npmjs.com/package/i18n-iso-countries)
- Handle http errors : service
- compléter page de profil-detail
- change location representation : with GeoCoordinates
- generic CRUD
- NEW EVENT : SET DEFAULT LOCATION !!!
- AlertService : add type parameter (success, error, ...) for custom css
- implement ngx-pwa/local-storage module (https://medium.com/@cyrilletuzi/angular-2-async-local-storage-fd8609fa84e0)
