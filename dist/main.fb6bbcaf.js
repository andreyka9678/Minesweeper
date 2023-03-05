// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/getRandom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRandom = generateRandom;
function generateRandom() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var difference = max - min;
  var rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}
},{}],"js/box.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBox = createBox;
var _matrix = require("./matrix.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var appElem = document.getElementById('app');
var Box = /*#__PURE__*/function () {
  function Box(isBomb, coordinates) {
    _classCallCheck(this, Box);
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }
  _createClass(Box, [{
    key: "setBoxValue",
    value: function setBoxValue(value) {
      this.value = value;
    }
  }, {
    key: "setBoxType",
    value: function setBoxType() {
      if (this.isBomb) {
        this.setBoxValue("💣");
        return;
      }
      var allNeighbors = (0, _matrix.getAllNeighbors)(this.coordinates);
      var bombCount = 0;
      allNeighbors.forEach(function (neighbor) {
        if (neighbor === 1 || neighbor.isBomb) {
          bombCount++;
        }
      });
      if (bombCount) {
        this.setBoxValue(bombCount);
      }
    }
  }, {
    key: "showBoxValue",
    value: function showBoxValue() {
      this.boxElem.innerHTML = this.value || "";
    }
  }, {
    key: "setFlag",
    value: function setFlag(isFlagged) {
      this.isFlagged = isFlagged;
      this.boxElem.innerHTML = isFlagged ? "🚩" : "";
    }
  }, {
    key: "open",
    value: function open() {
      this.isOpenned = true;
      this.boxElem.classList.remove("initial");
      this.showBoxValue();
    }
  }, {
    key: "onBoxClick",
    value: function onBoxClick() {
      var allowOpenNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (this.isFlagged) {
        this.setFlag(false);
        return;
      }
      if (!this.value && !this.isOpenned) {
        this.open();
        var allNeighbors = (0, _matrix.getAllNeighbors)(this.coordinates);
        allNeighbors.forEach(function (neighbor) {
          if (!neighbor.isOpenned) {
            neighbor.onBoxClick(true);
          }
        });
      } else if (this.value && allowOpenNumber || typeof this.value === "number") {
        this.open();
      } else if (this.isBomb) {
        (0, _matrix.openAllBoxes)();
      }
      this.showBoxValue();
    }
  }, {
    key: "createBoxOnArea",
    value: function createBoxOnArea() {
      var _this = this;
      var boxElem = document.createElement("div");
      boxElem.classList.add("box");
      boxElem.classList.add("initial");
      if (this.value) {
        boxElem.classList.add("bomb-count-".concat(this.value));
      }
      this.boxElem = boxElem;
      this.boxElem.addEventListener("click", function () {
        return _this.onBoxClick();
      });
      this.boxElem.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        _this.setFlag(true);
      });
      appElem.appendChild(boxElem);
    }
  }]);
  return Box;
}();
function createBox(isBomb, coordinates) {
  var newBox = new Box(isBomb, coordinates);
  newBox.setBoxType();
  newBox.createBoxOnArea();
  return newBox;
}
},{"./matrix.js":"js/matrix.js"}],"js/matrix.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMatrix = createMatrix;
exports.getAllNeighbors = getAllNeighbors;
exports.matrix = void 0;
exports.openAllBoxes = openAllBoxes;
var _getRandom = require("./getRandom.js");
var _box = require("./box.js");
var matrix = [];
exports.matrix = matrix;
var size = 16;
var appElem = document.getElementById('app');
function addBombs(bombCount) {
  var currentBombCount = bombCount;
  var matrixHeight = matrix.length;
  var matrixWidth = matrix[0].length;
  while (currentBombCount) {
    var x = (0, _getRandom.generateRandom)(0, matrixWidth - 1);
    var y = (0, _getRandom.generateRandom)(0, matrixHeight - 1);
    var matrixElem = matrix[x][y];
    if (!matrixElem) {
      matrix[x][y] = 1;
      currentBombCount--;
    }
  }
}
function getAllNeighbors(coordinates) {
  var _matrix, _matrix2, _matrix$y, _matrix3, _matrix4, _matrix5, _matrix$y2, _matrix6;
  var x = coordinates.x,
    y = coordinates.y;
  var n_1 = (_matrix = matrix[y - 1]) === null || _matrix === void 0 ? void 0 : _matrix[x];
  var n_2 = (_matrix2 = matrix[y - 1]) === null || _matrix2 === void 0 ? void 0 : _matrix2[x + 1];
  var n_3 = (_matrix$y = matrix[y]) === null || _matrix$y === void 0 ? void 0 : _matrix$y[x + 1];
  var n_4 = (_matrix3 = matrix[y + 1]) === null || _matrix3 === void 0 ? void 0 : _matrix3[x + 1];
  var n_5 = (_matrix4 = matrix[y + 1]) === null || _matrix4 === void 0 ? void 0 : _matrix4[x];
  var n_6 = (_matrix5 = matrix[y + 1]) === null || _matrix5 === void 0 ? void 0 : _matrix5[x - 1];
  var n_7 = (_matrix$y2 = matrix[y]) === null || _matrix$y2 === void 0 ? void 0 : _matrix$y2[x - 1];
  var n_8 = (_matrix6 = matrix[y - 1]) === null || _matrix6 === void 0 ? void 0 : _matrix6[x - 1];
  return [n_1, n_2, n_3, n_4, n_5, n_6, n_7, n_8].filter(function (item) {
    return typeof item !== 'undefined';
  });
}
function openAllBoxes() {
  matrix.forEach(function (matrixLine) {
    matrixLine.forEach(function (box) {
      if (box.isBomb) {
        box.open();
      }
    });
  });
}
function setTimer() {
  timerId = setInterval(function () {
    elapsedTime += 1;
    document.getElementById('timer').innerText = elapsedTime.toString().padStart(3, '0');
  }, 1000);
}
;

