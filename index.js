#!/usr/bin/env node
"use strict";

const program = require("commander");
const workflow = require("./lib/workflow");
const packageJson = require("./package.json");

program
  .version(packageJson.version)
  .command("convertLocal [inputDirectory]")
  .description(
    "Converts Medium exported html files to markdown from a local directory."
  )
  .option("-d, --drafts", "Convert drafts too.")
  .option("-f, --frontMatter", "Add front-matter.")
  .option("-i, --images", "Download images at default path.")
  .option("-op, --path <path>", "Custom path for saving markdown files.")
  .option("-ip, --img-path <imgpath>", "Custom path for downloading images.")
  .option("-ip-alias, --img-path-alias <imgpath>", "Override generated image paths in content markdown with this alias which is different from downloaded images.")
  .option("-ip-featured, --img-path-featured <img>", "Use this directory to refer to featured images")
  .action(workflow.processAll);

// Convert from url has been removed.
// Medium posts seem to have updated (random) css classes and html attributes,
// and the reader is unable to extract the article content from the html body.

// program
//     .version(packageJson.version)
//     .command('convertUrl [url]')
//     .description('Converts Medium post to markdown from its url.')
//     .option('-o, --outputDir <>', 'Output directory path.')
//     .option('-f, --frontMatter', 'Add front-matter.')
//     .option('-i, --images', 'Download images in local directory.')
//     .action(workflow.processSingle);

// eslint-disable-next-line no-undef
program.parse(process.argv);
