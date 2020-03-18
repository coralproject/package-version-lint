# package-version-lint

This is a simple linter that compares your `version` in your `package.json` and
`package-lock.json` file (if it exists) to ensure that they are up to date. It
also comes with a `--expect` flag that can be used to verify a specific version.

## Usage

To run standalone and verify that the package versions are in sync, use:

```sh
npx @coralproject/package-version-lint
```

Or to verify a specific version:

```sh
npx @coralproject/package-version-lint --expect 1.0.2
```

If using in CI (this example uses CircleCI), you can use a combination of the
`--expect` flag and [shell parameter expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html) to do the following:

```sh
CIRCLE_TAG=v1.0.2
npx @coralproject/package-version-lint --expect ${CIRCLE_TAG/#v}
```

The `${CIRCLE_TAG/#v}` will take the variable, `CIRCLE_TAG` and strip the
leading `v` from it, leaving us with `1.0.2` which can be used with the
`--expect` flag. This can be used with any other CI that provides the tag in the
environment.
