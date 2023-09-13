import { Given, When, Then } from '@cucumber/cucumber'
import { strict as assert } from 'assert'
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
    assert.equal(License.ofClass(row.class).description, row.description)
  });
});