import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const HeardProps = {// Componente responsavel pelo cabeçalho
    icon: 'money',
    title: 'Vendas',
    subtitle: 'Informações sobre as vendas'
}

// Localizando nosso banco
const baseUrl = "http://localhost:3001/sales"
// Estado inicial - Quando sobe a aplicação
const initialState = {
    sales: { NomeCliente: '', Produto: '', QtdProduto: '', DataVenda: '', Valor: '' },
    list: []
}

export default class SalesCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ sales: initialState.sales })
    }
    // Para incluir e alterar
    save() {
        const sales = this.state.sales
        const method = sales.id ? 'put' : 'post'
        /* Se id for verdadeiro(existe um id, faça um put:atualização),
        senão faça um post:Criação */
        const url = sales.id ? `${baseUrl}/${sales.id}` : baseUrl
        // Se existe um id atualiza a informação senão baseUrl cria mais um id
        axios[method](url, sales)
            .then(resp => { //getUpdateList será criada
                const list = this.getUpdateList(resp.data)
                this.setState({ sales: initialState.sales, list })
            })
    }

    getUpdateList(sales) {
        // Cria uma nova lista a partir do filter
        // u => cria uma lista a separando o id que passou
        // Unshift coloca esse id na primeira posição do array
        // return list atualiza a linha 35 que atualiza o estado.
        const list = this.state.list.filter(u => u.id !== sales.id)
        list.unshift(sales)
        return list
    }

    updateField(event) {
        //sales será o clone (ou recebe o valor) do estado sales
        //clonamos para não alterar o objeto diretamente
        const sales = { ...this.state.sales }
        //seta o que está em input e virá value
        sales[event.target.name] = event.target.value
        //set insere
        this.setState({ sales })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome do cliente</label>
                        <input type="text" className="form-control"
                            name="NomeCliente"
                            value={this.state.sales.NomeCliente}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome do cliente: "></input>
                    </div>
                </div>

                <div className="form">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Produto</label>
                            <input type="text" className="form-control"
                                name="Produto"
                                value={this.state.sales.Produto}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do produto: "></input>
                        </div>
                    </div>
                </div>

                <div className="form">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade de produto</label>
                            <input type="text" className="form-control"
                                name="QtdProduto"
                                value={this.state.sales.QtdProduto}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a quantidade de produto: "></input>
                        </div>
                    </div>
                </div>

                <div className="form">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data da venda</label>
                            <input type="date" className="form-control"
                                name="DataVenda"
                                value={this.state.sales.DataVenda}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a data da venda: "></input>
                        </div>
                    </div>
                </div>

                <div className="form">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Valor da venda</label>
                            <input type="text" className="form-control"
                                name="Valor"
                                value={this.state.sales.Valor}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Valor da venda: "></input>
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
    load(sales) {
        this.setState({ sales })
    }
    // Deleta na base então repassa a lista atualizando
    remove(sales) {
        axios.delete(`${baseUrl}/${sales.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== sales)
            this.setState({ list })
        })
    }
    // Agora criar o que renderiza a tabela
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <th>ID</th>
                    <th>Nome do cliente</th>
                    <th>Produto</th>
                    <th>Quantidade de Produtos</th>
                    <th>Data da venda</th>
                    <th>Valor da venda</th>
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
        return this.state.list.map(sales => {
            return (
                <tr key={sales.id}>
                    <td>{sales.id}</td>
                    <td>{sales.NomeCliente}</td>
                    <td>{sales.Produto}</td>
                    <td>{sales.QtdProduto}</td>
                    <td>{sales.DataVenda}</td>
                    <td>{sales.Valor}</td>
                    <td>
                        <button className="btn btn=warning">
                            <i className="fa fa-pencil"
                                onClick={() => this.load(sales)}></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"
                                onClick={() => this.remove(sales)}></i>
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
