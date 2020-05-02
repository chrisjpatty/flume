const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Node Editor Example',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './src',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/Users/chrispatty/projects/node-editor/example/.docz',
        base: '/',
        source: './src',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Node Editor Example',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/chrispatty/projects/node-editor/example',
          templates:
            '/Users/chrispatty/projects/node-editor/example/node_modules/docz-core/dist/templates',
          docz: '/Users/chrispatty/projects/node-editor/example/.docz',
          cache: '/Users/chrispatty/projects/node-editor/example/.docz/.cache',
          app: '/Users/chrispatty/projects/node-editor/example/.docz/app',
          appPackageJson:
            '/Users/chrispatty/projects/node-editor/example/package.json',
          appTsConfig:
            '/Users/chrispatty/projects/node-editor/example/tsconfig.json',
          gatsbyConfig:
            '/Users/chrispatty/projects/node-editor/example/gatsby-config.js',
          gatsbyBrowser:
            '/Users/chrispatty/projects/node-editor/example/gatsby-browser.js',
          gatsbyNode:
            '/Users/chrispatty/projects/node-editor/example/gatsby-node.js',
          gatsbySSR:
            '/Users/chrispatty/projects/node-editor/example/gatsby-ssr.js',
          importsJs:
            '/Users/chrispatty/projects/node-editor/example/.docz/app/imports.js',
          rootJs:
            '/Users/chrispatty/projects/node-editor/example/.docz/app/root.jsx',
          indexJs:
            '/Users/chrispatty/projects/node-editor/example/.docz/app/index.jsx',
          indexHtml:
            '/Users/chrispatty/projects/node-editor/example/.docz/app/index.html',
          db:
            '/Users/chrispatty/projects/node-editor/example/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
