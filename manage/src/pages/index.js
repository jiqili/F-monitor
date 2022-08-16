import { Col, Row } from 'antd';
import Card from "@components/card";
import { HttpPieChartWithErrorType } from "@components/http";
import styles from "./css/index.module.css";
import { useEffect, useRef, useState } from 'react';
import { useGetErrorData } from 'src/store';
import {SegementsChartsWithHost, SegementsChartsWithUser} from "@components/segementCharts";
/**
 * 对应首页路由
 * 在这里打算采取Zendenta的首页模式
 */

export default function Index() {
  const leftRef = useRef(null);
  const [height, setHeight] = useState(512);
  useEffect(() => {
    setHeight(leftRef.current.offsetHeight);
  }, []);
  return (
    <div className={styles.Wrapper}>
      <Row gutter={8} align={'bottom'}>
        {/* 异常统计图 */}
        <Col xs={24} lg={24} xl={13} style={{ backgroundColor: 'rgb(16,12,42)', padding: '0' }}>
          <HttpPieChartWithErrorType width={645} height={height} />
        </Col>
        <Col xs={24} lg={24} xl={11} ref={leftRef}>
          {/* 这里是右边的两个错误展示card */}
          <Row gutter={4}>
            <Col span={12} >
              <LeftCard
                title="异常总数"
                msg={'all'}
                href={'/errorJs'}
              />
            </Col>
            <Col span={12}>
              <LeftCard
                title={"资源请求错误"}
                msg={'资源请求错误'}
                href={'/errorResource'}
              />
            </Col>
          </Row>
          {/* 这里是右边下面的card */}
          <Row style={{ marginTop: "4px" }}>
            <Col span={24}>
              <RightCard
                title="http请求异常"
                msg="http请求异常"
                href={'/errorHttpRequest'}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row
        style={{ marginTop: "16px" }}
        gutter={8}>
        {/* 下层详情 */}
        <BottomCol />
      </Row>  
      <SegementsChartsWithUser />
      <SegementsChartsWithHost />
    </div>
  )
}





const RightCard = ({ title, href = '/', msg = 'all' }) => {
  let sum = useGetErrorData(msg);
  if (Array.isArray(sum)) {
    sum = sum.reduce((a, b) => a + b);
  }
  return (
    <Card title={title} bordered={false} href={href}>
      <div className={styles.right_one_card}>
        <p><span>{sum}</span></p>
        <p>其中404请求错误最多，为7个</p>
      </div>
    </Card>
  )
}


const LeftCard = ({ title, href = '/', msg = 'all' }) => {
  let sum = useGetErrorData(msg);
  if (Array.isArray(sum)) {
    sum = sum.reduce((a, b) => a + b);
  }
  return (
    <Card title={title} bordered={false} href={href}>
      <div className={styles.right_two_card}>
        <p className={styles.right_two_card_font_p}>
          <span>{sum}</span>
        </p>

      </div>
    </Card>
  )
}


const BottomCol = () => {
  return (
    <>
      <BottomCard
        title="当前UV数"
        cur={`今日：234`}
        old={`昨日：120`}
        href={'/'}
      />
      <BottomCard
        title="当前PV数"
        cur={`今日：234`}
        old={`昨日：120`}
        href={'/'}
      />
      <BottomCard
        title="使用占比最大的浏览器"
        cur={`chrome：79%`}
        old={`firefox：13%`}
        href={'/performancePage'}
      />
      <BottomCard
        title="用户浏览最多次数的页面"
        cur={`首页`}
        old={`个人页面`}
        href={'/performancePage'}
      />
    </>
  )
}

const BottomCard = ({ title, cur, old, href = '/' }) => {
  return (
    <Col xs={24} lg={6}>
      <Card title={title} href={href}>
        <div className={styles.BottomCard}>
          <p>{cur}</p>
          <p>{old}</p>
        </div>
      </Card>
    </Col>
  )
}