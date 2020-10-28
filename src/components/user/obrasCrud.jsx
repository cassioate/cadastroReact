import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'book',
    title: 'Obras',
    subtitle: 'Cadastro de obras: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = "https://backreactfront.herokuapp.com/obras"


const initialState = {
    obras: { 
        nome: "",
        descricao: "",
        dataPublicacao: "",
        dataExposicao: "",
        autores: []
    },
    list: []
}

export default class ObrasCrud extends Component {

    state = { ...initialState }


    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ obras: initialState.obras })
    }

    getUpdateList(obras) {
        const list = this.state.list.filter(u => u.id !== obras.id)
        list.unshift(obras)
        return list
    }

    save() {
        const obras = this.state.obras
        const method = obras.id ? 'put' : 'post'
        const url = obras.id ? `${baseUrl}/${obras.id}` : baseUrl
        axios[method](url, obras)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ obras: initialState.obras, list })
            })
    }

    updateField(event) {
        const obras = { ...this.state.obras }
        obras[event.target.name] = event.target.value
        this.setState({ obras })
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
                                value={this.state.obras.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..."
                            ></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição da Obra</label>
                            <input type="text" className="form-control"
                                name="descricao"
                                value={this.state.obras.descricao}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a descrição..."
                            ></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data de Publicação</label>
                            <input type="text" className="form-control"
                                name="dataPublicacao"
                                value={this.state.obras.dataPublicacao}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a data"
                            ></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data de Exposição</label>
                            <input type="text" className="form-control"
                                name="dataExposicao"
                                value={this.state.obras.dataExposicao}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a data"
                            ></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Autores</label>
                            <input type="text" className="form-control"
                                name="autores"
                                value={this.state.obras.autores}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome dos autores"
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

    load(obras) {
        this.setState({ obras })
    }

    remove(obras) {
        axios.delete(`${baseUrl}/${obras.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== obras)
            this.setState({ list })
        })
    }

    renderRows() {
        return this.state.list.map(obras => {
            return (
                <tr key={obras.id}>
                    <td>{obras.nome}</td>
                    <td>{obras.descricao}</td>
                    <td>{obras.dataPublicacao}</td>
                    <td>{obras.dataExposicao}</td>
                    <td>{obras.autores}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(obras)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(obras)}>
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
                        <th>Descrição da Obra</th>
                        <th>Data de Publicação</th>
                        <th>Data de Exposição</th>
                        <th>Autores</th>
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