import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'user-o',
    title: 'Autores',
    subtitle: 'Cadastro de autores: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = "https://backreactfront.herokuapp.com/autores"


const initialState = {
    autor: {
         nome: "",
         email: "",
         sexo: "",
         dataNascimento: "",
         pais: "",
         cpf: "",
         obras: []    
        },
    list: []
}

export default class AutoresCrud extends Component {

    state = { ...initialState }


    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ autor: initialState.autor })
    }

    getUpdateList(autor) {
        const list = this.state.list.filter(u => u.id !== autor.id)
        list.unshift(autor)
        return list
    }

    save() {
        const autor = this.state.autor
        const method = autor.id ? 'put' : 'post'
        const url = autor.id ? `${baseUrl}/${autor.id}` : baseUrl
        axios[method](url, autor)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ autor: initialState.autor, list })
            })
    }

    updateField(event) {
        const autor = { ...this.state.autor }
        autor[event.target.name] = event.target.value
        this.setState({ autor })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.autor.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..."
                            ></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.autor.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..."
                            ></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Sexo</label>
                            <input type="text" className="form-control"
                                name="sexo"
                                value={this.state.autor.sexo}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o sexo"
                            ></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data de Nascimento</label>
                            <input type="text" className="form-control"
                                name="dataNascimento"
                                value={this.state.autor.dataNascimento}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a data"
                            ></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Pais</label>
                            <input type="text" className="form-control"
                                name="pais"
                                value={this.state.autor.pais}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o País de origem"
                            ></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CPF</label>
                            <input type="text" className="form-control"
                                name="cpf"
                                value={this.state.autor.cpf}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o CPF"
                            ></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Obras</label>
                            <input type="text" className="form-control"
                                name="obras"
                                value={this.state.autor.obras}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite as suas obras"
                            ></input>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(autor) {
        this.setState({ autor })
    }

    
    remove(autor) {
        axios.delete(`${baseUrl}/${autor.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== autor)
            this.setState({ list })
        })
    }

    renderRows() {
        return this.state.list.map(autor => {
            return (
                <tr key={autor.id}>
                    <td>{autor.nome}</td>
                    <td>{autor.email}</td>
                    <td>{autor.sexo}</td>
                    <td>{autor.dataNascimento}</td>
                    <td>{autor.pais}</td>
                    <td>{autor.cpf}</td>
                    <td>{autor.obras}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(autor)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(autor)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Sexo</th>
                        <th>Data de Nascimento</th>
                        <th>Pais</th>
                        <th>CPF</th>
                        <th>Obras</th>

                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}