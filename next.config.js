// @ts-check
const { withBlitz } = require('@blitzjs/next')

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
    pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
    experimental: {
        esmExternals: false, // THIS IS THE FLAG THAT MATTERS
    },
}

module.exports = withBlitz(config)
