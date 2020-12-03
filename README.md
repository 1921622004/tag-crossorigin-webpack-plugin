# tag-crossorigin-webpack-plugin

## usage

```cmd
npm install tag-crossorigin-webpack-plugin -D
```

```javascript
plugins: [
    ...,
    new TagCrossoriginWebpackPlugin({
        crossorigin: 'anonymous', // 非必选 默认 anonymous
        filterFn: (tag: HtmlTagObject) => {} // 非必选 返回bool，过滤不需添加crossorigin的标签
    })
]
```