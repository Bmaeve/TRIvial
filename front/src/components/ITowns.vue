<template>
  <div id="viewerDiv">

  </div>
</template>

<script>
import { FileSource, THREE, proj4, Extent, PlanarView, WMSSource, ColorLayer, ElevationLayer, Style, FeatureGeometryLayer } from "../../node_modules/itowns/dist/itowns";

export default {
  name: 'MyItowns',
  mounted() {
    // Retrieve the view container
    const viewerDiv = document.getElementById('viewerDiv');

    // Define the view geographic extent
    proj4.defs(
      'EPSG:2154',
      '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    );
    const viewExtent = new Extent(
      'EPSG:2154',
      644500.0, 659499.99,
      6857500.0, 6867499.99,
    );

    // Define the camera initial placement
    const placement = {
      coord: viewExtent.center(),
      tilt: 12,
      heading: 40,
      range: 16000,
    };

    // Create the planar view
    const view = new PlanarView(viewerDiv, viewExtent, {
      placement: placement,
    });

    // Define the source of the ortho-images
    const sourceOrtho = new WMSSource({
      url: "https://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/r/wms",
      name: "HR.ORTHOIMAGERY.ORTHOPHOTOS",
      format: "image/png",
      crs: 'EPSG:2154',
      extent: viewExtent,
    });
    // Create the ortho-images ColorLayer and add it to the view
    const layerOrtho = new ColorLayer('Ortho', { source: sourceOrtho });
    view.addLayer(layerOrtho);

    // Define the source of the dem data
    const sourceDEM = new WMSSource({
      url: "https://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/r/wms",
      name: "ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES",
      format: "image/x-bil;bits=32",
      crs: 'EPSG:2154',
      extent: viewExtent,
    });
    // Create the dem ElevationLayer and add it to the view
    const layerDEM = new ElevationLayer('DEM', { source: sourceDEM });
    view.addLayer(layerDEM);


// Static Json solution

    function setExtrusion(properties) {
      return properties.HAUTEUR;
    }
    function setColor() {
      return new THREE.Color(0xff0000);
    }
    const batsource = new FileSource({
      url: "http://localhost:3000/",
      crs: 'EPSG:2154',
      format: 'application/json',
    });

    let basic = new FeatureGeometryLayer('basic', {
      // Use a FileSource to load a single file once
      source: batsource,
      transparent: true,
      opacity: 0.7,
      //zoom: { min: 10 },
      style: new Style({
        fill: {
          color: setColor,
          base_altitude: 28,
          extrusion_height: setExtrusion,
        }
      })
    });


    view.addLayer(basic);




// Api rest solution  

fetch('http://localhost:3000/getBatis').then(res => res.json()).then(data =>{

function setExtrusions(properties) {
return properties.hauteur;
}

let marne = new FeatureGeometryLayer('Marne', {
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
       view.addLayer(marne);
})

  }
}
</script>


<style scoped>
#viewerDiv {
  margin: auto;
  height: 800px;
  width: 100%;
  padding: 0;
}
</style>
