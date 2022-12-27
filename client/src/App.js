"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_svg_1 = require("./assets/react.svg");
require("./App.css");
function App() {
    var _a = (0, react_1.useState)(0), count = _a[0], setCount = _a[1];
    return (<div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo"/>
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={react_svg_1["default"]} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={function () { return setCount(function (count) { return count + 1; }); }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>);
}
exports["default"] = App;