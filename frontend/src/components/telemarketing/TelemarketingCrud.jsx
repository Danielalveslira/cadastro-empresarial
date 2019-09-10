import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const HeardProps = {// Componente responsavel pelo cabeçalho
    icon: 'phone',
    title: 'Telemarketing',
    subtitle: 'Acompanhamento de telemarketing'
}

// Localizando nosso banco
const baseUrl = "http://localhost:3001/telemarketing"
// Estado inicial - Quando sobe a aplicação
const initialState = {
    telemarketing: { Cliente: '', Telefone: '', Atendente: '', Assunto: '',
    Mensagem: '', DataLigação: '' },
    list: []
}

export default class TelemarketingCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ telemarketing: initialState.telemarketing })
    }
    // Para incluir e alterar
    save() {
        const telemarketing = this.state.telemarketing
        const method = telemarketing.id ? 'put' : 'post'
        /* Se id for verdadeiro(existe um id, faça um put:atualização),
        senão faça um post:Criação */
        const url = telemarketing.id ? `${baseUrl}/${telemarketing.id}` : baseUrl
        // Se existe um id atualiza a informação senão baseUrl cria mais um id
        axios[method](url, telemarketing)
            .then(resp => { //getUpdateList será criada
                const list = this.getUpdateList(resp.data)
                this.setState({ telemarketing: initialState.telemarketing, list })
            })
    }

    getUpdateList(telemarketing) {
        // Cria uma nova lista a partir do filter
        // u => cria uma lista a separando o id que passou
        // Unshift coloca esse id na primeira posição do array
        // return list atualiza a linha 35 que atualiza o estado.
        const list = this.state.list.filter(u => u.id !== telemarketing.id)
        list.unshift(telemarketing)
        return list
    }

    updateField(event) {
        //telemarketing será o clone (ou recebe o valor) do estado telemarketing
        //clonamos para não alterar o objeto diretamente
        const telemarketing = { ...this.state.telemarketing }
        //seta o que está em input e virá value
        telemarketing[event.target.name] = event.target.value
        //set insere
        this.setState({ telemarketing })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Cliente</label>
                        <input type="text" className="form-control"
                            name="Cliente"
                            value={this.state.telemarketing.Cliente}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome do cliente: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Telefone</label>
                        <input type="text" className="form-control"
                            name="Telefone"
                            value={this.state.telemarketing.Telefone}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o telefone: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                <div className="form-group">
                        <label>Atendente</label>
                        <input type="text" className="form-control"
                            name="Atendente"
                            value={this.state.telemarketing.Atendente}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome do responsavel pelo atendimento: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Assunto</label>
                        <input type="text" className="form-control"
                            name="Assunto"
                            value={this.state.telemarketing.Assunto}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o assunto: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Mensagem</label>
                        <input type="text" className="form-control"
                            name="Mensagem"
                            value={this.state.telemarketing.Mensagem}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a mensagem: "></input>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Data da ligação</label>
                        <input type="date" className="form-control"
                            name="DataLigação"
                            value={this.state.telemarketing.DataLigação}
                            onChange={e => this.updateField(e)}></input>
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
    load(telemarketing){
        this.setState({ telemarketing })
    }
    // Deleta na base então repassa a lista atualizando
    remove(telemarketing){
        axios.delete(`${baseUrl}/${telemarketing.id}`).then(resp =>{
            const list = this.state.list.filter(u => u !== telemarketing)
            this.setState({ list })
        })
    }
    // Agora criar o que renderiza a tabela
    renderTable(){
        return(
            <table className= "table mt-4">
                <thead>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Telefone</th>
                    <th>Atendente</th>
                    <th>Assunto</th>
                    <th>Mensagem</th>
                    <th>Data da ligação</th>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    // Atualização e Remoção de usuários.
    renderRows(){
        return this.state.list.map(telemarketing =>{
            return(
                <tr key={telemarketing.id}>
                    <td>{telemarketing.id}</td>
                    <td>{telemarketing.Cliente}</td>
                    <td>{telemarketing.Telefone}</td>
                    <td>{telemarketing.Atendente}</td>
                    <td>{telemarketing.Assunto}</td>
                    <td>{telemarketing.Mensagem}</td>
                    <td>{telemarketing.DataLigação}</td>
                    <td>
                        <button className="btn btn=warning">
                            <i className="fa fa-pencil"
                            onClick={() => this.load(telemarketing)}></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"
                                onClick={() => this.remove(telemarketing)}></i>
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
