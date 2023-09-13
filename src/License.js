class License {
    className
    description
    validFrom

    constructor(className, validFrom) {
        switch (className) {
            case "1":
                this.description = "1st class, commercial airline pilots"; break;
            case "2":
                this.description = "2nd class, other commercial pilots"; break;
            case "3":
                this.description = "3rd class, recreational pilots"; break;
            default:
                throw new Error("no such class");
        }
        this.className = className;
        this.validFrom = validFrom
    }

    expiresBefore(date) {
        return true;
    }
}

module.exports = License