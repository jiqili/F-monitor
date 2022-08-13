import styles from "./list.module.css";
import {  List, Checkbox, Card } from 'antd';
export default function MyList({ data }) {
    return (
        <List
            dataSource={data}
            renderItem={(item) =>
                <List.Item
                    key={item.id}
                >
                    <Card
                        className={styles.card}
                    >
                        <div className={styles.card_errorType}>
                            <Checkbox />
                            <p>{`错误类型：${item.id}`}</p>
                        </div>
                        <p>{item.errorMsg}</p>
                    </Card>
                </List.Item>}
        />
    )
}