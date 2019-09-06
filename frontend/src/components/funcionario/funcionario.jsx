import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const HeardProps = {// Componente responsavel pelo cabeçalho
    icon: 'child',
    title: 'Funcionarios',
    subtitle: 'Informações dos Funcionarios'
}

// Localizando nosso banco
const baseUrl = "http://localhost:3001/funcionarios"
// Estado inicial - Quando sobe a aplicação
const initialState = {
    funcionario: {
        nome: "", cpf: "", salario: "", cargo: "", telefone: ""
    },
    list: []
}

export default class FuncionarioCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ funcionario: initialState.funcionario })
    }
    // Para incluir e alterar
    save() {
        const funcionario = this.state.funcionario
        const method = funcionario.id ? 'put' : 'post'
        /* Se id for verdadeiro(existe um id, faça um put:atualização),
        senão faça um post:Criação */
        const url = funcionario.id ? `${baseUrl}/${funcionario.id}` : baseUrl
        // Se existe um id atualiza a informação senão baseUrl cria mais um id
        axios[method](url, funcionario)
            .then(resp => { //getUpdateList será criada
                const list = this.getUpdateList(resp.data)
                this.setState({ funcionario: initialState.funcionario, list })
            })
    }

    getUpdateList(funcionario) {
        // Cria uma nova lista a partir do filter
        // u => cria uma lista a separando o id que passou
        // Unshift coloca esse id na primeira posição do array
        // return list atualiza a linha 35 que atualiza o estado.
        const list = this.state.list.filter(u => u.id !== funcionario.id)
        list.unshift(funcionario)
        return list
    }

    updateField(event) {
        //funcionario será o clone (ou recebe o valor) do estado funcionario
        //clonamos para não alterar o objeto diretamente
        const funcionario = { ...this.state.funcionario }
        //seta o que está em input e virá value
        funcionario[event.target.name] = event.target.value
        //set insere
        this.setState({ funcionario })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome do funcionario</label>
                        <input type="text" className="form-control"
                            name="nome"
                            value={this.state.funcionario.nome}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome do funcionario: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>CPF</label>
                        <input type="text" className="form-control"
                            name="cpf"
                            value={this.state.funcionario.cpf}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o cpf: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Salario</label>
                        <input type="text" className="form-control"
                            name="salario"
                            value={this.state.funcionario.salario}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o salario: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Cargo</label>
                        <input type="text" className="form-control"
                            name="cargo"
                            value={this.state.funcionario.cargo}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o cargo: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Telefone</label>
                        <input type="text" className="form-control"
                            name="telefone"
                            value={this.state.funcionario.telefone}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o telefone: "></input>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            salvar
                        </button>
                        <button className="btn btn-secundary ml-2"
                            onClick={e => this.clear(e)}>
                            cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Será chamado antes do componente na tela
    // Farei uma chamada no backEnd da lista
    componentWillMount() {// componentWillMount -
        //componente vai montar (Função do React)
        axios(baseUrl).then(resp => {// axios vai na baseUrl THEN
            //(então) trás do estado a data.
            this.setState({ list: resp.data })
        })
    }
    // Atualizar o estado do objeto
    load(funcionario) {
        this.setState({ funcionario })
    }
    // Deleta na base então repassa a lista atualizando
    remove(funcionario) {
        axios.delete(`${baseUrl}/${funcionario.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== funcionario)
            this.setState({ list })
        })
    }
    // Agora criar o que renderiza a tabela
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Salario</th>
                    <th>Cargo</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    // Atualização e Remoção de usuários.
    renderRows() {
        return this.state.list.map(funcionario => {
            return (
                <tr key={funcionario.id}>
                    <td>{funcionario.id}</td>
                    <td>{funcionario.nome}</td>
                    <td>{funcionario.cpf}</td>
                    <td>{funcionario.salario}</td>
                    <td>{funcionario.cargo}</td>
                    <td>{funcionario.telefone}</td>
                    <td>
                        <button className="btn btn=warning">
                            <i className="fa fa-pencil"
                                onClick={() => this.load(funcionario)}></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"
                                onClick={() => this.remove(funcionario)}></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...HeardProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}