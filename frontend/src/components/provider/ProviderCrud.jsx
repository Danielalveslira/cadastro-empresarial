import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const HeardProps = {// Componente responsavel pelo cabeçalho
    icon: 'archive',
    title: 'Fornecedores',
    subtitle: 'Informações sobre os fornecedores'
}

// Localizando nosso banco
const baseUrl = "http://localhost:3001/provider"
// Estado inicial - Quando sobe a aplicação
const initialState = {
    provider: { NomeFornecedor: "", DataFundação: "", NomeFantasia: "",
    SocioNome1: "", SocioNome2: "", Cnpj: "" },
    list: []
}

export default class ProviderCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ provider: initialState.provider })
    }
    // Para incluir e alterar
    save() {
        const provider = this.state.provider
        const method = provider.id ? 'put' : 'post'
        /* Se id for verdadeiro(existe um id, faça um put:atualização),
        senão faça um post:Criação */
        const url = provider.id ? `${baseUrl}/${provider.id}` : baseUrl
        // Se existe um id atualiza a informação senão baseUrl cria mais um id
        axios[method](url, provider)
            .then(resp => { //getUpdateList será criada
                const list = this.getUpdateList(resp.data)
                this.setState({ provider: initialState.provider, list })
            })
    }

    getUpdateList(provider) {
        // Cria uma nova lista a partir do filter
        // u => cria uma lista a separando o id que passou
        // Unshift coloca esse id na primeira posição do array
        // return list atualiza a linha 35 que atualiza o estado.
        const list = this.state.list.filter(u => u.id !== provider.id)
        list.unshift(provider)
        return list
    }

    updateField(event) {
        //provider será o clone (ou recebe o valor) do estado provider
        //clonamos para não alterar o objeto diretamente
        const provider = { ...this.state.provider }
        //seta o que está em input e virá value
        provider[event.target.name] = event.target.value
        //set insere
        this.setState({ provider })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome do Fornecedor</label>
                        <input type="text" className="form-control"
                            name="NomeFornecedor"
                            value={this.state.provider.NomeFornecedor}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome do fornecedor: "></input>
                    </div>
                </div>

                <div className="form">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data de fundação</label>
                            <input type="date" className="form-control"
                                name="DataFundação"
                                value={this.state.provider.DataFundação}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a data de fundação: "></input>
                        </div>
                    </div>
                </div>

                <div className="form">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome fantasia</label>
                            <input type="text" className="form-control"
                                name="NomeFantasia"
                                value={this.state.provider.NomeFantasia}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome fantasia: "></input>
                        </div>
                    </div>
                </div>

                <div className="form">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome do 1º socio</label>
                            <input type="text" className="form-control"
                                name="SocioNome1"
                                value={this.state.provider.SocioNome1}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do 1º socio: "></input>
                        </div>
                    </div>
                </div>

                <div className="form">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome do 2º socio</label>
                            <input type="text" className="form-control"
                                name="SocioNome2"
                                value={this.state.provider.SocioNome2}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do 2º socio: "></input>
                        </div>
                    </div>
                </div>

                <div className="form">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cnpj</label>
                            <input type="text" className="form-control"
                                name="Cnpj"
                                value={this.state.provider.Cnpj}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Cnpj: "></input>
                        </div>
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
    load(provider) {
        this.setState({ provider })
    }
    // Deleta na base então repassa a lista atualizando
    remove(provider) {
        axios.delete(`${baseUrl}/${provider.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== provider)
            this.setState({ list })
        })
    }
    // Agora criar o que renderiza a tabela
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <th>ID</th>
                    <th>Nome do fornecedor</th>
                    <th>Data de fundação</th>
                    <th>Nome fantasia</th>
                    <th>Nome do 1º socio</th>
                    <th>Nome do 2º socio</th>
                    <th>Cnpj</th>
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
        return this.state.list.map(provider => {
            return (
                <tr key={provider.id}>
                    <td>{provider.id}</td>
                    <td>{provider.NomeFornecedor}</td>
                    <td>{provider.DataFundação}</td>
                    <td>{provider.NomeFantasia}</td>
                    <td>{provider.SocioNome1}</td>
                    <td>{provider.SocioNome2}</td>
                    <td>{provider.Cnpj}</td>
                    <td>
                        <button className="btn btn=warning">
                            <i className="fa fa-pencil"
                                onClick={() => this.load(provider)}></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"
                                onClick={() => this.remove(provider)}></i>
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
