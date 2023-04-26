const host = 'http://localhost:3000/'
import { ColorLayer } from "itowns";
import { FileSource, THREE, Style, FeatureGeometryLayer, proj4 } from "../../node_modules/itowns/dist/itowns";
import { toWgs84 } from "reproject";

let epsg = require('epsg');

//Callback function to sort the itinerary sequences
const sorter = (sortBy) => (a, b) => a[sortBy] > b[sortBy] ? 1 : -1;

//import the store
import { store } from '../components/Store.js'


let index = {}
let last_parameters = {}
let enjeux = ["admin", "def", "ens", "indus", "trans_s", "trans_l_noded", "san", "autre", "patrim"];


//The module to be exported to be able to display the right layers
let api2itowns = {
    //Function to add one layer to the Itowns view according to parameters
    async addLayerToView(view, table_name, parameters = {}, where = "an") {
        let color;
        if (parameters.color == undefined) {
            color = new THREE.Color(Math.random() * 0xffffff)
        } else if (parameters.concernedByScenario != undefined) {
            color = await this.displayConcernedFeatures(table_name, parameters.concernedByScenario, parameters.not_concerned_color, parameters.color)
        } else {
            color = parameters.color
        }
        //Incrementing the layer name because iTowns doesn't accept a new layer that has
        //an old layer's name
        if (index[table_name] == undefined) {
            index[table_name] = 0
        } else {
            index[table_name]++
        }
        //Calling our API with the given parameters
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
                //Building a particular layer if it is a "scenario" layer
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
                    //Else it is the same type of layer for every other "enjeu"
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
                //Fetching the right div in the code
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
                        map.addEventListener('click', (e) => { picking(e, layer.id, where, view) }, true);
                        if (where == "sec" && !layer.id.includes('def')) {
                            map.addEventListener('mousedown', () => {
                                let date1 = new Date();
                                map.onmouseup = function (e) {
                                    let date2 = new Date();
                                    if (date2 - date1 > 800) {
                                        itineraire(e, layer.id, where, view, data, parameters.concernedByScenario)
                                    }
                                }
                            })
                        }
                    }
                })

            })
        return promise;
    },

    //Adding every "enjeu" selected in the panel to the view
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
        //Trying to delete the itinerary in the "Secours" part 
        try {
            if (where == "sec") {
                view.removeLayer('trans_l_flat_' + (index['trans_l_flat']).toString(), true);
                view.removeLayer('def_' + (index['def']).toString(), true);
                store.displayIti = false;
                htmlInfo.innerHTML = "";
            }
        } catch (e) {
            console.log(e)
        }
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
    //Displaying the impacted features in red to highlight them
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
//Calculate extrusion height
function setExtrusions(properties) {
    return properties.hauteur;
}
//Calculate altitude height
function setAltitude(properties) {
    return parseFloat(properties.z_median);
}

//Function to set the batch id 
function setId(properties) {
    if (!properties.id) {
        return properties.uuid;
    }
    else {
        return properties.id;
    }

}
//Function to load the differents informations on the clicked feature
let htmlInfo;
function picking(event, layer, where, view) {
    if (view.controls.isPaused) {
        var intersects = view.pickFeaturesAt(event, 3, layer);
        let properties;
        let batchId;
        let info;
        //Getting the right div 
        if (where == "an") {
            htmlInfo = document.getElementById('info');
        } else if (where == "sec") {
            htmlInfo = document.getElementById('info_sec');
        }
        //Filling the table
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
//Function to compute an itinerary to the enjeu we clicked on from the closest fire house
async function itineraire(event, layer, where, view, data, scenario) {
    if (view.controls.isPaused) {
        //Finding itinerary
        let table;
        enjeux.forEach(enjeu => {
            if (layer.includes(enjeu)) {
                table = enjeu
            }
        })
        let intersects = view.pickFeaturesAt(event, 3, layer);
        try {
            if (intersects[layer].length !== 0) {
                let batchId = intersects[layer][0].object.geometry.attributes.batchId.array[intersects[layer][0].face.a];
                if (where == "sec") {
                    let id_vertex_enjeu;
                    let id_vertex_caserne;
                    let params = { id: batchId };
                    let enj_promise = await fetch(host + 'data/' + table + '/selectData', {
                        body: JSON.stringify(params),
                        headers: { 'Content-Type': 'application/json' },
                        method: 'post'
                    })
                    let enj = await enj_promise.json();
                    store.arrivee = enj;
                    //Coordinates of the "enjeu" we clicked on
                    let long_enj = enj.features[0].geometry.coordinates[0][0][0][0];
                    let lat_enj = enj.features[0].geometry.coordinates[0][0][0][1];
                    //Getting the closest vertex's coordinates
                    let params2 = { long: long_enj, lat: lat_enj };
                    let vertex_promise = await fetch(host + 'routing/getNearestVertex', {
                        body: JSON.stringify(params2),
                        headers: { 'Content-Type': 'application/json' },
                        method: 'post'
                    })
                    let vertex_enj = await vertex_promise.json();
                    //Registering the id of the vertex
                    id_vertex_enjeu = vertex_enj.id;


                    //Getting the closest fire house
                    let params3 = { geometry: enj.features[0].geometry, scenario: scenario.toLowerCase() };
                    let caserne_promise = await fetch(host + 'data/getClosestFireHouse', {
                        body: JSON.stringify(params3),
                        headers: { 'Content-Type': 'application/json' },
                        method: 'post'
                    })
                    let caserne = await caserne_promise.json();
                    //Displaying the closest fire House
                    let parameters_cas = { filters: [caserne.id.toString()], columnFiltered: "id", color: "purple", concernedByScenario: scenario }
                    api2itowns.addLayerToView(view, "def", parameters_cas, where = "sec");
                    store.depart = caserne;
                    //Closest Fire House's coordinates
                    let long_caserne = caserne.geometry.coordinates[0][0][0][0];
                    let lat_caserne = caserne.geometry.coordinates[0][0][0][1];
                    let params4 = { long: long_caserne, lat: lat_caserne };
                    let vertex_cas_promise = await fetch(host + 'routing/getNearestVertex', {
                        body: JSON.stringify(params4),
                        headers: { 'Content-Type': 'application/json' },
                        method: 'post'
                    })
                    let vertex_cas = await vertex_cas_promise.json();
                    //Registering the id of the vertex
                    id_vertex_caserne = vertex_cas.id;

                    //Finding shortest path between the two vertices
                    //We suppose the source is the fire house and the target is the "enjeu" we clicked on
                    let params5 = { source: id_vertex_caserne, target: id_vertex_enjeu, scenario: scenario.toLowerCase() };
                    let iti_promise = await fetch(host + 'routing/getShortestPath', {
                        body: JSON.stringify(params5),
                        headers: { 'Content-Type': 'application/json' },
                        method: 'post'
                    })
                    let iti = await iti_promise.json();
                    //Sorting itinerary steps
                    iti.sort(sorter('seq'));
                    store.itineraire = iti;
                    store.displayIti = true;
                    let ids = [];
                    iti.forEach(route => {
                        ids.push(route.id.toString());
                    });
                    let parameters = {
                        filters: ids, columnFiltered: "uuid", color: "yellow", concernedByScenario: scenario

                    };

                    api2itowns.addLayerToView(view, "trans_l_flat", parameters, where = "sec");

                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
//Clean names for "enjeu" properties
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

export default api2itowns;