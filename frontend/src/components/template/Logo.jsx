import React from 'react'
import './Logo.css'
import logo from '../../assets/imgs/lapis e regua cruzados.png'

export default props =>
	<aside className="Logo">
		<a href="/" className="logo">
			<img src={logo} alt="logo" />
		</a>
	</aside>
