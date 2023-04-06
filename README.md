# How to run

1. Download and install the latest version of node 16 for your operating system
   - https://nodejs.org/download/release/v16.19.0/
2. Install git:
   - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
3. Authenticate your Github account with Git:
   - https://docs.github.com/en/get-started/getting-started-with-git/caching-your-github-credentials-in-git
4. Clone this repo using your command line
   - `git https://github.com/cheaper-eater/frontend.git`
5. Setup a .env file
   - navigate to the root of the project you cloned and create a file called `.env`
   - in that file, add the following lines:
   ```
   API_DOMAIN=
   API_PORT=
   ```
   - for the `API_DOMAIN` environment variable, set the domain to use for the backend api, if you are working on the project locally using the web browser, use `localhost` ex: `API_DOMAIN=localhost`. If you want to test the mobile version of the application, use the local ip address of your machine ex: `192.168.1.117`.
   - for the `API_PORT` environment variable, set the port of the backend api, if you are using the standard config in the backend, this should be set to `8000` ex: `API_PORT=8000`
   - note that when you make a change to the .env file, you must clear the cache for changes to take effect.
     - using expo (this only works for Android and IOS)
       - `expo start -c` the -c flag tells expo to clear the cache
     - removing the data manually (for web)
       - delete the cache directory found at `{project root}/.expo/web/cache`
6. Build and run:
   - in your command line, navigate to the project directory you cloned
   - in your command line, run `npm install` to install all of the project dependencies
   - in your command line, run `npm run build:tailwind` to build the project's talwind classes
   - run with `npm run web|ios|android` where `web|ios|android` is the platform you want to run the app on
