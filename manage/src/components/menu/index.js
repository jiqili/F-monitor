import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  HomeOutlined,
  ExclamationCircleOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { useMenuActiveIndex } from '@utils/hooks/menu';
const Menu = dynamic(() => import('antd').then(mod => mod.Menu), { ssr: false });



export const __menuItemArray = ['首页概览', '异常与事件', '性能与访问'],
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
  __routerArray = [
    '/',
    [
      '/errorJs',
      '/errorResource',
      '/errorHttpRequest',
    ],
    [
      '/performanceHttpRequest',
      '/performanceResource',
      '/performancePage'
    ]
  ];
export default function MENU() {
  const router = useRouter();
  const { activeIndex, setActiveIndex } = useMenuActiveIndex();
  const __menuItems = __menuItemArray.map((label, index) => {
    let obj = {
      'label': label,
      'key': `${index}`,
      'icon': __iconArray[index]
    }
    if (__ItemChildrens[index]) {
      const array = __routerArray[index];
      obj.children = __ItemChildrens[index].map((label, secIndex) => {
        return {
          'label': label,
          'key': `${index}.${secIndex}`,
          'onClick': handlerClick.bind(null, setActiveIndex, `${index}.${secIndex}`, router, array[secIndex]),
        }
      })
    } else {
      obj['onClick'] = handlerClick.bind(null, setActiveIndex, `${index}`, router, __routerArray[index]);
    }
    return obj;
  });
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[activeIndex]}
      defaultOpenKeys={['1', '2']}
      items={__menuItems}
      forceSubMenuRender={true}

    />
  )
}


function handlerClick(setActiveIndex, index, router, href) {
  setActiveIndex(index);
  router.push(href);
}