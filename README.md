# write-files-dist-webpack-plugin

```javascript

const writeFile = require('write-file-webpack-plugin');


chainWebpack(config) {

    config.plugin('write-files').use(writeFile, [
        {
        config: { log: true, NODE_ENV: process.env.NODE_ENV },
        files: [
            {
                fileName: 'project_env',
                fileType: 'js',
                fileContent: `window.project_env_obj = ` + JSON.stringify(fileData)
            },
            {
                fileName: 'hello',
                fileType: '/js',
                fileContent: `console.log(3333)`
            },
            {
                fileName: 'data',
                fileType: 'json',
                filePath: '/data',
                fileContent: `{"a":1}`
            },
            {
                fileName: 'style',
                fileType: 'css',
                fileContent: `.main{color:red}`
            },
            {}
        ]
        }
    ]);

}
```
- config
- files

- fileName 
- fileType ：文件类型
- filePath : '/data' 使用‘/’分割
- fileContent