import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
//escolha, rota. redirecionar
import Home from '../home/Home'
import UserCrud from '../user/UserCrud'
import ProductCrud from '../products/ProductCrud'
import SalesCrud from '../sales/SalesCrud'
import ProviderCrud from '../provider/ProviderCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/User' component={UserCrud} />
        <Route path='/Product' component={ProductCrud} />
        <Route path='/Sales' component={SalesCrud} />
        <Route path='/Provider' component={ProviderCrud} />
        <Redirect from= '*' to= '/'/>
    </Switch>
/*Reference:ferramentas do React Router.
https://reacttraining.com/react-router/web/guides/quick-start*/