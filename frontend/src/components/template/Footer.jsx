import React from 'react'
import './Footer.css'

export default props =>
  <footer className="Footer">
    <span>
      Desenvolvido com <i className="fa fa-heart text-info"></i> por <strong>Tecnologia Senai </strong>
      e <strong className="text-primary">
          <a href="https://nerd0000.github.io/" target="_blank" rel="noopener noreferrer">
            Alan
          </a>
        </strong>
    </span>
  </footer>
//"fa fa-heart text-danger / text-primary se refere ao bootstrap"
//rel="noopener noreferrer" evita erros de segurança