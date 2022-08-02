import { Layout } from 'antd';
import React from 'react';
import MENU from '@components/menu';
import styles from './layout.module.css';
const { Header, Content, Sider } = Layout;
export default function LAYOUT({children}) {
    return (
        <Layout hasSider>
            <Sider
                breakpoint="lg"
                collapsedWidth="100"
                className={styles.sider}
            >
                <MENU />
            </Sider>
            <Layout className={styles.content_wrapper}>
                <Header />
                <Content className={styles.content}>
                    {/* 这里应该是根据路由来确定的 */}
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}