//   function loadTemplate() {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", "minesweeper_template.html", false);
//     xhr.send();

//     if (xhr.status != 200)
//         return;

//     let wrapper = document.createElement("div");
//     wrapper.innerHTML = xhr.responseText;
//     return wrapper.firstElementChild;
//   }

function buildTable() {
  var topRow = "\n        <tr>\n        <td class=\"menu\" colspan=\"".concat(size, "\">\n            <section id=\"status-bar\">\n              <div id=\"bomb-counter\">000</div>\n              <div id=\"reset\"><img src=\"../images/smiley-face.png\"></div>\n              <div id=\"timer\">000</div>\n            </section>\n        </td>\n      </tr>\n      ");
  appElem.innerHTML = topRow + "<tr>".concat('<td class="game-cell"></td>'.repeat(size), "</tr>").repeat(size);
  // appElem.style.width = sizeLookup[size].tableWidth;
  // createResetListener();
  var cells = Array.from(document.querySelectorAll('td:not(.menu)'));
  cells.forEach(function (cell, idx) {
    cell.setAttribute('data-row', Math.floor(idx / size));
    cell.setAttribute('data-col', idx % size);
  });
}
function createMatrix() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  var bombCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 40;
  // loadTemplate();
  buildTable();
  exports.matrix = matrix = Array.from({
    length: height
  }, function () {
    return Array.from({
      length: width
    }, function () {
      return 0;
    });
  });
  addBombs(bombCount);
  matrix.forEach(function (matrixLine, y) {
    matrixLine.forEach(function (matrixElem, x) {
      var newBox = (0, _box.createBox)(Boolean(matrixElem), {
        x: x,
        y: y
      });
      matrix[y][x] = newBox;
    });
  });
}
;
},{"./getRandom.js":"js/getRandom.js","./box.js":"js/box.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

var _matrix = require("./matrix.js");
function startGame() {
  (0, _matrix.createMatrix)();
}
startGame();
},{"./matrix.js":"js/matrix.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54729" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map