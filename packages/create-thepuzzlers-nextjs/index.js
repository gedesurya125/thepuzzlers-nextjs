#!/usr/bin/env node

const { exec } = require("shelljs");
const { Command } = require("commander");
const path = require("path");
const fs = require("fs-extra");
const program = new Command();
const packageJson = require("./package.json");

program
  .version(packageJson.version)
  .arguments("<project-name>")
  .description("Create a new project from Thepuzzlers-NextJs starter template")
  .action(async (projectName) => {
    const starterPath = path.resolve(
      __dirname,
      "./templates/thepuzzlers-nextjs-starter"
    );
    const targetPath = path.resolve(process.cwd(), projectName);

    console.log(`Creating a new project in ${targetPath}...`);
    try {
      await fs.copy(starterPath, targetPath);
      console.log("Template copied successfully!");
      console.log("Installing dependencies...");
      if (exec(`cd ${projectName} && yarn install`).code !== 0) {
        console.error("Error: Failed to install dependencies");
        process.exit(1);
      } else {
        console.log("Dependencies installed successfully!");
      }
    } catch (err) {
      console.error("Error: Failed to copy the template", err);
      process.exit(1);
    }
  });

program.parse(process.argv);
