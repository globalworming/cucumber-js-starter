class License {
    className
    description

    constructor(className) {
        switch (className) {
            case "1":
                this.description = "1st class, commercial airline pilots"; break;
            case "2":
                this.description = "2nd class, other commercial pilots"; break;
            case "3":
                this.description = "3rd class, recreational pilots"; break;
            case "expired":
                this.description = "expired"; break;
            default:
                throw new Error("no such class");
        }
        this.className = className;
    }
}

module.exports = License