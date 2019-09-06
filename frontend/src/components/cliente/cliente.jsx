import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const HeardProps = {// Componente responsavel pelo cabeçalho
    icon: 'users',
    title: 'Clientes',
    subtitle: 'Informações dos cliente'
}

// Localizando nosso banco
const baseUrl = "http://localhost:3001/cliente"
// Estado inicial - Quando sobe a aplicação
const initialState = {
    cliente: {
        nome: "", email: "", telefone: "", cpf: ""
    },
    list: []
}

export default class clientesCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ cliente: initialState.cliente })
    }
    // Para incluir e alterar
    save() {
        const cliente = this.state.cliente
        const method = cliente.id ? 'put' : 'post'
        /* Se id for verdadeiro(existe um id, faça um put:atualização),
        senão faça um post:Criação */
        const url = cliente.id ? `${baseUrl}/${cliente.id}` : baseUrl
        // Se existe um id atualiza a informação senão baseUrl cria mais um id
        axios[method](url, cliente)
            .then(resp => { //getUpdateList será criada
                const list = this.getUpdateList(resp.data)
                this.setState({ cliente: initialState.cliente, list })
            })
    }

    getUpdateList(cliente) {
        // Cria uma nova lista a partir do filter
        // u => cria uma lista a separando o id que passou
        // Unshift coloca esse id na primeira posição do array
        // return list atualiza a linha 35 que atualiza o estado.
        const list = this.state.list.filter(u => u.id !== cliente.id)
        list.unshift(cliente)
        return list
    }

    updateField(event) {
        //cliente será o clone (ou recebe o valor) do estado cliente
        //clonamos para não alterar o objeto diretamente
        const cliente = { ...this.state.cliente }
        //seta o que está em input e virá value
        cliente[event.target.name] = event.target.value
        //set insere
        this.setState({ cliente })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome do cliente</label>
                        <input type="text" className="form-control"
                            name="nome"
                            value={this.state.cliente.nome}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome do cliente: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control"
                            name="email"
                            value={this.state.cliente.Cnpj}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o email: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Telefone</label>
                        <input type="text" className="form-control"
                            name="telefone"
                            value={this.state.cliente.telefone}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o telefone: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>CPF</label>
                        <input type="text" className="form-control"
                            name="cpf"
                            value={this.state.cliente.Valor}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o CPF: "></input>
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
    load(cliente) {
        this.setState({ cliente })
    }
    // Deleta na base então repassa a lista atualizando
    remove(cliente) {
        axios.delete(`${baseUrl}/${cliente.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== cliente)
            this.setState({ list })
        })
    }
    // Agora criar o que renderiza a tabela
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>CPF</th>
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
        return this.state.list.map(cliente => {
            return (
                <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefone}</td>
                    <td>{cliente.cpf}</td>
                    <td>
                        <button className="btn btn=warning">
                            <i className="fa fa-pencil"
                                onClick={() => this.load(cliente)}></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"
                                onClick={() => this.remove(cliente)}></i>
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