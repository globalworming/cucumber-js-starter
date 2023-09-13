class License {
    static ofClass(className) {
        switch (className) {
            case "1":
                return new License("1", "1st class, commercial airline pilots")
            case "2":
                return new License("2", "2nd class, other commercial pilots")
            case "3":
                return new License("3", "3rd class, recreational pilots")
            default:
                throw new Error("no such class");
        }
    }

    constructor(className, description) {
        this.className = className;
        this.description = description;
    }
}

module.exports = License