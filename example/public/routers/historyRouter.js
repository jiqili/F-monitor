// historyRouter.js
class HistoryRouter {

    constructor(dom) {
        this.historyObj = {};
        this.dom = dom;

        this.listenClickOfa();
        this.listenPopstate();

    }

    // 注册路由
    register(...paths) {

        paths.forEach(path => {
            this.historyObj[path] = path;
        })

    }

    // 监听 a 标签上的click 事件
    listenClickOfa() {

        window.addEventListener('click', (e) => {
            const path = e.target.href;

            if (e.target.tagName === 'A' && path && this.historyObj['/' + path.split('/').slice(-1)]) {
                e.preventDefault();

                // 变换 URL
                this.updateUrl(path);

                // 获取数据
                const data = this.getData(path);

                // 渲染数据
                this.appendData(data);

            }


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

    // 通过 window.history 切换浏览器显示的 url
    updateUrl(path) {
        window.history.pushState({ path: path }, null, path);
    }


    // 渲染数据
    appendData(data) {

        let containerDom = document.querySelector(this.dom);
        containerDom.innerHTML = '';

        let titleDom = document.createElement('h1');
        titleDom.innerText = data.title;
        let dataDom = document.createElement('div');
        dataDom.innerText = data.data;
        let descDom = document.createElement('div');
        descDom.innerText = data.desc;

        containerDom.append(titleDom, dataDom, descDom);
    }



    // 通过监听 popstate 事件来处理 history.back()或 history.forward() 时的页面渲染
    listenPopstate() {

        window.addEventListener('popstate', e => {
            const data = this.getData(e.state.path);
            this.appendData(data);
        })
    }

}


const historyRouter = new HistoryRouter('#container');
historyRouter.register('/page1', '/page2', '/page3');