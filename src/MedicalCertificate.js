class MedicalCertificate {
    validFrom
    validUntil
    constructor(validFromDate, validUntil) {
        this.validFrom = validFromDate
        this.validUntil = validUntil;
    }

    isExpired(onDate) {
        return onDate > this.validUntil;
    }
}

module.exports = MedicalCertificate