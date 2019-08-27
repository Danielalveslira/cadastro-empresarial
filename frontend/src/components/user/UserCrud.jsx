import React, {Component} from 'react'
import Main from '../template/Main'

const HeardProps = {// Componente responsavel pelo cabeçalho
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro: Incluir, Lista, Alterar e Excluir!'
}

export default class UserCrud extends Component{
    render(){
        return(
            <Main {...HeardProps}>
                Teste de cadastro
            </Main>
        )
    }
}