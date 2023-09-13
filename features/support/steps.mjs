import {Given, Then, When} from '@cucumber/cucumber'
import {strict as assert} from 'assert'
import Greeter from "../../src/index.js";
import License from "../../src/License.js";

When('the greeter says hello', function () {
  this.whatIHeard = new Greeter().sayHello()
});

Then('I should have heard {string}', function (expectedResponse) {
  assert.equal(this.whatIHeard, expectedResponse)
});

Then('these licenses exist', function (table) {
  table.hashes().forEach(row => {
    assert.equal(new License(row.class).description, row.description)
  });
});
Given('a license with class {string} validFrom {string}', function (className, validFrom) {
  this.license = new License(className, validFrom)
});

Then('on {string} the license is expired', function (date) {
  const license = this.license;
  assert.ok(license.expiresBefore(date))
});