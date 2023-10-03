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
        if (this.pilotingLicense?.className === undefined) throw new Error("must have piloting license")
        const pilotingLicenseClassName = this.pilotingLicense.className;
        if (numberOfMonthsValid === undefined) {
            if (this.age < 40 && pilotingLicenseClassName === "1") {
                this.medicalCertificate = new MedicalCertificate(validFrom, 12)
                return
            }
        }
        this.medicalCertificate = new MedicalCertificate(validFrom, numberOfMonthsValid)
    }

    expireMedicalCertificate() {
        this.medicalCertificate.expire()
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