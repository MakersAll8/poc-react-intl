import './App.css';
import React, {Suspense, useContext} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {IntlProvider, FormattedMessage} from 'react-intl'
import {TranslateContext} from './reducer/translateReducer'
import {Home} from './components/Home/Home'
import {withTranslate} from './hoc/withTranslate'
import {NavLink} from 'react-router-dom'
import messages from './common.locale.json'
// lazy load default export component
// const About = React.lazy(() => import('./components/About/About'))
// lazy load named export component, pratically import a module and export named component as default
const About = React.lazy(() => import('./components/About/About').then(module => ({default: module.About})))
const Today = React.lazy(() => import('./components/Today/Today').then(module => ({default: module.Today})))
const NoParam = React.lazy(() => import('./components/NoParam/NoParam').then(module => ({default: module.NoParam})))



// wrapping app with a TranslateProvider so that children components can easily access state and dispatch
const App = withTranslate(()=> {

  let routes = (
    <Switch>
        <Route exact path="/"><Home/></Route>
        <Route path="/about"><About/></Route>
        <Route path="/today"><Today/></Route>
        <Route path="/noParam"><NoParam/></Route>
        <Redirect to="/"/>
    </Switch>
  )

  // get shared states
  const [state, dispatch] = useContext(TranslateContext)

  // update locale in shared states
  const onLocaleChangeHandler = async (e) => {
    const locale = e.target.value;
      dispatch({type:'UPDATE_LOCALE', payload:{locale}})
  }

  // IntlProvider is a react-intl provider
  // messages: takes translated document in json format
  // locale: en-AU, en-US, zh-CN, zh-SG
  return (
    <div className="App">
      <IntlProvider messages={state.messages} locale={state.locale} defaultLocale='en-AU'>
        <Suspense fallback={<div>Loading</div>}>
          <BrowserRouter>
          {/* select locale */}
            <select onChange={onLocaleChangeHandler}
                      defaultValue={state.locale}
            >
              <option value="en-AU">English (Australia)</option>
              <option value="pl-US">Igpay Atinlay (US)</option>
              <option value="zh-CN">中文简体 - Simplified Chinese</option>
            </select>

            {/* <FormattedMessage/> equivalent to const intl = useIntl(); intl.formattedMessage() */}
            <NavLink className="NavLink" to="/"><FormattedMessage {...messages.home}/></NavLink>
            <NavLink className="NavLink" to="/about"><FormattedMessage {...messages.about}/></NavLink>
            <NavLink className="NavLink" to="/today"><FormattedMessage {...messages.today}/></NavLink>
            <NavLink className="NavLink" to="/noParam"><FormattedMessage {...messages.noParam}/></NavLink>

            {routes}
          </BrowserRouter>
        </Suspense>
      </IntlProvider>
    </div>
  );
})



export default App;
