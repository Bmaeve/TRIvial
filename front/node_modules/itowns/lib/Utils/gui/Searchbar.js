"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));

var _Fetcher = _interopRequireDefault(require("../../Provider/Fetcher"));

var _Widget2 = _interopRequireDefault(require("./Widget"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

var DEFAULT_OPTIONS = {
  width: 300,
  height: 38,
  position: 'top',
  maxSuggestionNumber: 10,
  fontSize: 16,
  placeholder: 'Search location'
};

function addActive(htmlElements, index) {
  var _htmlElements$index;

  if (!htmlElements) {
    return index;
  }

  removeAllActives(htmlElements);

  if (index >= htmlElements.length) {
    index = 0;
  } else if (index < 0) {
    index = htmlElements.length - 1;
  }

  (_htmlElements$index = htmlElements[index]) === null || _htmlElements$index === void 0 ? void 0 : _htmlElements$index.classList.add('active');
  return index;
}

function removeAllActives(htmlElements) {
  for (var i = 0; i < htmlElements.length; i++) {
    htmlElements[i].classList.remove('active');
  }
}

function eraseSuggestionList(form) {
  while (form.children.length > 1) {
    form.removeChild(form.lastChild);
  }
}
/**
 * A widget for searchbar
 *
 * To use it, you need to link the widgets' stylesheet to your html webpage. This stylesheet is included in
 * [itowns bundles](https://github.com/iTowns/itowns/releases) if you downloaded them, or it can be found in
 * `node_modules/itowns/examples/css` if you installed iTowns with npm. Otherwise, it can be found at
 * [this link](https://raw.githubusercontent.com/iTowns/itowns/master/examples/css/widgets.css). See
 * [this example](http://www.itowns-project.org/itowns/examples/#widgets_searchbar) for more details.
 *
 * @extends Widget
 *
 * @property    {HTMLElement}   domElement      An html div containing the searchbar.
 * @property    {HTMLElement}   parentElement   The parent HTML container of `this.domElement`.
 */


var _onSelected = /*#__PURE__*/new WeakMap();

var Searchbar = /*#__PURE__*/function (_Widget) {
  (0, _inherits2["default"])(Searchbar, _Widget);

  var _super = _createSuper(Searchbar);

  /**
   * @param   {View}          view                                    The iTowns view the searchbar should be linked
                                                                      * to.
   *
   * @param   {Object}        geocodingOptions                        Configuration for geocoding.
   * @param   {URL}           geocodingOptions.url                    The URL of a geocoding service that should be
                                                                      * used to build suggestions.
   * @param   {function}      geocodingOptions.parser                 A method to parse fetched results from geocoding
                                                                      * url into a Map object. For each entry of this
                                                                      * Map, the key must be a string that will be
                                                                      * displayed as the html content of each
                                                                      * suggestion bellow the searchbar. The value
                                                                      * associated to the key is whatever the user
                                                                      * wants. The value is the parameter that is
                                                                      * passed to the `onSelected` method (specified
                                                                      * in another `geocodingOptions` parameter).
   * @param   {function}      [geocodingOptions.onSelected]           A method which describes what should be done
                                                                      * when user selects a location (by clicking or
                                                                      * hitting enter on a suggestion). The only
                                                                      * parameter of this method is the value mapped
                                                                      * with `geocodingOptions.parser` method.
   *
   * @param   {Object}        [options]                               The searchbar optional configuration.
   * @param   {HTMLElement}   [options.parentElement=view.domElement] The parent HTML container of the div which
                                                                      * contains searchbar widgets.
   * @param   {number}        [options.size]                          The size of the searchbar. It is a number that
                                                                      * describes both width and height in pixels of
                                                                      * the searchbar.
   * @param   {number}        [options.width=300]                     The width in pixels of the searchbar.
   * @param   {number}        [options.height=38]                     The height in pixels of the searchbar.
   * @param   {string}        [options.position='top']                Defines which position within the
                                                                      * `parentElement` the searchbar should be
                                                                      * displayed to. Possible values are `top`,
                                                                      * `bottom`, `left`, `right`, `top-left`,
                                                                      * `top-right`, `bottom-left` and `bottom-right`.
                                                                      * If the input value does not match one of
                                                                      * these, it will be defaulted to `top`.
   * @param   {Object}        [options.translate]                     An optional translation of the searchbar.
   * @param   {number}        [options.translate.x=0]                 The searchbar translation along the page x-axis.
   * @param   {number}        [options.translate.y=0]                 The searchbar translation along the page y-axis.
   * @param   {number}        [options.fontSize=16]                   The font size in pixel of the searchbar content.
   * @param   {number}        [options.maxSuggestionNumber=10]        The maximum number of suggestions that should
                                                                      * appear under the searchbar.
   * @param   {string}        [options.placeholder='Search location'] The placeholder that appears in the searchbar
                                                                      * when nothing has yet been typed.
   */
  function Searchbar(view, geocodingOptions) {
    var _geocodingOptions$onS;

    var _this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2["default"])(this, Searchbar);
    // ---------- BUILD PROPERTIES ACCORDING TO DEFAULT OPTIONS AND OPTIONS PASSED IN PARAMETERS : ----------
    _this = _super.call(this, view, options, DEFAULT_OPTIONS); // Check if `geocodingOptions` parameter was correctly specified.

    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _onSelected, {
      writable: true,
      value: void 0
    });

    if (!geocodingOptions || !geocodingOptions.url || !geocodingOptions.parser || typeof geocodingOptions.parser !== 'function') {
      throw new Error('\'geocodingOptions\' parameter for \'Searchbar\' constructor is not a valid option. Please refer to ' + 'the documentation.');
    }

    (0, _classPrivateFieldSet2["default"])((0, _assertThisInitialized2["default"])(_this), _onSelected, (_geocodingOptions$onS = geocodingOptions.onSelected) !== null && _geocodingOptions$onS !== void 0 ? _geocodingOptions$onS : function () {}); // ---------- this.domElement SETTINGS SPECIFIC TO SEARCHBAR : ----------

    _this.domElement.id = 'widgets-searchbar';
    _this.domElement.style.height = 'auto';
    var form = document.createElement('form');
    form.setAttribute('autocomplete', 'off');
    form.id = 'searchbar-autocompletion-form';

    _this.domElement.appendChild(form);

    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'mySearch');
    input.setAttribute('placeholder', options.placeholder || DEFAULT_OPTIONS.placeholder);
    input.style.height = "".concat(options.height || options.size || DEFAULT_OPTIONS.height, "px");
    input.style.fontSize = "".concat(options.fontSize || DEFAULT_OPTIONS.fontSize, "px");
    form.appendChild(input); // currentFocus variable stores the index of the suggestions that is focused by user, either with mouse or arrow
    // keys.

    var currentFocus; // ----------  BUILD AUTOCOMPLETION SUGGESTIONS LIST WHEN TYPING THE SEARCHBAR INPUT : ----------

    input.addEventListener('input', function () {
      var value = input.value; // Close any already opened list of autocompleted values

      eraseSuggestionList(form);
      currentFocus = -1;

      if (!value) {
        return false;
      }

      geocodingOptions.url.searchParams.set('text', value);

      _Fetcher["default"].json(geocodingOptions.url).then(function (geocodingResult) {
        var result = geocodingOptions.parser(geocodingResult);
        var i = 0;
        result.forEach(function (info, location) {
          // Stop looping through the map if enough location have been proceeded.
          if (i === Math.min(result.size, options.maxSuggestionNumber || DEFAULT_OPTIONS.maxSuggestionNumber)) {
            return;
          }

          var mapIndex = i;
          i++;
          var index = location.toUpperCase().indexOf(value.toUpperCase());

          if (index > -1) {
            var autocompleteItem = document.createElement('div');
            autocompleteItem.style.minHeight = input.style.height;
            autocompleteItem.style.fontSize = "".concat(options.fontSize || DEFAULT_OPTIONS.fontSize, "px"); // Make the matching letters bold.

            var start = location.slice(0, index);
            var bold = location.slice(index, index + value.length);
            var end = location.slice(index + value.length, location.length);
            autocompleteItem.innerHTML = "<p>".concat(start, "<strong>").concat(bold, "</strong>").concat(end, "</p>"); // Store the current location value as an attribute of autocompleteItem div.

            autocompleteItem.setAttribute('location', location);
            form.appendChild(autocompleteItem); // eslint-disable-next-line no-loop-func

            autocompleteItem.addEventListener('mouseover', function () {
              removeAllActives(form.children);
              currentFocus = mapIndex;
              autocompleteItem.classList.add('active');
            });
            autocompleteItem.addEventListener('click', function () {
              (0, _classPrivateFieldGet2["default"])((0, _assertThisInitialized2["default"])(_this), _onSelected).call((0, _assertThisInitialized2["default"])(_this), info);
              input.value = autocompleteItem.getAttribute('location');
              eraseSuggestionList(form);
            });
          }
        });
      });
    }); // ---------- MANAGE KEYBOARD INTERACTIONS ON AUTOCOMPLETION SUGGESTIONS : ----------
    // When searchbar is positioned at the bottom of the screen (therefore is a flex with `column-reverse`
    // direction, we must exchange up and down arrow actions.

    var topOrBottom = (options.position || DEFAULT_OPTIONS.position).includes('top') ? 1 : -1;
    input.addEventListener('keydown', function (event) {
      event.stopPropagation();
      var completionSuggestions = form.getElementsByTagName('div');

      switch (event.code) {
        case 'Escape':
          eraseSuggestionList(form);
          input.value = '';
          view.domElement.focus();
          break;

        case 'ArrowDown':
          event.preventDefault();
          currentFocus = addActive(completionSuggestions, currentFocus + topOrBottom);
          break;

        case 'ArrowUp':
          event.preventDefault();
          currentFocus = addActive(completionSuggestions, currentFocus - topOrBottom);
          break;

        case 'Enter':
          event.preventDefault();

          if (completionSuggestions[Math.max(currentFocus, 0)]) {
            completionSuggestions[Math.max(currentFocus, 0)].click();
            view.domElement.focus();
          }

          break;

        default:
          break;
      }
    }); // ---------- MANAGE FOCUS AND ACTIVE SUGGESTION WHEN USER ENTERS OR LEAVES THE SEARCHBAR : ----------
    // User clicks the searchbar.

    input.addEventListener('focus', function () {
      form.classList.add('focus');
    }); // User clicks out of the searchbar.

    input.addEventListener('blur', function () {
      form.classList.remove('focus');
      removeAllActives(form.children);
    }); // Cursor leaves the searchbar.

    form.addEventListener('mouseleave', function () {
      removeAllActives(form.children);
      currentFocus = -1;
    });
    return _this;
  }

  return (0, _createClass2["default"])(Searchbar);
}(_Widget2["default"]);

var _default = Searchbar;
exports["default"] = _default;