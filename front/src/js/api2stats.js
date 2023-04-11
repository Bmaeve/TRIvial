const host = 'http://localhost:3000/'


let api2stats = {
    async scenarioInfoStat() {
        let promise = await fetch(host + "dbInfo/scenarios/code_type_/getDistinctValues")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return data
            })
        return promise

    },

    async getNbEleves(params, scenario) {
        let promise = await fetch(host + 'data/ens/selectData', {
            body: JSON.stringify(params),
            headers: { 'Content-Type': 'application/json' },
            method: 'post'
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                let nbEleves = 0;
                let nbElevesImpact = 0;
                data.features.forEach(ecole => {
                    let props = ecole.properties;
                    if (props.nombre_d_e != null) {
                        nbEleves += parseInt(props.nombre_d_e);
                    }
                    let prop = "intersectwith_scenarios_" + scenario.toLowerCase();
                    if (props[prop] && props.nombre_d_e != null) {
                        nbElevesImpact += parseInt(props.nombre_d_e);
                    }

                })
                let pourcentage = 0;
                if (nbEleves != 0) {
                    pourcentage = ((nbElevesImpact / nbEleves) * 100).toPrecision(4)
                }
                return [nbEleves, nbElevesImpact, pourcentage]
            })
        return promise
    }
}
export default api2stats;