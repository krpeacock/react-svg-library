const fs = require("fs");
const HTMLtoJSX = require("htmltojsx");
const pascalcase = require("pascalcase");
const Handlebars = require("handlebars");
const prettier = require("prettier");

const compileIcons = async () => {
  return new Promise((resolve, reject) => {
    let icons = [];

    // Read svgs directory
    const fileList = fs.readdirSync(__dirname + "/svgs/", "utf8");

    // Add data to output
    fileList.forEach(file => {
      const fileName = file.split(".")[0];
      let buffer = "";
      fs.readFile(`${__dirname}/svgs/${file}`, (err, data) => {
        if (err) reject(err);
        // Convert to JSX class
        buffer += data;
        let converter = new HTMLtoJSX({
          createClass: false
        });
        let response = {
          name: pascalcase(fileName),
          icon: converter.convert(buffer)
        };
        icons.push(response);
        // Check if all files have been added to icons
        if (icons.length === fileList.length) {
          resolve(icons);
        }
      });
    });
  });
};

async function compile() {
  const icons = await compileIcons();
  var fileStructure = fs.readFileSync(__dirname + "/file-template.txt", "utf8");

  let fileTemplate = Handlebars.compile(fileStructure);

  // Autoformat the generated template with prettier
  var result = prettier.format(fileTemplate({ icons }));
  fs.writeFile(__dirname + "/Icons.js", result, () => {
    console.log("successfully wrote to Icons.js");
  });
}

compile();
