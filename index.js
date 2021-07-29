const fs = require('fs-extra');
const _ = require('lodash');
const path = require('path');
const os = require('os');

/**
 * @typedef {{
 *  config?: Object
 *  files?: Array
 * }} WriteFilesOptions
 */

class WriteFiles {
  /** @param {WriteFilesOptions} options */
  constructor(options) {
    this.options = Object.assign({}, options);
    this.printLog = this.options.config.log || false;
    this.printLog && console.log(' # webpack plugin constructor', JSON.stringify(options));
  }

  /** @type {(compiler: import('webpack').Compiler) => void} */
  apply(compiler) {
    compiler.hooks.done.tap('write-files', () => {
      this.printLog && console.log(' # webpack plugin apply()  compiler.hooks.done.tap ... ');

      let files = this.options.files || [];
      for (let index = 0; index < files.length; index++) {
        let fileP = files[index].filePath || '';
        if (os.type().indexOf('Windows') != -1) {
          fileP = fileP.split('/').join(path.sep);
        }
        const outputPath = _.get(compiler, 'outputPath', '') + fileP;

        const fileFullName = (files[index].fileName || Date.now()) + '.' + (files[index].fileType || 'text');
        let fileContent = files[index].fileContent || '';
        if (this.printLog) {
          console.log(' # ------------->');
          console.log(' # outputPath    ：  ', outputPath);
          console.log(' # fileFullName  ：', fileFullName);
          console.log(' # fileContent   ：', fileContent);
        }
        // write file to /dist
        fs.outputFileSync(path.join(outputPath, fileFullName), fileContent);
      }
    });
  }
}

module.exports = WriteFiles;
