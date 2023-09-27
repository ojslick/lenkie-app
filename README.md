# lenkie-assessment

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

Install dependencies with:

```sh
npm install
```

### Running the app

Run the app locally in dev mode:

```sh
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Development

### Lint

Run Prettier and ESLint.

```sh
npm run lint
```

```sh
npm run format
```

Rules can be added to `.eslintrc.js` as development progresses.

### Test

Run tests in Jest.

```sh
npm test [options]
```

## CI/CD

### CI

CI uses [GitHub](https://github.com/ojslick/lenkie-assessment/tree/main/.github)

### Deploying web

Vercel is used for deployments. They are continuous and deploy on every commit to `main`.

## Monitoring and Analytics

-   [Sentry](https://sentry.io) is used for error monitoring in this application. The build process uploads the source map to sentry
-   Google Analytics is used to track users' activities across the app.

## File Structure

-   `.github/` Github action workflows
-   `.public/` Static files served directly by the server
-   `src/`
    -   `components/` Shared components used throughout the app
    -   `features/` Standalone features that can be integrated into any view
    -   `mocks/` Houses mock service worker set up
        -   `handlers/` Mock service worker route handlers
    -   `test-utils/` Contains test utility functions and mocked data
    -   `utils/` Contains utility functions that can be used across the app
    -   `views/` Contains top-level pages
        -   `<View>/` Top-level page
            -   `components/` Components unique to their scoped area      
