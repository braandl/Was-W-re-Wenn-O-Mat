import Statistics from "./stats/Statistics";

export default class DataAdapter {

    async load(resolve, reject) {
        try {
            const response = await fetch(DataAdapter.uri, {});
            this.parseResponse(resolve, reject, response.json())
        } catch (error) {
            console.error(`[Network][Error] Method: "${method}", Message: "${error}"`);
            this.parseResponse([]);
        }
    }

    parseResponse(resolve, reject, data) {
        data.then(json => {
            resolve(this.getCases(json))
        }).catch(e => reject(e))
    }

    getCases(json) {
        const sevenDays = [];
        for (let i = 0; i < 7; i++) {
            sevenDays.push(0);
        }
        const res = json.features.map(({ attributes }) => attributes.AnzFallErkrankung + attributes.AnzFallMeldung);
      
        for (let i = 6; i < res.length; i++) {
            let avg = res[ i - 6 ] 
                    + res[ i - 5 ]
                    + res[ i - 4 ]
                    + res[ i - 3 ]
                    + res[ i - 2 ]
                    + res[ i - 1 ]
                    + res[ i ];
            
            avg /= Statistics.realResidents
            avg *= 100000

            sevenDays.push(avg);
        }

        
        return sevenDays 
    }

    static get cnt() {
        var time_difference = new Date().getTime() - new Date(1639691929 * 1000).getTime();  
        return 655 +  Math.floor(time_difference / (1000 * 60 * 60 * 24)); 
    }

    static get uri() {
        return "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/rki_history_v/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=AdmUnitId%20asc%2CDatum%20asc&resultOffset=0&resultRecordCount=" + DataAdapter.cnt + "&resultType=standard&cacheHint=true"
    }

}