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
    title: 'Flume',
    description: 'Documentation for Flume: The React node editor.',
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
        root: '/Users/christopherpatty/projects/flume/example/.docz',
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
        title: 'Flume',
        description: 'Documentation for Flume: The React node editor.',
        host: 'localhost',
        port: 3003,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/christopherpatty/projects/flume/example',
          templates:
            '/Users/christopherpatty/projects/flume/example/node_modules/docz-core/dist/templates',
          docz: '/Users/christopherpatty/projects/flume/example/.docz',
          cache: '/Users/christopherpatty/projects/flume/example/.docz/.cache',
          app: '/Users/christopherpatty/projects/flume/example/.docz/app',
          appPackageJson:
            '/Users/christopherpatty/projects/flume/example/package.json',
          appTsConfig:
            '/Users/christopherpatty/projects/flume/example/tsconfig.json',
          gatsbyConfig:
            '/Users/christopherpatty/projects/flume/example/gatsby-config.js',
          gatsbyBrowser:
            '/Users/christopherpatty/projects/flume/example/gatsby-browser.js',
          gatsbyNode:
            '/Users/christopherpatty/projects/flume/example/gatsby-node.js',
          gatsbySSR:
            '/Users/christopherpatty/projects/flume/example/gatsby-ssr.js',
          importsJs:
            '/Users/christopherpatty/projects/flume/example/.docz/app/imports.js',
          rootJs:
            '/Users/christopherpatty/projects/flume/example/.docz/app/root.jsx',
          indexJs:
            '/Users/christopherpatty/projects/flume/example/.docz/app/index.jsx',
          indexHtml:
            '/Users/christopherpatty/projects/flume/example/.docz/app/index.html',
          db:
            '/Users/christopherpatty/projects/flume/example/.docz/app/db.json',
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
