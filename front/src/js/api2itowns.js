const host = 'http://localhost:3000/'
import { ColorLayer } from "itowns";
import { FileSource, THREE, Style, FeatureGeometryLayer, proj4 } from "../../node_modules/itowns/dist/itowns";
import { toWgs84 } from "reproject";

let epsg = require('epsg');
//let counter = 0

let index = {}
let last_parameters = {}
let enjeux = ["admin", "def", "ens", "indus", "trans_s", "trans_l_flat", "san", "autre", "patrim"];
let cleanProperties = (keys) => {
    let value = '';
    switch (keys) {
        case 'Detail_enjeu':
            value = 'Detail enjeu';
            break;
        case 'Nature_u00':
            value = 'Nature';
            break;
        case 'Patronyme_':
            value = 'Patronyme';
            break;
        case 'Code_posta':
            value = 'Code postal';
            break;
        case 'Et_etabli0':
            value = 'Etablissement';
            break;
        case 'Libbelle_ac':
            value = 'Libelle ac';
            break;
        case 'Date_ouver':
            value = "Date d'ouverture";
            break;
        case 'Rs':
            value = 'Raison sociale';
            break;
        case 'Rslongue':
            value = 'Raison sociale longue';
            break;
        case 'Numvoie':
            value = 'Numero de voie';
            break;
        case 'Typvoie':
            value = 'Type de voie';
            break;
        case 'Codepostal':
            value = 'Code postal';
            break;
        case 'Libcatgre':
            value = 'Categorie etablissement';
            break;
        case 'Libcodeape':
            value = 'Code APE';
            break;
        case 'Liblongmft':
            value = 'Code MFT longue';
            break;
        case 'Dateouvert':
            value = "Date d'ouverture";
            break;
        case 'Datemaj':
            value = 'Date mise a jour';
            break;
        case 'Cl_admin':
            value = 'Classe Admin';
            break;
        case 'It_europ':
            value = 'It europe';
            break;
        case 'Nb_voies':
            value = 'Nbr voies';
            break;
        case 'Inseecom_d':
            value = 'Inseecom';
            break;
        case 'Liblongcat':
            value = 'Categorie';
            break;

        default:
            value = keys;
    }

    return value
}


