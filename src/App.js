  
import React, {Component, useState} from 'react';
import './App.css';
import axios from 'axios';
import pokemon from './pokemon.png'

class App extends React.Component {

  state = {
    response: [],
    estado: null
    
    }
    
    handlerBuscar(t){
    
      var buscar = t.target.value;
      this.setState({value : buscar });
    
    }


consultarApiRandom(){

 
  
    var aleatorio=Math.round(Math.random()*800)+1;
    axios.get("https://pokeapi.co/api/v2/pokemon/"+ aleatorio
    )
    .then(
      dato => {
        console.log( dato.data);
  
        this.setState({
          response: dato.data,
          estado: true
        })
        console.log(this.state)
   })


}



consultarApi(){

  var buscar = this.state.value;
 
 if(buscar === null ){
  axios.get("https://pokeapi.co/api/v2/pokemon/"
  )
  .then(
    dato => {
      console.log( dato.data);

      this.setState({
        response: dato.data,
        estado: true
      })
      console.log(this.state)

    });

 
  
  }else{

  axios.get("https://pokeapi.co/api/v2/pokemon/"+buscar)
  .then(
    dato => {
      console.log( dato.data);

      this.setState({
        response: dato.data,
        estado: true
      })
      console.log(this.state)

    });
  }
}



  
render(){


  if(this.state.estado !== true && this.state.estado !== true){
    return (
      <div className="App">
        
        <img src={pokemon} className="App-logo" alt="pokemon" />
       
        <div>
        
        <h2>¡Elige tu pokemon!</h2>
          <input type="text" pattern="[a-z]{1,15}" name="name" required  onChange={this.handlerBuscar.bind(this)}/>
          <input type="button" value="Buscar" onClick={this.consultarApi.bind(this)}/>
        </div>
       
        <div>
        
            <h2>¡Déjalo a la suerte!</h2>
      
            <input type="button" value="Buscar" onClick={this.consultarApiRandom.bind(this)}/>
                  
       </div>
       

       
      </div>
    );

    }else if(this.state.estado === true) {
    return (
      <div className="App">

        <div>
        <img src={pokemon} className="App-logo" alt="pokemon" />
        </div>
        
      <div className="ApiDatosBusqueda">
        <h2>Tu pokemon elegido es</h2>
       <table>
            <tr>
              
              <th>Nombre</th>
              <th>Habilidades</th>
              <th>Imagen</th>

           </tr>
           <tr>
              <td>{this.state.response.name}</td>
               <td>
                 <ul>
                {this.state.response.abilities.map(item => (
                  <li key={item.ability.name}>
                    {item.ability.name} 
                  </li>
                ))}
                 </ul></td>
              <td> <img src={this.state.response.sprites.front_default}  className="img" alt="Gif"></img></td>
            </tr>
           
          </table>
              
          
       </div>
      </div>
    );
}
}

}

export default App;
