import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  HomeOutlined,
  ExclamationCircleOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
const _Menu=dynamic(()=>import('antd').then(mod=>mod.Menu),{ssr:false});
// import { Menu } from 'antd';

const __menuItemArray = ['首页概览', '异常与事件', '性能与访问'],
  __ItemChildrens = [
    null,
    [
      '脚本异常',
      '资源下载',
      '网络请求'
    ],
    [
      '网络请求',
      '资源下载',
      '页面'
    ]
  ],
  __iconArray = [
    <HomeOutlined />,
    <ExclamationCircleOutlined />,
    <PieChartOutlined />
  ],
  __routerArray=[
    '/',
    [
      '/linetest',
      '/gradienttest',
      '/',
    ],
    [
      '/linetest',
      '/',
      '/'
    ]
  ];
export default function MENU() {
  const router=useRouter();
  const __menuItems = __menuItemArray.map((label, index) => {
    let obj = {
      'label': label,
      'key': `${index}`,
      'icon': __iconArray[index]
    }
    if (__ItemChildrens[index]) {
      const array=__routerArray[index];
      obj.children = __ItemChildrens[index].map((label, secIndex) => {
        return {
          'label': label,
          'key': `${index}.${secIndex}`,
          'onClick':handlerClick.bind(null,router,array[secIndex]),
        }
      })
    }else{
      obj['onClick']=handlerClick.bind(null,router,__routerArray[index]);
    }
    return obj;
  });
  return (
    <_Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['0']}
      defaultOpenKeys={['1', '2']}
      items={__menuItems}
      forceSubMenuRender={true}

    />
  )
}


function handlerClick(router,href){
    router.push(href);
}