import styles from "./card.module.css";
import { Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Link from "next/link";
export default function _Card({ title, href, children, hasMoreButton = true, ...resProps }) {
    return (
        <Card
            title={title}
            bordered={false}
            {...resProps}
        >
            {children}
            {hasMoreButton && <More message={"查看详情"} href={href} />}
        </Card>
    )
}

function More({ message, href }) {
    return (
        <div className={styles.moreWrapper}>
            <p>
                {message}
            </p>
            <button className={styles.moreButton}>
                <Link href={href || '/'}>
                    <RightOutlined />
                </Link>
            </button>
        </div>
    )
}