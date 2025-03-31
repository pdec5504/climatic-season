import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import "@fortawesome/fontawesome-free/css/all.css"
import { EstacaoClimatica } from "./EstacaoClimatica"

class App extends React.Component{

  // o construtor deixa de ser escrito explicitamente, então comentamos
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     latitude: null,
  //     longitude: null,
  //     estacao: null,
  //     data: null,
  //     icone: null,
  //     mensagemDeErro: null
  //   }
  // }

  // inicializando o estado sem usar o construtor
  state = {
    latitude: null,
    longitude: null,
    estacao: null,
    data: null,
    icone: null,
    mensagemDeErro: null
  }

  componentDidMount(){
    this.obterLocalizacao()
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
    return(
      //respondividade, margem acima
      <div className="container mt-2">
        {/* uma linha, conteúdo centralizado, display é flex */}
        <div className="row justify-content-center">
          {/* oito colunas das doze disponíveis serão usadas para telas médias em diante */}
          <div className="col-md-8">
            {
              this.state.mensagemDeErro?
              <p className="border rounded p-2 fs-1 text-center">
                É preciso dar permissão para acesso à localização.
                  Atualize a página e tente de novo, ajustando a configuração
                  no seu navegador.
              </p>
              :
            <EstacaoClimatica
            icone={this.state.icone}
            estacao={this.state.estacao}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            data={this.state.data}
            mensagemDeErro={this.state.mensagemDeErro}
            obterLocalizacao={this.state.obterLocalizacao}
            />
            }
          </div>
        </div>
      </div>
    )
  }

}

export default App