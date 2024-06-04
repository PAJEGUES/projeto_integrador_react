"use client"
import "./search"
import axios from "axios"
import { useState,useEffect } from "react";
import Search from "./search";



export default function Maps(){
const [clientes, endereco] = useState ([])

function buscaEndereco(){
    axios.get("http://10.60.46.36:5000/get_nightguard")
    .then(function(response){
        endereco(Object.keys(response.data.message))
        console.log("id")
   })
}
  
useEffect(()=>{
    buscaEndereco();
[]})


    // Formato do nominatim:
    // numero/rua/cidade/estado/pais

    const center = {
        lat: -3.745,
        lng: -38.523
      };

    return(
        <div id="iframe">
            <div id="bE" >
                <ul>
                    <li onClick={()=>buscaEndereco()}> id</li>
                    {
                        clientes.map(clientes =>{
                          return<li >{clientes.id}</li>
                       })
                    }
                </ul>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3698.6483072294013!2d-47.89397872384746!3d-22.024782579885667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b87722afe006bb%3A0x4a8b254e7543696!2sSenac%20S%C3%A3o%20Carlos!5e0!3m2!1sen!2sbr!4v1715387405233!5m2!1sen!2sbr" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    );
}