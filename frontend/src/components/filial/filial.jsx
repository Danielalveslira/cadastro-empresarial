import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const HeardProps = {// Componente responsavel pelo cabeçalho
    icon: 'heart',
    title: 'Filial',
    subtitle: 'Informações da Filial'
}

// Localizando nosso banco
const baseUrl = "http://localhost:3001/filial"
// Estado inicial - Quando sobe a aplicação
const initialState = {
    filial: {
        NomeFilial: "", Cnpj: "",  Endereço: "",  Contato: ""
    },
    list: []
}

export default class FilialCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ filial: initialState.filial })
    }
    // Para incluir e alterar
    save() {
        const filial = this.state.filial
        const method = filial.id ? 'put' : 'post'
        /* Se id for verdadeiro(existe um id, faça um put:atualização),
        senão faça um post:Criação */
        const url = filial.id ? `${baseUrl}/${filial.id}` : baseUrl
        // Se existe um id atualiza a informação senão baseUrl cria mais um id
        axios[method](url, filial)
            .then(resp => { //getUpdateList será criada
                const list = this.getUpdateList(resp.data)
                this.setState({ filial: initialState.filial, list })
            })
    }

    getUpdateList(filial) {
        // Cria uma nova lista a partir do filter
        // u => cria uma lista a separando o id que passou
        // Unshift coloca esse id na primeira posição do array
        // return list atualiza a linha 35 que atualiza o estado.
        const list = this.state.list.filter(u => u.id !== filial.id)
        list.unshift(filial)
        return list
    }

    updateField(event) {
        //filial será o clone (ou recebe o valor) do estado filial
        //clonamos para não alterar o objeto diretamente
        const filial = { ...this.state.filial }
        //seta o que está em input e virá value
        filial[event.target.name] = event.target.value
        //set insere
        this.setState({ filial })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome da Filial</label>
                        <input type="text" className="form-control"
                            name="NomeFilial"
                            value={this.state.filial.NomeFilial}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome da filial: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Cnpj</label>
                        <input type="text" className="form-control"
                            name="Cnpj"
                            value={this.state.filial.Cnpj}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o Cnpj: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Endereço</label>
                        <input type="text" className="form-control"
                            name="Endereço"
                            value={this.state.filial.Endereço}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o endereço: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Forma de contato</label>
                        <input type="text" className="form-control"
                            name="Contato"
                            value={this.state.filial.Contato}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a forma de contato: "></input>
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
    load(filial) {
        this.setState({ filial })
    }
    // Deleta na base então repassa a lista atualizando
    remove(filial) {
        axios.delete(`${baseUrl}/${filial.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== filial)
            this.setState({ list })
        })
    }
    // Agora criar o que renderiza a tabela
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <th>ID</th>
                    <th>Nome da Filial</th>
                    <th>Cnpj</th>
                    <th>Endereço</th>
                    <th>Forma de contato</th>
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
        return this.state.list.map(filial => {
            return (
                <tr key={filial.id}>
                    <td>{filial.id}</td>
                    <td>{filial.NomeFilial}</td>
                    <td>{filial.Cnpj}</td>
                    <td>{filial.Endereço}</td>
                    <td>{filial.Contato}</td>
                    <td>
                        <button className="btn btn=warning">
                            <i className="fa fa-pencil"
                                onClick={() => this.load(filial)}></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"
                                onClick={() => this.remove(filial)}></i>
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