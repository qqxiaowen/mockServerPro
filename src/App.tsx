/*
 * @Description: xiaoWen
 * @Date: 2021-11-03 16:40:08
 * @LastEditTime: 2021-12-02 11:27:08
 * @FilePath: /liz-qywechat-danone-gt-web/www/src/App.tsx
 */
import { useEffect, useState } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header';
import LeftMenu, { MenuDataItem } from './components/LeftMenu';
import Category from './pages/Category';
import Interface from './pages/Interface';

import Home from './pages/Home';
import request from './request';

import './styles/app.scss';
import { EnumProjectRoute } from './utils/tsMap';

function App() {
  const [menuData, setMenuData] = useState<MenuDataItem[]>([]);
  const [selsectProjectId, setSelsectProjectId] = useState<string>('');

  useEffect(() => {
    request('get', '/project').then((res: any) => {
      setMenuData(res.data);
    });
  }, []);

  // useEffect(() => {
  //   if (!selsectProjectId) return;
  //   console.log('change= ', selsectProjectId);
  // }, [selsectProjectId]);

  return (
    <div className="app">
      <Header />
      <div className="app-main">
        <Router>
          <LeftMenu menuData={menuData} setSelsectProjectId={setSelsectProjectId} />
          <Switch>
            <Redirect exact path="/"  to={EnumProjectRoute.home}/>
            <Route exact path={EnumProjectRoute.home} render={() => <Home selsectProjectId={selsectProjectId} />} />
            <Route exact path={EnumProjectRoute.category} render={() => <Category/>} />
            <Route exact path={EnumProjectRoute.interface} render={() => <Interface/>} />
            {/* <Route
                path="/setting"
                render={() => (
                  <div className="setting">
                    <div className="setting-content">
                      <Route exact path={EnumProjectRoute.settingAccount} component={SettingAccount} />
                      <Route exact path={EnumProjectRoute.settingRole} component={SettingRole} />
                    </div>
                  </div>
                )}
              ></Route> */}
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
