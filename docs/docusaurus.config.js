module.exports = {
  title: 'Flume',
  tagline: 'Extract business logic from your apps with a user-friendly node editor powered by React.',
  url: 'https://flume.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'chrisjpatty', // Usually your GitHub org/user name.
  projectName: 'flume', // Usually your repo name.
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/oceanicNext'),
    },
    algolia: {
      apiKey: '167e6112aaeb90f5cd59d9e352aed978',
      indexName: 'flume',
      // searchParameters: {}, // Optional (if provided by Algolia)
    },
    image: 'img/fb-img.png',
    navbar: {
      title: '',
      logo: {
        alt: 'Flume',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg'
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Documentation',
          position: 'left',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/chrisjpatty/flume',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Overview',
              to: 'docs/overview',
            },
            {
              label: 'FAQ',
              to: 'docs/faq',
            },
            {
              label: 'Quick Start',
              to: 'docs/quick-start',
            },
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/chrisjpatty/flume',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/chrisjpatty',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Christopher Patty`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'overview',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/chrisjpatty/flume/edit/master/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/chrisjpatty/flume/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
