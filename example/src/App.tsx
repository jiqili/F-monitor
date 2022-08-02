import React, { useState } from 'react';
import { ConfigProvider, DatePicker, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import type { DatePickerProps } from 'antd';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './App.css';
// 模拟引入我们的插件，现在先采取这种方式引入，core写好后再打包
import './core/index'

moment.locale('zh-cn');

const App: React.FC = () => {
  const [date, setDate]:[any, Function] = useState(null);
  const handleChange: DatePickerProps['onChange'] = (value:any) => {
    message.info(`您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`);
    setDate(value);
  };
  return (
    <ConfigProvider locale={zhCN}>
      <div className={'Wrapper'}>
        <DatePicker onChange={handleChange} />
        <div style={{ marginTop: 16 }}>
          当前日期：{date ? date.format('YYYY年MM月DD日') : '未选择'}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
