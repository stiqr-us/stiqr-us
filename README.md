# STIQR

## Development Pipeline

### Development AKA dev

This is where all code initially comes together, the `dev` branch.
Practice database calls will be made against the dev database.

According to best `git` practices, each feature should be developed
in it's own branch, then merged into `dev`.

```bash
firebase deploy
```

### Testing AKA test

This is where code will be merged to once we want to run serious
testing on our code, such as unit and end-to-end (e2e) tests.

```bash
firebase deploy --use test
```

### Staging AKA stage

This step is set up mock the production environment as closely as possible.
At this point, code should be shown to business executives for manual inspection.

```bash
firebase deploy --use stage
```

### Production AKA prod

This is the final product, what customers will connect to. 
This environment must be protected from bad code and database deletions.

```bash
firebase deploy --use prod
```

# Angular Boilerplate

This project was generated with 
[Angular CLI](https://github.com/angular/angular-cli) version 15.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component.
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project.
The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.
To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the 
[Angular CLI Overview and Command Reference](https://angular.io/cli) page.
