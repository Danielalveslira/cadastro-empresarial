import React from 'react'
import './Header.css'

export default props =>
   <header className="header d-nome d-sm-flex flex-column">
     <h1 className="mt -3">
        <i className={`fa fa-${props.icon} text-danger`}></i> {props.title}
        <br />
         <p>{props.subtitle}</p>
     </h1>
   </header>
