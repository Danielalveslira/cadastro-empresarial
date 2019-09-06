import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const HeardProps = {// Componente responsavel pelo cabeçalho
    icon: 'archive',
    title: 'Estoque',
    subtitle: 'Informações de estoque'
}

// Localizando nosso banco
const baseUrl = "http://localhost:3001/estoque"
// Estado inicial - Quando sobe a aplicação
const initialState = {
    Estoque: {
        Fornecedor: "", Produto: "", QtdProduto: "", Valor: "", Validade: ""
    },
    list: []
}

export default class EstoqueCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ Estoque: initialState.Estoque })
    }
    // Para incluir e alterar
    save() {
        const Estoque = this.state.Estoque
        const method = Estoque.id ? 'put' : 'post'
        /* Se id for verdadeiro(existe um id, faça um put:atualização),
        senão faça um post:Criação */
        const url = Estoque.id ? `${baseUrl}/${Estoque.id}` : baseUrl
        // Se existe um id atualiza a informação senão baseUrl cria mais um id
        axios[method](url, Estoque)
            .then(resp => { //getUpdateList será criada
                const list = this.getUpdateList(resp.data)
                this.setState({ Estoque: initialState.Estoque, list })
            })
    }

    getUpdateList(Estoque) {
        // Cria uma nova lista a partir do filter
        // u => cria uma lista a separando o id que passou
        // Unshift coloca esse id na primeira posição do array
        // return list atualiza a linha 35 que atualiza o estado.
        const list = this.state.list.filter(u => u.id !== Estoque.id)
        list.unshift(Estoque)
        return list
    }

    updateField(event) {
        //Estoque será o clone (ou recebe o valor) do estado Estoque
        //clonamos para não alterar o objeto diretamente
        const Estoque = { ...this.state.Estoque }
        //seta o que está em input e virá value
        Estoque[event.target.name] = event.target.value
        //set insere
        this.setState({ Estoque })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome do fornecedor</label>
                        <input type="text" className="form-control"
                            name="Fornecedor"
                            value={this.state.Estoque.Fornecedor}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome do fornecedor: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome do produto</label>
                        <input type="text" className="form-control"
                            name="Produto"
                            value={this.state.Estoque.Cnpj}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome do produto: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Quantidade do produto</label>
                        <input type="text" className="form-control"
                            name="QtdProduto"
                            value={this.state.Estoque.QtdProduto}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a quantidade: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Valor</label>
                        <input type="text" className="form-control"
                            name="Valor"
                            value={this.state.Estoque.Valor}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o valor: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Validade</label>
                        <input type="text" className="form-control"
                            name="Validade"
                            value={this.state.Estoque.Validade}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a validade: "></input>
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
    load(Estoque) {
        this.setState({ Estoque })
    }
    // Deleta na base então repassa a lista atualizando
    remove(Estoque) {
        axios.delete(`${baseUrl}/${Estoque.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== Estoque)
            this.setState({ list })
        })
    }
    // Agora criar o que renderiza a tabela
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <th>ID</th>
                    <th>Fornecedor</th>
                    <th>Produto</th>
                    <th>QtdProduto</th>
                    <th>Valor</th>
                    <th>Validade</th>
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
        return this.state.list.map(Estoque => {
            return (
                <tr key={Estoque.id}>
                    <td>{Estoque.id}</td>
                    <td>{Estoque.Fornecedor}</td>
                    <td>{Estoque.Produto}</td>
                    <td>{Estoque.QtdProduto}</td>
                    <td>{Estoque.Valor}</td>
                    <td>{Estoque.Validade}</td>
                    <td>
                        <button className="btn btn=warning">
                            <i className="fa fa-pencil"
                                onClick={() => this.load(Estoque)}></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"
                                onClick={() => this.remove(Estoque)}></i>
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