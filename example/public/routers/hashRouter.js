// hashRouter.js 
class HashRouter {

    constructor(dom) {
        this.hashObj = {};

        window.addEventListener('hashchange', (e) => {

            const path = e.newURL.split('#')[1];

            if (path && this.hashObj[path]) {

                const data = this.getData(path);
                this.appendData(dom, data);

            }

        })
    }

    // 注册路由
    register(...paths) {

        paths.forEach(path => {
            this.hashObj[path] = path;
        })

    }

    // 获取数据
    getData(path) {
        const url = `https://www.fastmock.site/mock/ba90f15d75470108ed2c56997636d24d/routertest/api/getPage${path.slice(-1)}data`
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false)
        xhr.send(null);
        if (xhr.status === 200) {

            return JSON.parse(xhr.responseText);
        }
        return {};
    }

    // 渲染数据
    appendData(dom, data) {

        let containerDom = document.querySelector(dom);
        containerDom.innerHTML = '';

        let titleDom = document.createElement('h1');
        titleDom.innerText = data.title;
        let dataDom = document.createElement('div');
        dataDom.innerText = data.data;
        let descDom = document.createElement('div');
        descDom.innerText = data.desc;

        containerDom.append(titleDom, dataDom, descDom);
    }
}

const hashRouter = new HashRouter('#container');
hashRouter.register('/page1', '/page2', '/page3');