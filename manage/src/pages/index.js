import { Col, Row } from 'antd';
import Card from "@components/card";
import { HttpPieChartWithErrorType } from "@components/http";
import styles from "./css/index.module.css";
import { useEffect, useRef, useState } from 'react';
/**
 * 对应首页路由
 * 在这里打算采取Zendenta的首页模式
 */

export default function Index() {
  const leftRef = useRef(null);
  const [height, setHeight] = useState(450);
  useEffect(() => {
    setHeight(leftRef.current.offsetHeight);
  }, [leftRef||leftRef.current.offsetHeight]);
  return (
    <>
      <Row gutter={8} align={'bottom'}>
        {/* 异常统计图 */}
        <Col xs={24} lg={24} xl={13}>
          <Card hasMoreButton={false}>
            <HttpPieChartWithErrorType width={645} height={height-48} />
          </Card>
        </Col>

        <Col xs={24} lg={24} xl={11} ref={leftRef}>
          {/* 这里是右边的两个错误展示card */}
          <Row gutter={4}>
            <Col span={12} >
              <LeftCard
                title="异常总数"
                num={12}
                msg={'这里展示总共有多少种错误'}
              />
            </Col>
            <Col span={12}>
              <LeftCard
                title={"资源请求错误"}
                num={7}
                msg={"这里将资源请求错误单独拿出来是因为资源请求错误影响比其他异常都要大"}
              />
            </Col>
          </Row>
          {/* 这里是右边下面的card */}
          <Row style={{ marginTop: "4px" }}>
            <Col span={24}>
              <Card title="这里可以展示性能指标" bordered={false}>
                <p>性能相比于异常优先级较低，在这里展示一些关键数据然后点击下面的按钮或者左边进入详情页面</p>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row
        style={{ marginTop: "16px" }}
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


const LeftCard = ({ title, bordered = false, num = 0, msg = '' }) => {
  return (
    <Card title={title} bordered={bordered}>
      <div className={styles.right_two_card}>
        <p className={styles.right_two_card_font_p}>
          <span>{num}</span>
        </p>
        <p><span>{msg}</span></p>
      </div>
    </Card>
  )
}