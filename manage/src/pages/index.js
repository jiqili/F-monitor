import {
  HttpDoubleBarsChartWithDifferentTime,
  HttpDoubleLinesChartWithDifferentTime,
  HttpPieChartWithErrorType
} from "@components/http";


export default function Index() {
  return (
    <>
      <div>
        在src/pages下的每一个js文件都将作为路由，除了_app.js文件作为middleware使用
      </div>
      <h1>
        <p>关于http部分</p>
      </h1>
      <HttpDoubleLinesChartWithDifferentTime />
      <HttpDoubleBarsChartWithDifferentTime />
      <HttpPieChartWithErrorType />
    </>
  )
}
