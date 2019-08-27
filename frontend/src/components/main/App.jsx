import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { HashRouter } from 'react-router-dom'

import Routes from './Routers'
import Logo from '../template/Logo'
import Nav from '../template/Nav'
//main, nele ja importa o footer
import Footer from '../template/Footer'

export default props =>
	<HashRouter>
		<div className="app">
			<Logo />
			<Nav />
			<Routes />
			<Footer />
		</div>
	</HashRouter>