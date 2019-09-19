import React, { Component } from "react";
import Buscador from "./components/Buscador";
import Resultado from "./components/Resultado";

class App extends Component {
  state = {
    termino: "",
    imagenes: [],
    pagina: ""
  };

  scroll = () => {
    const elemento = document.querySelector(".jumbotron");
    elemento.scrollIntoView("smooth", "end");
  };

  paginaAnterior = () => {
    //leer el state de la pagina actual
    let pagina = this.state.pagina;

    //leer si pagina es 1
    if (pagina === 1) return null;

    //sumar uno a la pagina actual
    pagina--;
    //agregar el cambio al state
    this.setState(
      {
        pagina //no es necesario poner el nombre debido a que son iguales
      },
      () => {
        this.consultarApi();
        this.scroll();
      }
    );
  };

  paginaSiguiente = () => {
    //leer el state de la pagina actual
    let pagina = this.state.pagina;
    //sumar uno a la pagina actual
    pagina++;
    //agregar el cambio al state
    this.setState(
      {
        pagina
      },
      () => {
        this.consultarApi();
        this.scroll();
      }
    );
  };
  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const api_key = ""; //put your key here
    const url = `https://pixabay.com/api/?key=${api_key}&q=${termino}&per_page=30
    &page=${pagina}`;

    // console.log(url);
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes: resultado.hits }));
  };

  datosBusqueda = termino => {
    this.setState(
      {
        termino: termino,
        pagina: 1
      },
      () => {
        this.consultarApi();
      }
    );
  };

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>
          <Buscador datosBusqueda={this.datosBusqueda} />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
