import React from "react";
import logo from "./logo.svg";
import "./App.css";
import preval from "preval.macro";
import ReactMarkdown from "react-markdown";

const data = preval`
const fs = require("fs");
const path = require("path");
const getAllFiles = (dirPath, arrayOfFiles = []) => {
  return fs.readdirSync(dirPath).reduce((acc, f) => {
    return acc.concat(
      fs.statSync(path.join(dirPath, f)).isDirectory()
        ? getAllFiles(path.join(dirPath, f), arrayOfFiles)
        : path.join(dirPath, f)
    );
  }, arrayOfFiles);
};

const directoryPath = path.join(__dirname, "faq");
module.exports = getAllFiles(directoryPath).map(p => {
  return { path: p, data: fs.readFileSync(p, "utf8") };
});
`;

console.log(data);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {data.map((obj: { path: string; data: string }) => {
          // const Component = mdx(obj.data);
          // console.log(Component);
          return <ReactMarkdown key={obj.path} source={obj.data} />;
        })}
      </header>
    </div>
  );
}

export default App;
