import React from 'react'
import '../template/Main.css'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Logo from '../template/Logo'
import Nav from '../template/Nav'
//main, nele ja importa o footer
import Main from '../template/Main'
import Footer from '../template/Footer'

export default props =>
	<div className="app">
		<Logo />
		<Nav />
		<Main icon = "graduation-cap text-danger" title="Sesi Senai"
		subtitle = "Ciência, robótica, inovação e tecnologia para o dia a dia dos nossos alunos">
			<div className = "display-4">Teste de conteúdo</div>
				<hr/>
				<p className = "mb-0">Cadastro</p>
		</Main>
		<Footer />
	</div>
