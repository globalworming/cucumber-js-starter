class MedicalCertificate {
    validFrom
    numberOfMonthsValid
    isExpired
    constructor(validFromDate, numberOfMonthsValid) {
        this.validFrom = validFromDate
        this.numberOfMonthsValid = numberOfMonthsValid || 60;
        this.isExpired = false
    }

    expire() {
        this.isExpired = true
    }

    isExpiredOnDate(date) {
        let dateOfTheLastDayOfTheValidFromMonth = new Date(this.validFrom.getFullYear(), this.validFrom.getMonth() + 1, 0);
        const validUntil = dateOfTheLastDayOfTheValidFromMonth;
        validUntil.setMonth(validUntil.getMonth() + this.numberOfMonthsValid);
        return date > validUntil;
    }
}

module.exports = MedicalCertificate