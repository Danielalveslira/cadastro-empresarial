import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
//escolha, rota. redirecionar
import Home from '../home/Home'
import UserCrud from '../user/UserCrud'
import ProductCrud from '../products/ProductCrud'
import SalesCrud from '../sales/SalesCrud'
import ProviderCrud from '../provider/ProviderCrud'
import EmpresaCrud from '../empresa/empresa'
import FilialCrud from '../filial/filial'
import EstoqueCrud from '../estoque/estoque'
import ClienteCrud from '../cliente/cliente'
import FuncionarioCrud from '../funcionario/funcionario'
import TelemarketingCrud from '../telemarketing/TelemarketingCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/User' component={UserCrud} />
        <Route path='/Product' component={ProductCrud} />
        <Route path='/Sales' component={SalesCrud} />
        <Route path='/Provider' component={ProviderCrud} />
        <Route path='/empresa' component={EmpresaCrud} />
        <Route path='/filial' component={FilialCrud} />
        <Route path='/estoque' component={EstoqueCrud} />
        <Route path='/cliente' component={ClienteCrud} />
        <Route path='/funcionario' component={FuncionarioCrud} />
        <Route path='/telemarketing' component={TelemarketingCrud} />
        <Redirect from= '*' to= '/'/>
    </Switch>
/*Reference:ferramentas do React Router.
https://reacttraining.com/react-router/web/guides/quick-start*/