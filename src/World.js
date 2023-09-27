const Pilot = require("./Pilot");

class World {
    world
    constructor(cucumberWorld) {
        this.world = cucumberWorld
        if (this.world.pilots === undefined) {
            this.world.pilots = [];
        }
    }


    doesPilotExists(pilotName) {
        return !!this.world.pilots.find(pilot => pilot.name === pilotName);
    }

    pilotNamed(pilotName) {
        if (this.doesPilotExists(pilotName)) {
            return this.world.pilots.filter(pilot => pilot.name === pilotName)[0]
        }
        const pilot = new Pilot(pilotName)
        this.addPilot(pilot)
        return pilot
    }

    addPilot(newPilot) {
        this.world.pilots.push(newPilot)
    }
}

module.exports = World