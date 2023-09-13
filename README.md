```shell
npm install @cucumber/cucumber
```

```shell
mkdir src
cat <<EOF > src/index.js
class Greeter {
  sayHello() {
    return 'hello'
  }
}

module.exports = {
  Greeter
}
EOF
```

```shell
mkdir features
cat <<EOF > features/greeting.feature
Feature: Greeting

  Scenario: Say hello
    When the greeter says hello
    Then I should have heard "hello"

EOF
```

```shell
mkdir features/support
cat <<EOF > features/support/steps.js
const assert = require('assert')
const { When, Then } = require('@cucumber/cucumber')
const { Greeter } = require('../../src')

When('the greeter says hello', function () {
  this.whatIHeard = new Greeter().sayHello()
});

Then('I should have heard {string}', function (expectedResponse) {
  assert.equal(this.whatIHeard, expectedResponse)
});
EOF
```

```shell
npx cucumber-js
```

## with intellij you need ultimate it seems

> Cucumber.js
> Required plugins:
> JavaScript and TypeScript -  The plugin is available only in IntelliJ IDEA Ultimate, where it is enabled by default.
> Gherkin -  If you are using IntelliJ IDEA Ultimate, the plugin is bundled and enabled by default. With IntelliJ IDEA Community, install the plugin on the Settings | Plugins page, tab Marketplace.
> Cucumber.js -  Install the plugin on the Settings | Plugins page, tab Marketplace. The plugin is available only in IntelliJ IDEA Ultimate.