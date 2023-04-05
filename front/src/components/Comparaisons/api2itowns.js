const host = 'http://localhost:3000/'
import { ColorLayer } from "itowns";
import { FileSource, THREE, Style, FeatureGeometryLayer, proj4 } from "../../../node_modules/itowns/dist/itowns";
import { toWgs84 } from "reproject";
let epsg = require('epsg');

let api2itowns = {
    addLayerToView(view, table_name, parameters = {}) {
        let color;
        if (parameters.color == undefined) {
            color = new THREE.Color(Math.random() * 0xffffff)
        } else {
            color = parameters.color
        }

        fetch(host + 'data/' + table_name + '/selectData', {
            body: JSON.stringify(parameters),
            headers: { 'Content-Type': 'application/json' },
            method: 'post'
        })
            .then(res => res.json())
            .then(data => {
                let newLayer;
                console.log(data)
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
                    newLayer = new FeatureGeometryLayer(table_name, {
                        // Use a FileSource to load a single file once
                        source: source,
                        transparent: true,
                        opacity: 0.7,
                        style: new Style({
                            fill: {
                                color: color,
                                base_altitude: 1,
                                extrusion_height: setExtrusions,
                            }
                        })
                    });
                }



                view.getLayers().forEach((l) => {
                    // if the table is updated, remove the previous layer 
                    if (table_name == l.id) {
                        view.removeLayer(table_name);
                    }
                })

                // add the layer to the view
                view.addLayer(newLayer);
            })
    },

    addEnjeuxToView(view, parameters) {
        Object.keys(parameters).forEach((table) => {
            this.addLayerToView(view, table, parameters[table]);
        })
    }

}

function setExtrusions(properties) {
    return properties.hauteur;
}

/*function setAltitude(properties) {
    return properties.z_min - properties.hauteur;
}*/

export default api2itowns;