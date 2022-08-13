import styles from "./card.module.css";
import { Card } from 'antd';
import More from "@components/more";
export default function _Card({ title, href, children,hasMoreButton=true, ...resProps }) {
    return (
        <Card
            title={title}
            bordered={false}
            {...resProps}
        >
            {children}
            {hasMoreButton&&<More message={"查看详情"} href={href} />}
        </Card>
    )
}