# @react-component-contrib/cli

This CLI can help developers quickly create component projects, and provide commands such as test, preview, packaging, etc.


## 🔨 Usage

1. Initialize project with `npx`
```bash
npx @react-component-contrib/cli init [name]
```

2. Initialize after install CLI
```bash
# 1. Install
npm install -g @react-component-contrib/cli

# 2. Initialize
rc-cli init [name]
```

**Notes**: `rc-cli` is the bin registered in the package.


## ⌨️ Commands

After initialization, enter the project, and you can use the following command to operate.

* `rc-cli start` - Run a server to debug your project.
* `rc-cli build` - Pack your code.
* `rc-cli test` - Test your code. Test support unit test and E2E test. E2E test is optional, you need to provide `--use-e2e` argument when running init command(`npx @react-component-contrib/cli init [name] --use-e2e`).
