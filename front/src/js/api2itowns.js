const host = 'http://localhost:3000/'
import { FileSource, THREE, Style, FeatureGeometryLayer } from "../../node_modules/itowns/dist/itowns";

let api2itowns = {
    addLayerToView(view, table_name, parameters) {

        fetch(host + 'data/' + table_name + '/selectData', {
            body: JSON.stringify(parameters),
            headers: { 'Content-Type': 'application/json' },
            method: 'post'
        })
            .then(res => res.json())
            .then(data => {

                try {
                    view.removeLayer(table_name);
                } catch (e) {
                    // pass
                }

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
                            color: new THREE.Color(0xbbffbb),
                            base_altitude: 28,
                            extrusion_height: setExtrusions,
                        }
                    })
                });



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


export default api2itowns;