import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
//escolha, rota. redirecionar
import Home from '../home/Home'
import UserCrud from '../user/UserCrud'
import ProductCrud from '../products/ProductCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/User' component={UserCrud} />
        <Route path='/Product' component={ProductCrud} />
        <Redirect from= '*' to= '/'/>
    </Switch>
/*Reference:ferramentas do React Router.
https://reacttraining.com/react-router/web/guides/quick-start*/