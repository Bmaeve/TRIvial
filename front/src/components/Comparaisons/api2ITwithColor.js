const host = 'http://localhost:3000/'
import { FileSource, THREE, Style, FeatureGeometryLayer } from "../../../node_modules/itowns/dist/itowns";

let api2itowns = {
    addLayerToView(view, table_name, parameters, color) {

        fetch(host + 'data/' + table_name + '/selectData', {
            body: JSON.stringify(parameters),
            headers: { 'Content-Type': 'application/json' },
            method: 'post'
        })
            .then(res => res.json())
            .then(data => {
                let newLayer = new FeatureGeometryLayer(table_name, {
                    // Use a FileSource to load a single file once
                    source: new FileSource({
                        fetchedData: data,
                        crs: 'EPSG:2154',
                        format: 'application/json',
                    }),
                    transparent: true,
                    opacity: 0.7,
                    style: new Style({
                        fill: {
                            color: new THREE.Color(color),
                            base_altitude: 1,
                            extrusion_height: setExtrusions,
                        }
                    })
                });
                view.addLayer(newLayer);
            })
    }
}

function setExtrusions(properties) {
    return properties.hauteur;
}

/*function set_base_altitude(properties) {
    return (properties.z_max + properties.z_min) / 2
}*/


export default api2itowns;