import { THREE } from '../../node_modules/itowns/dist/itowns'

let idx2Scenario = {
    1: "01For",
    2: "02Moy",
    3: "04Fai"
};

let accessParams = {
    getParams() {
        // defining parameters
        let params = {};

        // for each enjeu, defining the corresponding value in json
        let enjeux = document.getElementsByClassName("form-enjeu");
        for (let enjeu of enjeux) {
            if (enjeu.checked) {
                let color = document.getElementById("color_" + enjeu.id).value
                params[enjeu.id] = {
                    filters: [],
                    minHeigh: Math.round(parseInt(document.getElementsByClassName("bar-left")[0].style.width) * 300 / 1000) * 10,
                    maxHeigh: document.getElementsByClassName("input-type-range input-type-range-max")[0].valueAsNumber,
                    color: new THREE.Color(color),
                    concernedByScenario: idx2Scenario[document.getElementById("rangeScenario").valueAsNumber]
                };
            }
        }

        // browsing each type and adding the filter in the corresponding array
        let types = document.querySelectorAll("#type");
        types.forEach(type => {
            if (type.checked) {
                let enjeu = type.value;
                let input_enjeu = document.querySelector("#" + enjeu);
                if (input_enjeu.checked) {
                    let filterName = type.nextSibling.innerText;
                    if (enjeu == "ens" && filterName != "null") {
                        filterName = filterName.toUpperCase();
                    }
                    if (filterName == "null") {
                        // when filter accepts null values
                        params[enjeu].displayNullValues = true;
                    } else {
                        params[enjeu].filters.push(filterName);
                    }
                }
            }
        })

        return params
    }
}
export default accessParams;