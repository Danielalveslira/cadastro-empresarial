import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
//escolha, rota. redirecionar
import Home from '../home/Home'
import UserCrud from '../user/UserCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/User' component={UserCrud} />
        <Redirect from= '*' to= '/'/>
    </Switch>
/*Reference:ferramentas do React Router.
https://reacttraining.com/react-router/web/guides/quick-start*/