let api2itowns = {
    async addLayerToView(view, table_name, parameters = {}, where = "an") {
        let color;
        if (parameters.color == undefined) {
            color = new THREE.Color(Math.random() * 0xffffff)
        } else if (parameters.concernedByScenario != undefined) {
            color = await this.displayConcernedFeatures(table_name, parameters.concernedByScenario, parameters.not_concerned_color, parameters.color)
        } else {
            color = parameters.color
        }

        if (index[table_name] == undefined) {
            index[table_name] = 0
        } else {
            index[table_name]++
        }

        let promise = fetch(host + 'data/' + table_name + '/selectData', {
            body: JSON.stringify(parameters),
            headers: { 'Content-Type': 'application/json' },
            method: 'post'
        })
            .then(res => res.json())
            .then(data => {
                let newLayer;
                proj4.defs(
                    'EPSG:2154',
                    '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
                );

                if (table_name == "scenarios") {
                    let source2 = new FileSource({
                        fetchedData: toWgs84(data, undefined, epsg), // reprojecting data for color layer
                        crs: 'EPSG:4326',
                        format: 'application/json',
                    });
                    newLayer = new ColorLayer(table_name, {
                        transparent: true,
                        source: source2,
                        style: new Style({
                            fill: {
                                color: "#66ACF6",
                                opacity: 0.4
                            }
                        }),
                    });
                } else {
                    let source = new FileSource({
                        fetchedData: data,
                        crs: 'EPSG:2154',
                        format: 'application/json',
                    });

                    newLayer = new FeatureGeometryLayer(table_name + '_' + index[table_name], {
                        // Use a FileSource to load a single file once
                        source: source,
                        batchId: setId,
                        transparent: true,
                        opacity: 0.7,
                        style: new Style({
                            fill: {
                                color: color,
                                base_altitude: setAltitude,
                                extrusion_height: setExtrusions,
                            }
                        })
                    });
                }
                let map;
                if (where == "an") {
                    map = document.getElementById('viewerDiv');
                } else if (where == "sec") {
                    map = document.getElementById("sec_viewerDiv");
                }

                view.getLayers().forEach((l) => {
                    // if the table is updated, remove the previous layer 
                    if (table_name + '_' + (index[table_name] - 1).toString() == l.id) {
                        view.removeLayer(table_name + '_' + (index[table_name] - 1).toString(), true);
                    }
                })
                // add the layer to the view
                view.addLayer(newLayer);
                view.getLayers().forEach(layer => {
                    if (!["scenarios", "atmosphere", "DEM", "Ortho", "globe"].includes(layer.id) && !layer.id.includes("trans_l")) {
                        map.addEventListener('click', (e) => { picking(e, layer.id, where) }, true);
                    }
                })

                function picking(event, layer, where) {
                    let table;
                    enjeux.forEach(enjeu => {
                        if (layer.includes(enjeu)) {
                            table = enjeu
                        }
                    })
                    if (view.controls.isPaused) {
                        var intersects = view.pickFeaturesAt(event, 3, layer);
                        let properties;
                        let batchId;
                        let info;
                        let htmlInfo;
                        if (where == "an") {
                            htmlInfo = document.getElementById('info');
                        } else if (where == "sec") {
                            htmlInfo = document.getElementById('info_sec');
                        }
                        try {
                            if (intersects[layer].length !== 0) {
                                htmlInfo.innerHTML = '';
                                batchId = intersects[layer][0].object.geometry.attributes.batchId.array[intersects[layer][0].face.a];
                                intersects[layer][0].object.feature.geometries.forEach(geom => {
                                    if (geom.properties.id == batchId) {
                                        properties = geom.properties;
                                    }
                                })
                                if (properties == undefined) {
                                    properties = intersects[layer][0].object.feature.geometries[batchId].properties;
                                }
                                let text;
                                if (where == "an") {
                                    text = `<table class="table table-striped an_table_info">
                                    <thead><tr><th scope="col">Propriété</th><th scope="col">Valeur</th></tr></thead>
                                    <tbody>`;
                                } else if (where == "sec") {
                                    text = `<table class="table table-striped sec_table_info">
                                    <thead><tr><th scope="col">Propriété</th><th scope="col">Valeur</th></tr></thead>
                                    <tbody>`;
                                    let params = { id: batchId }
                                    fetch(host + 'data/' + table + '/selectData', {
                                        body: JSON.stringify(params),
                                        headers: { 'Content-Type': 'application/json' },
                                        method: 'post'
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            let params2 = { geometry: data.features[0].geometry };
                                            fetch(host + 'data/getClosestFireHouse', {
                                                body: JSON.stringify(params2),
                                                headers: { 'Content-Type': 'application/json' },
                                                method: 'post'
                                            })
                                                .then(res => res.json())
                                                .then(data => {
                                                    //We have the closest fire house
                                                    console.log(data)
                                                })
                                        })
                                }

                                Object.keys(properties).map(function (objectKey) {
                                    var value = properties[objectKey];
                                    if (value) {
                                        var key = objectKey.toString();
                                        let bool = false;
                                        if (layer.includes("ens") && ["enjeu", "nature", "detail_enjeu", "hauteur", "nature_u00", "patronyme_", "code_posta", "et_etabli0", "libbelle_ac", "date_ouver"].includes(key)) {
                                            bool = true;
                                        } else if (layer.includes("san") && ["enjeu", "nature", "detail_enjeu", "hauteur", "rs", "rslongue", "numvoie", "typvoie", "voie", "codepostal", "liblongcat", "libcatgre", "libcodeape", "liblongmft", "dateouvert", "datemaj"].includes(key)) {
                                            bool = true;
                                        } else if (layer.includes("trans_l") && ["enjeu", "nature", "detail_enjeu", "cl_admin", "it_europ", "largeur", "nb_voies", "sens", "inseecom_d"].includes(key)) {
                                            bool = true;
                                        } else if (key[0] !== '_' && key !== 'geometry_name' && ["enjeu", "nature", "detail_enjeu", "hauteur"].includes(key)) {
                                            bool = true;
                                        }
                                        if (bool) {
                                            info = value.toString();
                                            htmlInfo.getElementsByTagName("tbody");
                                            text += `<tr>
                                              <th>`+ cleanProperties(key.replace(key[0], key[0].toUpperCase())) + `</th>
                                              <td>`+ info + `</td>
                                          </tr>`;
                                        }
                                    }
                                });
                                text += '</tbody></table>';
                                htmlInfo.innerHTML = text;
                            }
                        } catch (error) {
                            console.log(error)
                        }

                    }

                }
            })
        return promise;
    },

    addEnjeuxToView(view, parameters, where = "an") {
        let promises = [];

        // removing useless layers
        Object.keys(last_parameters).forEach((last_table) => {
            if (!Object.keys(parameters).includes(last_table)) {
                // the layer is not selected in the new request
                try {
                    view.removeLayer(last_table + '_' + (index[last_table]).toString(), true);
                } catch (e) {
                    console.log(e)
                }
            }
        })

        // adding layers
        Object.keys(parameters).forEach((new_table) => {
            // check parameters are different with the last request, else nothing to do
            if (!(JSON.stringify(parameters[new_table]) == JSON.stringify(last_parameters[new_table]))) {
                // adding layers
                let promise = this.addLayerToView(view, new_table, parameters[new_table], where);
                promises.push(promise);
            }
        })

        last_parameters = parameters
        return (Promise.all(promises))
    },

    displayConcernedFeatures(enjeu, scenario, concerned_color = "red", not_concerned_color = "green") {
        let promise = fetch(host + "enjeux/" + enjeu + '/scenarios/computeConcernedRows?distinctScenario=scenario', {
            method: 'put'
        })
            .then(res => res.json())
            .then(() => {
                let color = (feature) => {
                    if (feature["intersectwith_scenarios_" + scenario.toLowerCase()]) {
                        return concerned_color;
                    } else {
                        return not_concerned_color;
                    }
                }

                return color;
            })
            .catch((err) => {
                console.log(err)
            })
        return promise
    }

}

function setExtrusions(properties) {

    return properties.hauteur;

}

function setAltitude(properties) {
    return parseFloat(properties.z_median);
}

function setId(properties) {
    if (!properties.id) {
        return properties.uuid;
    }
    else {
        return properties.id;
    }

}

export default api2itowns;