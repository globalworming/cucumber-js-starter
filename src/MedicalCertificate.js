class MedicalCertificate {
    validFrom
    numberOfMonthsValid
    isExpired
    constructor(validFromDate, numberOfMonthsValid) {
        this.validFrom = validFromDate
        this.numberOfMonthsValid = numberOfMonthsValid || 60;
        this.isExpired = false
    }

    isExpiredOnDate(date) {
        let validUntil = new Date(this.validFrom.getFullYear(), this.validFrom.getMonth(), this.validFrom.getDay());
        validUntil.setMonth(validUntil.getMonth() + this.numberOfMonthsValid);
        return date > validUntil;
    }
}

module.exports = MedicalCertificate