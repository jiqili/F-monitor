import { List, Checkbox, Card, Button, Modal } from 'antd';
import { useState } from 'react';
import styles from "./errorList.module.css";


/**
 * 
 * @param {{errorType,errorUrl,errorReason}} param0 
 * @returns 
 */
export default function _List({ data, fetchList = [] }) {
    return (
        <List
            dataSource={[...fetchList, ...data]}
            renderItem={(item, index) =>
                <List.Item
                    className={styles.listItem}
                    key={index}
                >
                    <_Card
                        index={index}
                        {...item}
                    />
                </List.Item>}
        />
    )
}

function _Card({ index, errorType, errorUrl, errorReason, codeLine }) {
    const [isModalVisible, setVisible] = useState(false);
    return (
        <Card className={styles.card}>
            <div className={styles.card_errorType}>
                <div>
                    {/* 第一个框，列表项以及错误类型 */}
                    <div className={styles.first_box}>
                        <Checkbox />
                        <p><span>{index + 1}.</span></p>
                        <p>{`错误类型：${errorType}`}</p>
                    </div>
                    {/* 第二个框，对应的url */}
                    <div>
                        <p>对应路由页面：{errorUrl}</p>
                    </div>
                </div>
                <div>
                    {/* 第三个框，简短错误信息， */}
                    <div>
                        <p>{errorReason}</p>
                    </div>
                    {/* 第四个框，点击展示更多msg */}
                    <div className={styles.four_box}>
                        <Button type="primary" onClick={setVisible.bind(null, true)}>查看详情</Button>
                        <Modal
                            title={`错误类型:${errorType}`}
                            visible={isModalVisible}
                            onOk={setVisible.bind(null, false)}
                            onCancel={setVisible.bind(null, false)}
                        >
                            <p>目标url:{errorUrl}</p>

                            原因：
                            <pre>
                                <code className={styles.redColor}>
                                    {errorReason}
                                </code>
                                <pre>
                                    {codeLine && <code className={styles.redColor}>{codeLine}</code>}
                                </pre>
                            </pre>

                        </Modal>
                    </div>
                </div>
            </div>
        </Card>
    )
}