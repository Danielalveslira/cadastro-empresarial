import React from 'react'
import './Nav.css'

export default props =>
	<aside className="menu-area">
		<nav className="menu">
			<a href='#/'>
				<i className="fa fa-home"></i> Início
		</a>
			<a href='#/user'>
				<i className="fa fa-user"></i> Usuários
		</a>
			<a href='#/Product'>
				<i className="fa fa-shopping-cart"></i> Produtos
		</a>
			<a href='#/sales'>
				<i className="fa fa-money"></i> Vendas
		</a>
			<a href='#/provider'>
				<i className="fa fa-archive"></i> Fornecedores
		</a>
		</nav>
	</aside>
