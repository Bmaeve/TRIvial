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

    async getNbEleves(params) {
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
                data.features.forEach(ecole => {
                    if (ecole.properties.nombre_d_e != null) {
                        nbEleves += parseInt(ecole.properties.nombre_d_e);
                    }
                })
                return nbEleves
            })
        return promise
    }
}
export default api2stats;