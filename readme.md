# medium-2-md

A CLI tool that converts medium posts (html) into Jekyll/Hugo compatible markdown files. Also downloads images and adds yaml front matter to the converted markdown files.
It works with exported Medium posts (local html files) and converts them to markdown using a single command. It can be useful in scenarios when you want to migrate your blog away from Medium to Jekyll or Hugo (or something similar that supports markdown content).

## Install

### From npm

```sh
npm install -g medium-2-md
```

### Git repository clone

```sh
git clone 
npm install
node index.js <cli-flags...>
```

## How to use

### Typical usecase: Convert local Medium exports

1. Export and extract your Medium posts from your Medium account.
   1. Go to `https://medium.com/me/settings` and scroll to `Download your information`. Click the download button. This will give you a `medium-export.zip` archive containing all your Medium content.
   1. Extract the .zip archive downloaded in the previous step. It will have a sub-directory called `posts`.
   1. Copy the path of this `posts` directory.
1. Install `node.js` and `medium-2-md` on your system.
   1. Download and Install node.js - [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
   1. Install medium-2-md - `npm i -g medium-2-md`.
1. Run the following command to convert all your Medium posts (html) to markdown files,

```code
medium-2-md convertLocal '<path of the posts directory>' -dfi
```

That's it. The output markdown files will be stored in a sub-directory called `md_<a big number>` in the input posts directory itself. (By the way, that big number is coming from the Date.now() JavaScript function, added to differentiate multiple output folders.)

The converted markdown files include front matter containing title, description, published date and canonical URL of the original Medium post/story. The images from the Medium posts are downloaded in a sub-directory called `img` inside the output directory.

### Optional flags

The `convertLocal` command supports the following optional flags,

- `-f` or `--frontMatter`: Add the front matter on top of the markdown files.
- `-i` or `--images`: Download images to a local `img` sub-directory.
- `-op` or `--path`: Custom path for saving markdown files.
- `-ip` or `--img-path`: Custom path for downloading images.
- `-d` or `--drafts`: Convert the drafts too.

## Usage examples

### Example: Convert from local - front matter and images but no drafts

```sh
medium-2-md convertLocal '/home/user/Desktop/posts' -fi
```

### Example: Convert from local - default output and images path

```sh
medium-2-md convertLocal '/home/user/Desktop/posts' -dfi
```

### Example: Convert from local - with custom output and images path

```sh
medium-2-md convertLocal '/home/user/Desktop/posts' -dfi --path '/home/user/Desktop/md' --img-path '/home/user/Downloads/img'
```

### Example: override the image path with alias

The following will execute the program from the cloned repository locally,
download imags (`-i`), use a frontmatter (`-f`), provide an alias to load
all images from a specific path (`--img-path-alias`) and process all the
HTML files exported from Medium at the `../test` directory.

```sh
node index.js convertLocal -fi --img-path-alias "~/assets/images/"  ../test
```

The result of this command lives in the `../test/md-1298731725` directory that
is generated using a random hash.

Note: The flags do not support any defaults. You need to add them in order to get the respective results (drafts, images and/or front matter inclusion).

### Custom Output and Image Paths

When using the `-op` or the `--path` flag, the output markdown files are written to this path instead of the default value. If this custom path is invalid or does not exist, the output files are written to the default path.

When using the `-i` or `--images` with the `--img-path` flag, the images are downloaded into the directory at this custom path. If this directory does not already exist, the images are downloaded to the default path. The image elements in the converted markdown files link to their respective local paths.

## Dependencies

This package uses:

1. [turndown](https://github.com/domchristie/turndown) - to convert html into markdown.
1. [cheerio](https://github.com/cheeriojs/cheerio) - to select and extract relevant html attributes from Medium posts' html files.
1. [commander](https://github.com/tj/commander.js) - to enable command line interface.
1. [js-yaml](https://github.com/nodeca/js-yaml) - to add yaml front matter to markdown files.
1. [node-fetch](https://github.com/bitinn/node-fetch) - to download images.
