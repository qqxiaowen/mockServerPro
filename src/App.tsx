/*
 * @Description: xiaoWen
 * @Date: 2021-11-03 16:40:08
 * @LastEditTime: 2022-01-04 10:32:22
 * @FilePath: /liz-qywechat-danone-gt-web/www/src/App.tsx
 */
import { useEffect, useState } from 'react';
import { Switch, Route, Redirect, HashRouter as Router, } from 'react-router-dom';

import Header from './components/Header';
import LeftMenu, { MenuDataItem } from './components/LeftMenu';
import Category from './pages/Category';
import Interface from './pages/Interface';
import WordMain from './pages/wordPro/Main';

import Home from './pages/Home';
import request from './request';

import './styles/app.scss';
import { EnumProjectRoute } from './utils/tsMap';

function App() {
  const [menuData, setMenuData] = useState<MenuDataItem[]>([]);

  useEffect(() => {
    request('get', '/project').then((res: any) => {
      setMenuData(res.data);
    });
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="app-main">
        <Router>
          <LeftMenu menuData={menuData} />
          <Switch>
            <Redirect exact path="/" to={EnumProjectRoute.home} />
            <Route exact path={EnumProjectRoute.home} component={Home} />
            <Route exact path={EnumProjectRoute.category} component={Category} />
            <Route exact path={EnumProjectRoute.interface} component={Interface} />
            <Route exact path={EnumProjectRoute.wordMain} component={WordMain} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
