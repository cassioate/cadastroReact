import React, {Component} from 'react'
import Main from '../template/Main'
// import api from '../../services/api'

const headerProps = {
    icon: 'users',
    title: 'Usuarios',
    subtitle: 'Cadastro de usaurios: Incluir, Listar, Alterar e Excluir'
}



export default class UserCrud extends Component {
    render(){
        return (
            <Main {...headerProps}>
                Cadastro
            </Main>
        )
    }
}