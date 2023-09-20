import {Given, Then, When} from '@cucumber/cucumber'
import {strict as assert} from 'assert'
import Greeter from "../../src/index.js";
import License from "../../src/License.js";
import World from "../../src/World.js";
import MedicalCertificate from "../../src/MedicalCertificate.js";

When('the greeter says hello', function () {
    this.whatIHeard = new Greeter().sayHello()
});

Then('I should have heard {string}', function (expectedResponse) {
    assert.equal(this.whatIHeard, expectedResponse)
});

Then('these licenses exist', function (table) {
    table.hashes().forEach(row => {
        let license = new License(row.class);
        assert.equal(license.description, row.description)
    });
});

Given('a license with class {string} validFrom {string}', function (className, validFrom) {
    let world = this
    world.license = new License(className, validFrom)
});

Then('on {string} the license is expired', function (date) {
    let world = this
    const license = world.license;
    assert.ok(license.expiresBefore(date))
});

Given('pilot {string} is under {int} years old', function (pilotName, age) {
    let world = new World(this)
    let pilot = world.pilotNamed(pilotName);
    pilot.age = age - 1;
});
Given('pilot {string} has a first class license', function (pilotName) {
    let world = new World(this)
    let pilot = world.pilotNamed(pilotName);
    pilot.pilotingLicense = new License("1");
});
Given('pilot {string} has medical certificate from {string}', function (pilotName, date) {
    let world = new World(this)
    let pilot = world.pilotNamed(pilotName);
    const parts = date.split("-")
    let validFrom = new Date(parts[0], parts[1], parts[2]);
    pilot.addMedicalCertificate(validFrom)
});
Then('the medical certificate of {string} is expired on {string}', function (pilotName, date) {
    const parts = date.split("-")
    const onDate = new Date(parts[0], parts[1], parts[2])

    let world = new World(this)
    let pilot = world.pilotNamed(pilotName);
    assert.ok(pilot.medicalCertificate.isExpired(onDate))
});