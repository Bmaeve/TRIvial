"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = disposeThreeMaterial;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Find threejs textures from a material
 * @param {Material} material the threejs material holding textures
 * @returns {Array} an array of textures in the material
 */
function findTextures(material) {
  var textures = [];

  if (material.alphaMap) {
    textures.push(material.map);
  }

  if (material.aoMap) {
    textures.push(material.map);
  }

  if (material.bumpMap) {
    textures.push(material.bumpMap);
  }

  if (material.displacementMap) {
    textures.push(material.bumpMap);
  }

  if (material.emissiveMap) {
    textures.push(material.emissiveMap);
  }

  if (material.envMap) {
    textures.push(material.envMap);
  }

  if (material.lightMap) {
    textures.push(material.envMap);
  }

  if (material.map) {
    textures.push(material.map);
  }

  if (material.metalnessMap) {
    textures.push(material.map);
  }

  if (material.normalMap) {
    textures.push(material.map);
  }

  if (material.roughnessMap) {
    textures.push(material.map);
  }

  if (material.specularMap) {
    textures.push(material.specularMap);
  }

  return textures;
}
/**
 * Removes a material and its textures, memory will be freed.
 * IMPORTANT NOTE: the material and the texture must not be referenced by other threejs objects, otherwise the memory
 * won't be freed.
 * @param {Material} material the material to remove
 */


function disposeThreeMaterial(material) {
  var textures = findTextures(material); // Remove material

  if (Array.isArray(material)) {
    var _iterator = _createForOfIteratorHelper(material),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var m = _step.value;
        m.dispose();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    material.dispose();
  } // Remove textures


  for (var i = 0; i < textures.length; i++) {
    textures[i].dispose();
  }
}