import {  List, Checkbox, Card, Button, Modal } from 'antd';
import { useState } from 'react';
import styles from "./errorList.module.css";


export default function _List({ data }) {
    return (
        <List
            dataSource={data}
            renderItem={(item, index) =>
                <List.Item
                    className={styles.listItem}
                    key={item.id}
                >
                    <_Card
                        id={item.id}
                        index={index}
                    />
                </List.Item>}
        />
    )
}

function _Card({index,id}) {
    const [isModalVisible, setVisible] = useState(false);
    return (
        <Card className={styles.card}>
            <div className={styles.card_errorType}>
                {/* 第一个框，列表项以及错误类型 */}
                <div className={styles.first_box}>
                    <Checkbox />
                    <p><span>{index + 1}.</span></p>
                    <p>{`错误类型：${id}`}</p>
                </div>
                {/* 第二个框，对应的url */}
                <div>
                    <p>这里写出现错误的url</p>
                </div>
                {/* 第三个框，简短错误信息， */}
                <div>
                    <p>"Uncaught TypeError: Cannot set properties of undefined (setting 'b ')"</p>
                </div>
                {/* 第四个框，点击展示更多msg */}
                <div>
                    <Button type="primary" onClick={setVisible.bind(null, true)}>查看详情</Button>
                    <Modal 
                    title={`错误类型:${id}`} 
                    visible={isModalVisible}
                    onOk={setVisible.bind(null,false)}
                    onCancel={setVisible.bind(null,false)}
                    >
                        <p>在这里对异常进行描述</p>
                        <p>目标url:http://localhost:3000/err</p>
                        <p>原因:"Uncaught TypeError: Cannot set properties of undefined (setting 'b ')"</p>
                    </Modal>
                </div>
            </div>
        </Card>
    )
}