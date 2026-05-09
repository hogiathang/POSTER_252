
  # Complete current task

  This is a code bundle for Complete current task. The original project is available at https://www.figma.com/design/vVlbfJzo9m5JtgS7ebf06o/Complete-current-task.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

    ## Deploy to GitHub Pages

    1. Update `base` in `vite.config.ts` to match your repo name.
      - Example: `base: '/POSTER_252/'`
    2. Install dependencies: `npm i`
    3. Deploy: `npm run deploy`

    The site will be published to GitHub Pages under the `gh-pages` branch.

    ## CI/CD with GitHub Actions

    A workflow is included at `.github/workflows/deploy-pages.yml`.

    Steps:
    1. Ensure the default branch is `main`.
    2. In GitHub repo settings, enable Pages and set "Source" to "GitHub Actions".
    3. Push to `main` to trigger a build and deploy.
  