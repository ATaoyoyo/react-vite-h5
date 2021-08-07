import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'

import routes from './router'
import NavBar from './components/NavBar'

function App() {
  return <Router>
    <ConfigProvider primaryColor={ '#007fff' } locale={ zhCN }>
      <Switch>
        {
          routes.map(route => <Route exact key={ route.path } path={ route.path }>
            <route.component />
          </Route>)
        }
      </Switch>
    </ConfigProvider>
    <NavBar />
  </Router>
}

export default App
