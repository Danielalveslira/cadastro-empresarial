import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const HeardProps = {// Componente responsavel pelo cabeçalho
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro: Incluir, Lista, Alterar e Excluir'
}

// Localizando nosso banco
const baseUrl = "http://localhost:3001/user"
// Estado inicial - Quando sobe a aplicação
const initialState = {
    user: { name: ' ', email: ' ' },
    list: []
}

export default class UserCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ user: initialState.user })
    }
    // Para incluir e alterar
    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        /* Se id for verdadeiro(existe um id, faça um put:atualização),
        senão faça um post:Criação */
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        // Se existe um id atualiza a informação senão baseUrl cria mais um id
        axios[method](url, user)
            .then(resp => { //getUpdateList será criada
                const list = this.getUpdateList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdateList(user) {
        // Cria uma nova lista a partir do filter
        // u => cria uma lista a separando o id que passou
        // Unshift coloca esse id na primeira posição do array
        // return list atualiza a linha 35 que atualiza o estado.
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return list
    }

    updateField(event) {
        //user será o clone (ou recebe o valor) do estado user
        //clonamos para não alterar o objeto diretamente
        const user = { ...this.state.user }
        //seta o que está em input e virá value
        user[event.target.name] = event.target.value
        //set insere
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" className="form-control"
                            name="name"
                            value={this.state.user.name}
                            onChange={e => this.updateField(e)}
                            placeholder="Nome = "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="text" className="form-control"
                            name="email"
                            value={this.state.user.email}
                            onChange={e => this.updateField(e)}
                            placeholder="Email = "></input>
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
    load(user){
        this.setState({ user })
    }
    // Deleta na base então repassa a lista atualizando
    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp =>{
            const list = this.state.list.filter(u => u !== user)
            this.setState({ list })
        })
    }
    // Agora criar o que renderiza a tabela
    renderTable(){
        return(
            <table className= "table mt-4">
                <thead>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    // Atualização e Remoção de usuários.
    renderRows(){
        return this.state.list.map(user =>{
            return(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn=warning">
                            <i className="fa fa-pencil"
                            onClick={() => this.load(user)}></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"
                                onClick={() => this.remove(user)}></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        return(
            <Main {...HeardProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}