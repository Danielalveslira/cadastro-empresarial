import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const HeardProps = {// Componente responsavel pelo cabeçalho
    icon: 'bell',
    title: 'Portaria',
    subtitle: 'Informações de entrada e saida'
}

// Localizando nosso banco
const baseUrl = "http://localhost:3001/portaria"
// Estado inicial - Quando sobe a aplicação
const initialState = {
    portaria: {
        nome: '', horarioEntrada: '', horarioSaida: '',
        departamento: '', pessoa: ''
    },
    list: []
}

export default class PortariaCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ portaria: initialState.portaria })
    }
    // Para incluir e alterar
    save() {
        const portaria = this.state.portaria
        const method = portaria.id ? 'put' : 'post'
        /* Se id for verdadeiro(existe um id, faça um put:atualização),
        senão faça um post:Criação */
        const url = portaria.id ? `${baseUrl}/${portaria.id}` : baseUrl
        // Se existe um id atualiza a informação senão baseUrl cria mais um id
        axios[method](url, portaria)
            .then(resp => { //getUpdateList será criada
                const list = this.getUpdateList(resp.data)
                this.setState({ portaria: initialState.portaria, list })
            })
    }

    getUpdateList(portaria) {
        // Cria uma nova lista a partir do filter
        // u => cria uma lista a separando o id que passou
        // Unshift coloca esse id na primeira posição do array
        // return list atualiza a linha 35 que atualiza o estado.
        const list = this.state.list.filter(u => u.id !== portaria.id)
        list.unshift(portaria)
        return list
    }

    updateField(event) {
        //portaria será o clone (ou recebe o valor) do estado portaria
        //clonamos para não alterar o objeto diretamente
        const portaria = { ...this.state.portaria }
        //seta o que está em input e virá value
        portaria[event.target.name] = event.target.value
        //set insere
        this.setState({ portaria })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" className="form-control"
                            name="nome"
                            value={this.state.portaria.nome}
                            onChange={e => this.updateField(e)}
                            placeholder="Campo de nome: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Horario de entrada</label>
                        <input type="time" className="form-control"
                            name="horarioEntrada"
                            value={this.state.portaria.horarioEntrada}
                            onChange={e => this.updateField(e)}
                            placeholder="Registro de entrada: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Horario de saida</label>
                        <input type="time" className="form-control"
                            name="horarioSaida"
                            value={this.state.portaria.horarioSaida}
                            onChange={e => this.updateField(e)}
                            placeholder="Registro de saida: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Departamento</label>
                        <input type="text" className="form-control"
                            name="departamento"
                            value={this.state.portaria.departamento}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o departamento: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Pessoa</label>
                        <input type="text" className="form-control"
                            name="pessoa"
                            value={this.state.portaria.pessoa}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a pessoa que veio contatar: "></input>
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
    load(portaria) {
        this.setState({ portaria })
    }
    // Deleta na base então repassa a lista atualizando
    remove(portaria) {
        axios.delete(`${baseUrl}/${portaria.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== portaria)
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
                    <th>Horario de entrada</th>
                    <th>Horario de saida</th>
                    <th>Departamento</th>
                    <th>Pessoa</th>
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
        return this.state.list.map(portaria => {
            return (
                <tr key={portaria.id}>
                    <td>{portaria.id}</td>
                    <td>{portaria.nome}</td>
                    <td>{portaria.horarioEntrada}</td>
                    <td>{portaria.horarioSaida}</td>
                    <td>{portaria.departamento}</td>
                    <td>{portaria.pessoa}</td>
                    <td>
                        <button className="btn btn=warning">
                            <i className="fa fa-pencil"
                                onClick={() => this.load(portaria)}></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"
                                onClick={() => this.remove(portaria)}></i>
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