const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1500,
    viewportHeight: 1000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
