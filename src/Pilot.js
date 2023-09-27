const MedicalCertificate = require("./MedicalCertificate");
const License = require("./License");

class Pilot {
    name
    age
    pilotingLicense
    medicalCertificate
    constructor(name) {
        this.name = name
    }

    addMedicalCertificate(validFrom, numberOfMonthsValid) {
        this.medicalCertificate = new MedicalCertificate(validFrom, numberOfMonthsValid)
    }

    expireMedicalCertificate() {
        let now = new Date();

        if (this.age < 40 && this.pilotingLicense.className === "1") {
            this.pilotingLicense = new License("3")
            this.addMedicalCertificate(now, 48)
            return
        }

        if (this.age >= 40 && this.pilotingLicense.className === "1") {
            this.pilotingLicense = new License("2")
            this.addMedicalCertificate(now, 6)
            return
        }

        if (this.age < 40 && this.pilotingLicense.className === "2") {
            this.pilotingLicense = new License("3")
            this.addMedicalCertificate(now, 48)
            return
        }

        if (this.age >= 40 && this.pilotingLicense.className === "2") {
            this.pilotingLicense = new License("3")
            this.addMedicalCertificate(now, 12)
            return
        }

        if (this.age < 40 && this.pilotingLicense.className === "3") {
            this.pilotingLicense = new License("expired");
            this.medicalCertificate.isExired = true;
            return
        }

        if (this.age >= 40 && this.pilotingLicense.className === "3") {
            this.pilotingLicense = new License("expired");
            this.medicalCertificate.isExired = true;
            return
        }

        throw new Error("no matching rule")
    }
}

module.exports = Pilot