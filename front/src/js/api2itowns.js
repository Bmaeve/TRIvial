const host = 'http://localhost:3000/'
import { ColorLayer } from "itowns";
import { FileSource, THREE, Style, FeatureGeometryLayer, proj4 } from "../../node_modules/itowns/dist/itowns";
import { toWgs84 } from "reproject";
let epsg = require('epsg');
//let counter = 0

let index = {}
let last_parameters = {}

let api2itowns = {
    async addLayerToView(view, table_name, parameters = {}) {
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
                                color: color,
                                opacity: 0.5
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
                        transparent: true,
                        opacity: 0.7,
                        style: new Style({
                            fill: {
                                color: color,
                                base_altitude: 5,
                                extrusion_height: setExtrusions,
                            }
                        })
                    });
                }



                view.getLayers().forEach((l) => {
                    // if the table is updated, remove the previous layer 

                    if (table_name + '_' + (index[table_name] - 1).toString() == l.id) {

                        view.removeLayer(table_name + '_' + (index[table_name] - 1).toString(), true);
                    }
                })

                // add the layer to the view
                view.addLayer(newLayer);
            })

        return promise;
    },

    addEnjeuxToView(view, parameters) {
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
                let promise = this.addLayerToView(view, new_table, parameters[new_table]);
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

/*function setAltitude(properties) {
    return properties.z_median;
}*/

export default api2itowns;