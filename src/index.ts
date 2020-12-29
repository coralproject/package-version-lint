import yargs from "yargs";
import fs from "fs";
import path from "path";

function readJSON(path: string) {
  if (!fs.existsSync(path)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(path, "utf8")) as Package;
}

const pkg = readJSON(path.join(__dirname, "..", "package.json"));
const version = pkg ? pkg.version : "";

const { argv } = yargs
  .usage(
    "package-version-lint: checks that your package.json and package-lock.json are in sync"
  )
  .help("help")
  .alias("help", "h")
  .version("version", version)
  .alias("version", "v")
  .options({
    expect: {
      type: "string",
      description:
        "the version that the package.json should be checked against",
    },
  });

interface Package {
  version: string;
}

function compare() {
  // Open the package.json file and parse it.
  const pkg = readJSON("package.json");
  if (!pkg) {
    console.error(
      "could not find package.json, are you running this from your package root?"
    );
    process.exit(1);
  }

  // Open the package-lock.json file and parse it.
  const lock = readJSON("package-lock.json");
  if (lock && pkg.version !== lock.version) {
    console.error(
      "package.json version does not match package-lock.json version"
    );
    process.exit(1);
  }

  if (argv.expect && pkg.version !== argv.expect) {
    console.error(
      `expected to find version ${argv.expect} but instead got ${pkg.version}`
    );
    process.exit(1);
  }
}

compare();
