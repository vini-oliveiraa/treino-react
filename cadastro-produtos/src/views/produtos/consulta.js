import React from "react"

import Card from "../../components/card"
import ProdutosTable from './produtosTable'
import produtoService from "../../app/produtoService"
import { withRouter } from "react-router"

 class ConsultaProdutos extends React.Component{
    state = {
        produtos : []
    }

    constructor(){
        super()
        this.service = new produtoService();
    }

    componentDidMount(){
       const produtos = this.service.obterProdutos()
       this.setState({produtos})
    }

    preparaEditar = (sku) => {
        console.log('sku para editar:', sku)
       this.props.history.push(`/cadastro-produtos/${sku}`)
    }

    deletar = (sku) => {
        const produtos = this.service.deletar(sku)
        this.setState({produtos})
    }

    render(){
        return(
            <Card header="Consulta de Produtos">
                <ProdutosTable>
                produtos = {this.state.produtos} 
                editarAction={ this.preparaEditar} 
                deletarAction = { this.deletar}
                </ProdutosTable>

            
            </Card>
        )
    }
}
export default withRouter(ConsultaProdutos);
