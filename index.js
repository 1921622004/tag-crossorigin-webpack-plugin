let HtmlWebpackPlugin = require('html-webpack-plugin')

const relativePathReg = /^\/[^/].*$/

module.exports = class TagCrossoriginWebpackPlugin {
    constructor(options = {}) {
        const { crossorigin = 'anonymous', filterFn } = options
        this.crossorigin = crossorigin
        this.filterFn = filterFn
    }

    /**
     * 
     * @param {import('webpack').Compiler} compiler 
     */
    apply(compiler) {
        if (HtmlWebpackPlugin && HtmlWebpackPlugin.getHooks) {
            HtmlWebpackPlugin.getHooks(compiler).alterAssetTags.tapAsync('tag-crossorigin-webpack-plugin', this.addAttrToTag)
        } else {
            compiler.hooks.compilation.tap('tag-crossorigin-webpack-plugin', compilation => {
                compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('tag-crossorigin-webpack-plugin', this.addAttrToTag)
            })
        }
    }

    addAttrToTag = (data, callback) => {
        const tags = [...data.head, ...data.body]
        tags.forEach(tag => {
            if (tag.tagName === 'script' || tag.tagName === 'link') {
                if (this.filterFn && !this.filterFn(tag)) return
                if (!tag.attributes) return
                let linkUrl = tag.tagName === 'script' ? tag.src : tag.href
                if (!relativePathReg.test(linkUrl)) {
                    tag.attributes.crossorigin = 'anonymous'
                }
            }
        })
        callback()
    }
}