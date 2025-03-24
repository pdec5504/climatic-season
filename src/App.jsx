import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import "@fortawesome/fontawesome-free/css/all.css"

class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      estacao: null,
      data: null,
      icone: null,
      mensagemDeErro: null
    }
  }

  obterEstacao = (data,latitude) => {
    const anoAtual = data.getFullYear()

    //1/1 Inverno no Norte, Verão no Sul
    const d0 = new Date(anoAtual, 0, 1)
 
    //21/03 Primavera no Norte, Outono no Sul
    const d1 = new Date(anoAtual, 2, 21)
    
    //21/06 Verão no Norte, Inverno no Sul
    const d2 = new Date(anoAtual, 5, 21)
    
    //24/09 Outono no Norte, Primavera no Sul
    const d3 = new Date(anoAtual, 8, 24)
    
    //22/12 Inverno no Norte, Verão no Sul
    const d4 = new Date(anoAtual, 11, 22)

    //31/12 Inverno no Norte, Verão no Sul
    const d5 = new Date(anoAtual, 11, 31)

    // data = new Date(anoAtual, 4, 22)

    const sul = latitude < 0
    if (data >= d0 && data < d1) {
      return sul ? "Verão" : "Inverno"
    }
    if (data >= d1 && data < d2) {
      return sul ? "Outono" : "Primavera"
    }
    if (data >= d2 && data < d3) {
      return sul ? "Inverno" : "Verão"
    }
    if (data >= d3 && data < d4) {
      return sul ? "Primavera" : "Outono"
    }
    if (data >= d4 && data < d5) {
      return sul ? "Verão" : "Inverno"
    }
    return "erro"
    
  }

  icones = {
    "Primavera": "fa-seedling",
    "Verão": "fa-umbrella-beach",
    "Outono": "fa-tree",
    "Inverno": "fa-snowman"
  }

  obterLocalizacao = () => {
    window.navigator.geolocation.getCurrentPosition(
      (posicao) => {
        let data = new Date()
        let estacao = this.obterEstacao(data, posicao.coords.latitude)
        let icone = this.icones[estacao]
        console.log(icone)
        this.setState(
          {
            latitude: posicao.coords.latitude,
            longitude: posicao.coords.longitude,
            estacao: estacao,
            data: data.toLocaleTimeString(),
            icone: icone
          }
        )
      },
      (erro) => {
        console.log(erro)
        this.setState({mensagemDeErro: `Tente novamente mais tarde`})
      }
    )
  }

  render(){
    console.log(this.state)
    return(
      //respondividade, margem acima
      <div className="container mt-2">
        {/* uma linha, conteúdo centralizado, display é flex */}
        <div className="row justify-content-center">
          {/* oito colunas das doze disponíveis serão usadas para telas médias em diante */}
          <div className="col-md-8">
            {/* um cartão Bootstrap */}
            <div className="card">
              {/* o corpo do cartão */}
              <div className="card-body">
                {/* centraliza verticalmente, margem abaixo */}
                <div className="d-flex align-items-center border rounded mb-2"
                style={{height:"6rem"}}>
                  {/* ícone obtido do estado do componente */}
                  <i className={`fas fa-5x ${this.state.icone}`}></i>
                  {/* largura 75%, margem no à esquerda (start), fs aumenta a fonte */}
                  <p className="w-75 ms-3 text-center fs-1">{this.state.estacao}</p>
                </div>
                <div>
                  <p className="text-center">
                    {/* renderização condicional */}
                    {
                      this.state.latitude ?
                      `Coordenadas: ${this.state.latitude}, ${this.state.longitude}. Data: ${this.state.data}`
                      :
                      this.state.mensagemDeErro ?
                      `${this.state.mensagemDeErro}`
                      :
                      "Clique no botão para saber sua estação climática"
                    }
                  </p>
                </div>
                {/* botão azul (outline, 100% de largura e margem acima) */}
                <button onClick={this.obterLocalizacao}
                className="btn btn-outline-primary w-100 mt-2">
                  Qual a minha estação?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default App