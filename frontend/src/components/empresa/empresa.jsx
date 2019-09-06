import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const HeardProps = {// Componente responsavel pelo cabeçalho
    icon: 'building',
    title: 'Empresa',
    subtitle: 'Informações da empresa'
}

// Localizando nosso banco
const baseUrl = "http://localhost:3001/empresa"
// Estado inicial - Quando sobe a aplicação
const initialState = {
    empresa: {
        NomeEmpresa: "", DataFundação: "", FormaJurídica: "", ÁreaAtuação: "",
        PorteEmpresa: ""
    },
    list: []
}

export default class EmpresaCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ empresa: initialState.empresa })
    }
    // Para incluir e alterar
    save() {
        const empresa = this.state.empresa
        const method = empresa.id ? 'put' : 'post'
        /* Se id for verdadeiro(existe um id, faça um put:atualização),
        senão faça um post:Criação */
        const url = empresa.id ? `${baseUrl}/${empresa.id}` : baseUrl
        // Se existe um id atualiza a informação senão baseUrl cria mais um id
        axios[method](url, empresa)
            .then(resp => { //getUpdateList será criada
                const list = this.getUpdateList(resp.data)
                this.setState({ empresa: initialState.empresa, list })
            })
    }

    getUpdateList(empresa) {
        // Cria uma nova lista a partir do filter
        // u => cria uma lista a separando o id que passou
        // Unshift coloca esse id na primeira posição do array
        // return list atualiza a linha 35 que atualiza o estado.
        const list = this.state.list.filter(u => u.id !== empresa.id)
        list.unshift(empresa)
        return list
    }

    updateField(event) {
        //empresa será o clone (ou recebe o valor) do estado empresa
        //clonamos para não alterar o objeto diretamente
        const empresa = { ...this.state.empresa }
        //seta o que está em input e virá value
        empresa[event.target.name] = event.target.value
        //set insere
        this.setState({ empresa })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome da empresa</label>
                        <input type="text" className="form-control"
                            name="NomeEmpresa"
                            value={this.state.empresa.NomeEmpresa}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome da empresa: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Data de fundação</label>
                        <input type="date" className="form-control"
                            name="DataFundação"
                            value={this.state.empresa.DataFundação}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a data de fundação: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Forma Jurídica</label>
                        <input type="text" className="form-control"
                            name="FormaJurídica"
                            value={this.state.empresa.FormaJurídica}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a forma jurídica: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Área de atuação</label>
                        <input type="text" className="form-control"
                            name="ÁreaAtuação"
                            value={this.state.empresa.ÁreaAtuação}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a área de atuação: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Porte da empresa</label>
                        <input type="text" className="form-control"
                            name="PorteEmpresa"
                            value={this.state.empresa.PorteEmpresa}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o porte da empresa: "></input>
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
    load(empresa) {
        this.setState({ empresa })
    }
    // Deleta na base então repassa a lista atualizando
    remove(empresa) {
        axios.delete(`${baseUrl}/${empresa.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== empresa)
            this.setState({ list })
        })
    }
    // Agora criar o que renderiza a tabela
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <th>ID</th>
                    <th>Nome da empresa</th>
                    <th>Data de fundação</th>
                    <th>Forma jurídica</th>
                    <th>Área de atuação</th>
                    <th>Porte da empresa</th>
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
        return this.state.list.map(empresa => {
            return (
                <tr key={empresa.id}>
                    <td>{empresa.id}</td>
                    <td>{empresa.NomeEmpresa}</td>
                    <td>{empresa.DataFundação}</td>
                    <td>{empresa.FormaJurídica}</td>
                    <td>{empresa.ÁreaAtuação}</td>
                    <td>{empresa.PorteEmpresa}</td>
                    <td>
                        <button className="btn btn=warning">
                            <i className="fa fa-pencil"
                                onClick={() => this.load(empresa)}></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"
                                onClick={() => this.remove(empresa)}></i>
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