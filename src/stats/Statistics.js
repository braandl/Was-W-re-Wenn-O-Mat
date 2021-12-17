export default class Statistics {

    //FIXME: This is just a very brought assumption
    plausabilityOfInfection(cases, day) {
        day = Math.min(day, cases.length)

        let p = 0;

        /*
        for (let i = 0; i < day; i++) {
            p += ((cases[i] / 7) / Statistics.realResidents) 
        }
        */

        for (let i = 0; i < day; i++) {
            p += (cases[i] / Statistics.realResidents) 
        }
        return p * 100;
    }

    plausabilityOfInfectionVaxinated(cases, day) {
        return this.plausabilityOfInfection(cases, day) * 0.2;
    }

    static get residents() {
        return 831 // Per 100.000
    }

    static get realResidents() {
        return Statistics.residents * 100000
    }

}