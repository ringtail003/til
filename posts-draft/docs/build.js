const fs = require("fs");

const input = "./docs/_posts";
const output = "./docs/_data/sidebar.yml"

const list = fs
  .readdirSync(input)
  .map(dir => ({ title: dir, files: readFileList(dir)}));

writeFile(list);

function readFileList(path) {
  return fs.readdirSync(`${input}/${path}`).map(file => {
    return {
      title: readTitle(`${input}/${path}/${file}`),
      path: `${path}/${file}`,
    };
  });
}

function readTitle(path) {
  return fs.readFileSync(path, { encoding: "utf-8" })
    .toString()
    .match(/title: (?<title>\S+)\n/)
    .groups
    .title;
}

function writeFile(list) {
  let yaml = "docs:\n";

  list.forEach(dir => {
    yaml += 
      `- title: ${dir.title}\n` + 
      `  pages:\n`;

    dir.files.forEach(file => {
      yaml += 
        `    - title: ${file.title}\n` +
        `      url: ${file.path}\n`;
    });
  });

  fs.writeFileSync(output, yaml);
}
