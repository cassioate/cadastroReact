import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import AutoresCrud from '../components/autoresCrud/autoresCrud'

import Home from '../components/home/home'
import UserCrud from '../components/user/obrasCrud'

// eslint-disable-next-line
export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path= '/obras' component={UserCrud}/>
        <Route path= '/autores' component={AutoresCrud}/>
        <Redirect from ='*' to='/' />
    </Switch>