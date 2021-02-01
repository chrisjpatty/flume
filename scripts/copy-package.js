const { readFileSync, writeFileSync } = require('fs')

const main = () => {
  const pkg = readFileSync("package.json", { encoding: "utf8" }).replace(/dist\//g, "")
  writeFileSync("dist/package.json", pkg, { encoding: "utf8"})
}

main()