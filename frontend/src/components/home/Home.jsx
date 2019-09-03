import React from 'react'
import Main from '../template/Main'

export default props =>
  <Main icon="lock" title="Login"
    subtitle="Preencha os campos abaixo para acessar">

    <div className="form">
      <div className="col-12 col-md-6">
        <div className="form-group">
          <label>E-mail</label>
          <input type="text" className="form-control"
            name="email"
            placeholder="Digite seu e-mail: "></input>
        </div>
      </div>
    </div>

    <div className="form">
      <div className="col-12 col-md-6">
        <div className="form-group">
          <label>Senha</label>
          <input type="text" className="form-control"
            name="senha"
            placeholder="Digite sua senha: "></input>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <a className="btn btn-primary"
            href='/#/user'>
            salvar
          </a>
          <a className="btn btn-secundary ml-2"
            href="/#/*">
            cancelar
          </a>
        </div>
      </div>
    </div>

  </Main>
