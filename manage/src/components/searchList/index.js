import { Select, Col, Row } from 'antd';


import styles from "./searchList.module.css";


const { Option } = Select;



export default function SearchList() {

    return (
        <Row gutter={8} align={'middle'}>
            <Col span={2}>
                <Select
                    defaultValue="lucy"
                    style={{
                        width: 120,
                    }}

                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Col>
        </Row>
    )
}


function HeadFilter(){
    
}