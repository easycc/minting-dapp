# minting-depp

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production and launch server
npm run build
npm run start

# generate static project
npm run generate

# Switch between environments to deploy direbase functions
firebase use default
firebase use development

# Deploy direbase functions
firebase deploy --only functions

# Deploy direbase firestore rules
firebase deploy --only firestore:rules


# Deploy direbase firestore rules AND functions

# Run storybook
npm run storybook

# Must-have exntesion to handle i18n translations
[Link](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally).
