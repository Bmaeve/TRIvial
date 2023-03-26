"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// next step is move these properties to Style class
// and hide transparent mechanism
function ReferLayerProperties(material, layer) {
  if (layer && layer.isGeometryLayer) {
    var transparent = material.transparent;
    material.layer = layer;

    if (material.uniforms && material.uniforms.opacity != undefined) {
      Object.defineProperty(material.uniforms.opacity, 'value', {
        get: function get() {
          return material.layer.opacity;
        }
      });
    } else if (material.opacity != undefined) {
      Object.defineProperty(material, 'opacity', {
        get: function get() {
          return material.layer.opacity;
        }
      });
    }

    Object.defineProperty(material, 'wireframe', {
      get: function get() {
        return material.layer.wireframe;
      }
    });
    Object.defineProperty(material, 'transparent', {
      get: function get() {
        if (transparent != material.layer.opacity < 1.0) {
          material.needsUpdate = true;
          transparent = material.layer.opacity < 1.0;
        }

        return transparent;
      }
    });
  }

  return material;
}

var _default = ReferLayerProperties;
exports["default"] = _default;