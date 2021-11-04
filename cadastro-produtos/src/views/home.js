import React from "react";

function Home (){
  return(
    <div className="jumbotron">
    <h1 className="display-3">Bem vindo !</h1>
        <p className="lead">
        Esse é seu sistema de produtos ! navegue através da barra, bom proveito!
        </p>
    <hr className="my-4"></hr>
    <p className="lead">
      <a className="btn btn-primary btn-lg" href="#" role="button">Cadastrar</a>
    </p>
  </div>
  )
}

export default Home;