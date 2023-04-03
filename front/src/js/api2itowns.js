const host = 'http://localhost:3000/'
import { FileSource, THREE, Style, FeatureGeometryLayer } from "../../node_modules/itowns/dist/itowns";

let api2itowns = {
    addLayerToView(view, table_name, parameters = {}, color = undefined) {

        if (color == undefined) {
            color = new THREE.Color(Math.random() * 0xffffff)
        }

        fetch(host + 'data/' + table_name + '/selectData', {
            body: JSON.stringify(parameters),
            headers: { 'Content-Type': 'application/json' },
            method: 'post'
        })
            .then(res => res.json())
            .then(data => {
                let newLayer;
                let source = new FileSource({
                    fetchedData: data,
                    crs: 'EPSG:2154',
                    format: 'application/json',
                });
                if (table_name == "scenarios") {
                    newLayer = new FeatureGeometryLayer(table_name, {
                        transparent: true,
                        source: source,
                        style: new Style({
                            fill: {
                                color: 'orange',
                                opacity: 0.5,
                                base_altitude: setAltitude,
                                extrusion_height: 50
                            },
                            stroke: {
                                color: 'white',
                            },
                        }),
                    });
                } else {
                    newLayer = new FeatureGeometryLayer(table_name, {
                        // Use a FileSource to load a single file once
                        source: source,
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
            this.addLayerToView(view, table, parameters[table].filters, parameters[table].color);
        })
    }

}

function setExtrusions(properties) {
    return properties.hauteur;
}

function setAltitude(properties) {
    return properties.z_min - properties.hauteur;
}

export default api2itowns;