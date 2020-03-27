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
  console.log(p);
  return { path: p, data: fs.readFileSync(p, "utf8") };
});
