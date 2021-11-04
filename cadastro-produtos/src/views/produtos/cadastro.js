import React from "react";

import Card from "../../components/card";
import ProdutoService from "../../app/produtoService";
import { withRouter} from 'react-router-dom'

const estadoInicial = {
    nome: ' ',
    sku: ' ',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: [],
    atualizando: false

  }

class CadastroProduto extends React.Component {
    state = estadoInicial;

    constructor(){
        super()
        this.service = new ProdutoService()
    }

    onChange = (event) =>{
        const valor = event.target.value   
        const nomeDoCampo = event.target.name
        this.setState({[nomeDoCampo]: valor})
    }

    onSubmit = (event)=>{
        event.preventDefault();
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        
          }
          try{
          this.service.salvar(produto)
          this.limparCampos()
          this.setState({sucesso: true})
          }catch(erro){
              const errors=  erro.errors
              this.setState({errors: errors })
          }
          
    }

    limparCampos = () =>{
        this.setState(estadoInicial)
    }

    componentDidMount (){
        const sku = this.props.match.params.sku

        if(sku){
           const resultado = this.service.obterProdutos().filter( produto => produto.sku === sku )
           if(resultado.length === 1){
              const produtoEncontrado =  resultado[0]
              this.setState({...produtoEncontrado, atualizando: true })
           }
        }
    }

    render(){
        return(
          <Card header={ this.state.atualizando ? 'Atualização de Produto '  : 'Cadastro de Produto'}>
                  <form id="frmProduto" onSubmit={this.onSubmit}>
                  { this.state.sucesso ? 
                        (
                            <div className="alert alert-dismissible alert-success">
                              <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                              <strong>Muito bem !</strong> <a href="#" className="alert-link">Cadastro realizado com sucesso!</a>.
                            </div>
                        ) : (
                            <></>
                        )
                  }

                  { this.state.errors && this.state.errors.length > 0 &&
                       this.state.errors.map (msg => {
                           return (
                        <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                            <strong>Essa não!</strong> <a href="#" className="alert-link"> {msg}</a>
                         </div>
                           )
                       })
                        
                        
                  }
                
                  <div className="row">
                      <div className="col-md-6">
                          <div className="form-group">
                              <label>Nome: </label>
                              <input type="text" 
                              name="nome"
                              onChange={this.onChange}
                              value={this.state.nome} 
                              className= "form-control"></input>
                          </div>

                      </div>
                      
                  </div>
                  <div className="row">
                      <div className="col-md-6">
                          <div className="form-group">
                              <label>SKU: </label>
                              <input type="text" 
                              name="sku"
                              disabled = {this.state.atualizando}
                              onChange={this.onChange}
                              value={this.state.sku} 
                              className= "form-control"></input>
                          </div>

                      </div>
                      <div className="row">
                          <div className= "col-md-12">
                              <div className="form-group">
                                  <label>Descrição:</label>
                                  <textarea name="descricao" 
                                  value={this.state.descricao} 
                                  onChange={this.onChange} 
                                  className="form-control"/>

                              </div>

                          </div>
                      </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label> Preço: </label>
                                <input type="text" 
                                name="preco" 
                                value={this.state.preco} 
                                onChange={this.onChange}
                                className="form-control"></input>
                            </div>
                        </div>

                    </div> 
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label> Fornecedor: </label>
                                <input type="text" 
                                name="fornecedor" 
                                value={this.state.fornecedor} 
                                onChange={this.onChange}
                                className="form-control"></input>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <button type = "submit" onClick={this.onSubmit} className="btn btn-success">{this.state.atualizando ? 'Atualizar ' : "Cadastrar "}
                            </button>
                        </div>
                        
                    </div> 
                    <div className="row">
                        <div className="col-md-1"><br/>
                            <button onClick={this.limparCampos} className="btn btn-primary">LIMPAR
                            </button>
                        </div>
                        
                    </div> 
                    
                  </div>
                </form>
          </Card>
        )
    }
}


export default withRouter (CadastroProduto);