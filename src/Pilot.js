const MedicalCertificate = require("./MedicalCertificate");

class Pilot {
    name
    age
    pilotingLicense
    medicalCertificate
    constructor(name) {
        this.name = name
    }

    addMedicalCertificate(validFrom) {
        let validUntil = new Date(validFrom.getFullYear(), validFrom.getMonth(), validFrom.getDay());
        let monthsValid = 12;
        if (this.age >= 40) {
            monthsValid = 6
        }
        validUntil.setMonth(validUntil.getMonth() + monthsValid);
        this.medicalCertificate = new MedicalCertificate(validFrom, validUntil)
    }
}

module.exports = Pilot