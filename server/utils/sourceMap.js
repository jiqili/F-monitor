const fs = require('fs')
const sourceMap = require('source-map')

const rawSourceMap = JSON.parse(
    fs.readFileSync('./assets/main.84ef34dd.js.map','utf-8').toString()
);

/**
 * @description:  用来解析 sourcemap 的函数方法
 * @param {*} position  [{line, column}]的数组
 * @return {*} Promise
 */
exports.sourceMapAnalysis = async (positions) => {
  const sourceMapFile = rawSourceMap
  const consumer = await new sourceMap.SourceMapConsumer(sourceMapFile);
  let res = positions.map(item => {
    let sm = consumer.originalPositionFor({line: item.line,column: item.column})
    return {originLine: sm.line + 1, source: sm.source}
  })
  consumer.destroy();
  return res
};


