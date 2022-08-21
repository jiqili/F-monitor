import { List } from 'antd';


import styles from "./searchList.module.css";






export default function SearchList({ data, headerArray,fetcharr=[] }) {
    return (
        <>
            <List
            className={styles.List}
                header={<HeaderContent headerArray={headerArray} />}
                dataSource={[...fetcharr,...data]}
                renderItem={item =>
                    <List.Item key={item.uuid} className={styles.ListItem}>
                        <CardItem
                            dataArray={item.renderArray}
                        />
                    </List.Item>
                }
            />
        </>
    )
}

const HeaderContent = ({ headerArray }) => {
    const renderArray = Array.isArray(headerArray) ? headerArray : [headerArray];
    return (
        <div className={`${styles.ContentWrapper} ${styles.Header}`} 
        style={{ gridTemplateColumns: `repeat(${renderArray.length},minmax(200px,1fr))` }} >
            {renderArray.map((item, index) =>
                <div className={styles.content} key={index}>{`${item}`}</div>
            )}
        </div>
    )
}

const CardItem = ({ dataArray }) => {
    const renderArray = Array.isArray(dataArray) ? dataArray : [dataArray];
    return (
        <div className={styles.ContentWrapper} style={{ gridTemplateColumns: `repeat(${renderArray.length},minmax(200px,1fr))` }}>
            {renderArray.map((item, index) =>
                <div className={styles.content} key={index}>{`${item}`}</div>
            )}
        </div>
    )
}