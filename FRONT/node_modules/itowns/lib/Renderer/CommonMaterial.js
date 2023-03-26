"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var THREE = _interopRequireWildcard(require("three"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = {
  setDefineMapping: function setDefineMapping(object, PROPERTY, mapping) {
    Object.keys(mapping).forEach(function (key) {
      object.defines["".concat(PROPERTY, "_").concat(key)] = mapping[key];
    });
  },
  setDefineProperty: function setDefineProperty(object, property, PROPERTY, initValue) {
    object.defines[PROPERTY] = initValue;
    Object.defineProperty(object, property, {
      get: function get() {
        return object.defines[PROPERTY];
      },
      set: function set(value) {
        if (object.defines[PROPERTY] != value) {
          object.defines[PROPERTY] = value;
          object.needsUpdate = true;
        }
      }
    });
  },
  setUniformProperty: function setUniformProperty(object, property, initValue) {
    object.uniforms[property] = new THREE.Uniform(initValue);
    Object.defineProperty(object, property, {
      get: function get() {
        return object.uniforms[property].value;
      },
      set: function set(value) {
        if (object.uniforms[property].value != value) {
          object.uniforms[property].value = value;
        }
      }
    });
  }
};
exports["default"] = _default;