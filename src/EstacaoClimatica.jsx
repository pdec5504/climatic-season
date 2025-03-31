import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import '@fortawesome/fontawesome-free/css/all.css'


export class EstacaoClimatica extends React.Component{

    timer = null
    state = {
        data:null
    }

    componentDidMount(){
        console.log("componentDidMount")
        this.timer = setInterval(() => {
            this.setState({data: new Date().toLocaleString()})
        }, 1000)
    }

    componentWillUnmount(){
        console.log('componentWillUnmount')
        clearInterval(this.timer)
    }

    componentDidUpdate(){
        console.log('componentDidUpdate')
    }

    render(){
        return(
            <div className="card">
                {/* o corpo do cartão */}
                <div className="card-body">
                    {/* centraliza verticalmente, margem abaixo */}
                    <div className="d-flex align-items-center border rounded mb-2" style={{height:"6rem"}}>
                        {/* ícone obtido do estado do componente */}
                        <i className="{`fas fa-5x ${this.props.icone}`}"></i>
                        {/* largura 75%, margem no à esquerda (start), fs aumenta a fonte */}
                        <p className="w-75 ms-3 text-center fs-1">{this.props.estacao}</p>
                    </div>
                    <div>
                        <p className="text-center">
                            {/* renderização condicional */}
                            {
                                this.props.latitude?
                                `Coordenadas: ${this.props.latitude}, ${this.props.longitude}. Data: ${this.state.data}`
                                :
                                `Clique no botão para saber a sua estação climática`
                            }
                        </p>
                    {/* botão azul (outline, 100% de largura e margem acima) */}
                    <button onClick={this.props.obterLocalizacao} 
                    className="btn btn-outline-primary w-100 mt-2">
                        Qual a minha estação?
                        </button>
                    </div>
                </div>
            </div>


        )


    }

}