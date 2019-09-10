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
				<i className="fa fa-sitemap"></i> Fornecedores
		</a>
			<a href='#/empresa'>
				<i className="fa fa-building"></i> Empresa
		</a>
			<a href='#/filial'>
				<i className="fa fa-heart"></i> Filial
		</a>
			<a href='#/estoque'>
				<i className="fa fa-archive"></i> Estoque
		</a>
			<a href='#/cliente'>
				<i className="fa fa-users"></i> Clientes
		</a>
			<a href='#/funcionario'>
				<i className="fa fa-child"></i> Funcionarios
		</a>
		<a href='#/telemarketing'>
				<i className="fa fa-phone"></i> Telemarketing
		</a>
		</nav>
	</aside>
