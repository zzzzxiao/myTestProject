import { ConfigProvider  } from 'antd';
import React from 'react';
import Root from './routes/Root';
import { render } from 'react-dom';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'mobx-react';
import stores from './mobx';

render(<Provider {...stores}><ConfigProvider  locale={zh_CN}><Root /></ConfigProvider ></Provider>, document.getElementById("root"));
if (module.hot) {
    module.hot.accept();
}
