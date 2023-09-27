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

function dateFromString(validFrom) {
    const parts = validFrom.split("-")
    return new Date(parts[0], parts[1], parts[2]);
}

Given('a medical certificate validFrom {string}', function (validFrom) {
    let world = this
    world.medicalCertificate = new MedicalCertificate(dateFromString(validFrom));
});

Then('on {string} the medical certificate is expired', function (date) {
    let world = this
    const medicalCertificate = world.medicalCertificate;
    assert.ok(medicalCertificate.isExpiredOnDate(dateFromString(date)))
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
    assert.ok(pilot.medicalCertificate.isExpiredOnDate(onDate))
});

Given('pilot {string} is {int} years old', function (pilotName, age) {
    let world = new World(this)
    let pilot = world.pilotNamed(pilotName);
    pilot.age = age;
});
Given('pilot {string} has a license class {string}', function (pilotName, licenseClass) {
    let world = new World(this)
    let pilot = world.pilotNamed(pilotName);
    pilot.pilotingLicense = new License(licenseClass);
});
Given('pilot {string} has valid medical certificate', function (pilotName) {
    let world = new World(this)
    let pilot = world.pilotNamed(pilotName);
    let now = new Date();
    pilot.addMedicalCertificate(now)
});
When('pilot {string}s medical certificate expires', function (pilotName) {
    let world = new World(this)
    let pilot = world.pilotNamed(pilotName);
    pilot.expireMedicalCertificate();
});
Then('pilot {string} has a license of class {string}', function (pilotName, expectedLicenceClass) {
    let world = new World(this)
    let pilot = world.pilotNamed(pilotName);
    assert.equal(pilot.pilotingLicense.className, expectedLicenceClass)
});
Then('pilot {string}s medical certificate is valid for another {int} months', function (pilotName, expectedNumberOfMonthsValid) {
    let world = new World(this)
    let pilot = world.pilotNamed(pilotName);
    assert.equal(pilot.medicalCertificate.numberOfMonthsValid, expectedNumberOfMonthsValid)
});
Then('pilot {string}s medical certificate is expired', function (pilotName) {
    let world = new World(this)
    let pilot = world.pilotNamed(pilotName);
    assert.ok(pilot.medicalCertificate.isExpired)
});