import { Col, Row } from 'antd';
import Card from "@components/card";
import {
  HttpDoubleBarsChartWithDifferentTime,
  HttpDoubleLinesChartWithDifferentTime,
  HttpPieChartWithErrorType
} from "@components/http";
/**
 * 对应首页路由
 * 在这里打算采取Zendenta的首页模式
 */

export default function Index() {
  return (
    <>
      {/* <HttpDoubleLinesChartWithDifferentTime />
      <HttpDoubleBarsChartWithDifferentTime />
      <HttpPieChartWithErrorType /> */}
      <Row
        gutter={8}
      >
        <Col xs={24} lg={24} xl={13}>
          <Card hasMoreButton={false}>
          <HttpPieChartWithErrorType width={645} height={450} />
          </Card>
          
        </Col>
        <Col xs={24} lg={24} xl={11}>
          <Row gutter={4}>
            <Col span={12} >
              <Card title="异常总数" bordered={false}>
                <div style={{
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: "grey",
                  flexFlow: "column nowrap"
                }}>
                  <p
                    style={{
                      fontSize: "50px",
                      margin: "0",
                    }}
                  ><span>12</span></p>
                  <p><span>这里可以展示总共有多少种错误</span></p>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="资源请求错误" bordered={false}>
                <div style={{
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: "grey",
                  flexFlow: "column nowrap"
                }}>
                  <p
                    style={{
                      fontSize: "50px",
                      margin: "0",
                    }}
                  ><span>7</span></p>
                  <p><span>这里将资源请求错误单独拿出来是因为资源请求错误影响比其他异常都要大</span></p>
                </div>
              </Card>
            </Col>
          </Row>
          <Row style={{
            marginTop: "4px"
          }}>
            <Col span={24}>
              <Card title="这里可以展示性能指标" bordered={false}>
                <p>性能相比于异常优先级较低，在这里展示一些关键数据然后点击下面的按钮或者左边进入详情页面</p>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "16px"
        }}
        gutter={8}>
        {/* 下层详情 */}
        <Col xs={24} lg={6}>
          <Card title="资源请求错误">1</Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card title="资源请求错误">1</Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card title="资源请求错误">1</Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card title="资源请求错误">1</Card>
        </Col>
      </Row>
    </>
  )
}
