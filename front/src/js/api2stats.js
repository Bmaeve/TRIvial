const host = 'http://localhost:3000/'


let api2stats = {
    async scenarioType() {
        let type = await fetch(host + "dbInfo/scenarios/code_type_/getDistinctValues")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return data
            })
        return type

    },
    async scenarioProba(scenario) {
        let prob = await fetch(host + "dbInfo/scenarios/code_scena/getDistinctValues")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return data[scenario - 1]
            })
        return prob

    },

    async getNbEleves(params, scenario) {
        let methodAPI;
        let bodyAPI;
        if (params == "all") {
            methodAPI = 'get';
            bodyAPI = null;
        } else {
            methodAPI = 'post';
            bodyAPI = JSON.stringify(params);
        }
        let promise = await fetch(host + 'data/ens/selectData', {
            body: bodyAPI,
            headers: { 'Content-Type': 'application/json' },
            method: methodAPI
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
    },

    async getNbPopSante(params, scenario) {
        let methodAPI;
        let bodyAPI;
        if (params == "all") {
            methodAPI = 'get';
            bodyAPI = null;
        } else {
            methodAPI = 'post';
            bodyAPI = JSON.stringify(params);
        }
        let promise = await fetch(host + 'data/san/selectData', {
            body: bodyAPI,
            headers: { 'Content-Type': 'application/json' },
            method: methodAPI
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                let nbPop = 0;
                let nbPopImpact = 0;
                data.features.forEach(bat => {
                    let props = bat.properties;
                    if (props.cap_autori != null) {
                        nbPop += parseInt(props.cap_autori);
                    }
                    let prop = "intersectwith_scenarios_" + scenario.toLowerCase();
                    if (props[prop] && props.cap_autori != null) {
                        nbPopImpact += parseInt(props.cap_autori);
                    }

                })
                let pourcentage = 0;
                if (nbPop != 0) {
                    pourcentage = ((nbPopImpact / nbPop) * 100).toPrecision(4)
                }
                return [nbPop, nbPopImpact, pourcentage]
            })
        return promise
    }
}
export default api2stats;