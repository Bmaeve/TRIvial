"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var WebGL = /*#__PURE__*/function () {
  function WebGL() {
    (0, _classCallCheck2["default"])(this, WebGL);
  }

  (0, _createClass2["default"])(WebGL, null, [{
    key: "isWebGLAvailable",
    value: function isWebGLAvailable() {
      try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    }
  }, {
    key: "isWebGL2Available",
    value: function isWebGL2Available() {
      try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
      } catch (e) {
        return false;
      }
    }
  }, {
    key: "getWebGLErrorMessage",
    value: function getWebGLErrorMessage() {
      return this.getErrorMessage(1);
    }
  }, {
    key: "getWebGL2ErrorMessage",
    value: function getWebGL2ErrorMessage() {
      return this.getErrorMessage(2);
    }
  }, {
    key: "getErrorMessage",
    value: function getErrorMessage(version) {
      var contexts = {
        1: window.WebGLRenderingContext,
        2: window.WebGL2RenderingContext
      };
      var message = 'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';
      var element = document.createElement('div');
      element.id = 'webglmessage';
      element.style.fontFamily = 'monospace';
      element.style.fontSize = '13px';
      element.style.fontWeight = 'normal';
      element.style.textAlign = 'center';
      element.style.background = '#fff';
      element.style.color = '#000';
      element.style.padding = '1.5em';
      element.style.width = '400px';
      element.style.margin = '5em auto 0';

      if (contexts[version]) {
        message = message.replace('$0', 'graphics card');
      } else {
        message = message.replace('$0', 'browser');
      }

      message = message.replace('$1', {
        1: 'WebGL',
        2: 'WebGL 2'
      }[version]);
      element.innerHTML = message;
      return element;
    }
  }]);
  return WebGL;
}();

var _default = WebGL;
exports["default"] = _default;