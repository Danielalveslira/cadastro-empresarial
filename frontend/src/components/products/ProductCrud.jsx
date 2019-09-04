import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const HeardProps = {// Componente responsavel pelo cabeçalho
    icon: 'shopping-cart text-danger',
    title: 'Produtos',
    subtitle: 'Cadastro: Incluir, Lista, Alterar e Excluir'
}

// Localizando nosso banco
const baseUrl = "http://localhost:3001/products"
// Estado inicial - Quando sobe a aplicação
const initialState = {
    products: { name: '', qtd: '', valor: '' },
    list: []
}

export default class ProductCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ products: initialState.products })
    }
    // Para incluir e alterar
    save() {
        const products = this.state.products
        const method = products.id ? 'put' : 'post'
        /* Se id for verdadeiro(existe um id, faça um put:atualização),
        senão faça um post:Criação */
        const url = products.id ? `${baseUrl}/${products.id}` : baseUrl
        // Se existe um id atualiza a informação senão baseUrl cria mais um id
        axios[method](url, products)
            .then(resp => { //getUpdateList será criada
                const list = this.getUpdateList(resp.data)
                this.setState({ products: initialState.products, list })
            })
    }

    getUpdateList(products) {
        // Cria uma nova lista a partir do filter
        // u => cria uma lista a separando o id que passou
        // Unshift coloca esse id na primeira posição do array
        // return list atualiza a linha 35 que atualiza o estado.
        const list = this.state.list.filter(u => u.id !== products.id)
        list.unshift(products)
        return list
    }

    updateField(event) {
        //products será o clone (ou recebe o valor) do estado products
        //clonamos para não alterar o objeto diretamente
        const products = { ...this.state.products }
        //seta o que está em input e virá value
        products[event.target.name] = event.target.value
        //set insere
        this.setState({ products })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome do produto</label>
                        <input type="text" className="form-control"
                            name="name"
                            value={this.state.products.name}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome do produto: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Quantidade</label>
                        <input type="text" className="form-control"
                            name="qtd"
                            value={this.state.products.qtd}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a quantidade: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Valor</label>
                        <input type="text" className="form-control"
                            name="valor"
                            value={this.state.products.valor}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o Valor: "></input>
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
    load(products) {
        this.setState({ products })
    }
    // Deleta na base então repassa a lista atualizando
    remove(products) {
        axios.delete(`${baseUrl}/${products.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== products)
            this.setState({ list })
        })
    }
    // Agora criar o que renderiza a tabela
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <th>ID</th>
                    <th>Nome Produto</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    // Atualização e Remoção de produtos.
    renderRows() {
        return this.state.list.map(products => {
            return (
                <tr key={products.id}>
                    <td>{products.id}</td>
                    <td>{products.name}</td>
                    <td>{products.qtd}</td>
                    <td>{products.valor}</td>
                    <td>
                        <button className="btn btn=warning">
                            <i className="fa fa-pencil"
                                onClick={() => this.load(products)}></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"
                                onClick={() => this.remove(products)}></i>
                        </button>
                        <br></br>
                        <button className="btn btn=warning">Valor total: {products.valor*products.qtd}</button>
                    </td>
                </tr>
            )
        }
        )
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