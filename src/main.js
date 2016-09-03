require("expose?lebab!lebab");

function initiate() {
  var timeout = 0;

  function transform(code) {
    return lebab.transform(code, [
      'let',
      'class',
      'template',
      'default-param',
      'arrow',
      'for-of',
      'arg-spread',
      'obj-method',
      'obj-shorthand',
      'no-strict',
      'commonjs',
    ]).code;
  }

  var editor = ace.edit("editor");
  var highlighter = ace.edit("highlighter");

  function transpile(code) {
    highlighter.setValue(transform(code), -1);
    localStorage.code = editor.getValue();
  }

  editor.session.setOptions({
    mode: "ace/mode/javascript",
    tabSize: 2,
    useSoftTabs: true
  });

  editor.setTheme("ace/theme/monokai");
  editor.getSession().on('change', function () {
    try {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        transpile(editor.getValue());
      }, 500);
    } catch (err) {
      console.error(err);
    }
  });

  highlighter.setTheme("ace/theme/monokai");
  highlighter.getSession().setMode("ace/mode/javascript");
  highlighter.setReadOnly(true);

  var initCode;

  if (localStorage.code) {
    initCode = localStorage.code;
  } else {
    initCode = "'use strict';\n\n// Let/const\nvar name = 'Bob', time = 'yesterday';\ntime = 'today';\n\n// Template string\nconsole.log('Hello ' + name + ', how are you ' + time + '?');\n\nvar bob = {\n  // Object shorthand\n  name: name,\n  // Object method\n  sayMyName: function () {\n    console.log(this.name);\n  }\n};\n\n// Classes\nvar SkinnedMesh = function SkinnedMesh() {\n};\n\nSkinnedMesh.prototype.update = function (camera) {\n  camera = camera || createCamera();\n  this.camera = camera;\n};\n\nObject.defineProperty(SkinnedMesh.prototype, 'name', {\n  set: function (geometry) {\n    this.geometry = geometry;\n  },\n  get: function () {\n    return this.geometry;\n  }\n});\n\n// Commonjs\nvar lebab = require('lebab');\nmodule.exports = SkinnedMesh;\n\n// Arrow functions\nvar render = function () {\n  // ...\n  requestAnimationFrame(render);\n};";
  }

  transpile(initCode);
  editor.setValue(initCode, -1);
}
