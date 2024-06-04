"use client"
import "./search"
import axios from "axios"
import { useState,useEffect } from "react";
import Search from "./search";



export default function Maps(){

    const [cliente, alteraCliente] = useState ({});
    const [local, alteraLocalizacao] = useState (null)

    function buscaEndereco(){
        axios.get("/api/get_client/7")
        .then(function(response){
            console.log(response.data)
            alteraCliente(response.data)

            const client = response.data;
            const endereco = `${client.housenumber}/${client.address}/saocarlos/saopaulo/brasil`;
            //let endereco =  client.housenumber+"/"+client.address+"/"+saocarlos+"/"+saopaulo+"/"+brasil

            // chama buscaLozalizacao com o endereco obtido
            buscaLocalizacao(endereco);
            // Retorna o endereco para caso seja necessário
            return endereco;
        })
        .catch(function(error){
            console.error("Houve um erro ao buscar os dados do cliente!",error);
        });
    }

    function buscaLocalizacao(endereco){

        let url = "https://nominatim.openstreetmap.org/search?format=json&q=" + endereco;

       // let url = "https://nominatim.openstreetmap.org/.ui/search.html?"+endereco
      
        axios.get(url)
        .then(function(response){
            console.log(response.data);
            if (response.data.length > 0){
                const location = responde.data[0];
                alteraLocalizacao({
                    lat: parseFloat(location.lat),
                    lon: parseFloat(location.lon)
                });
            }
        })
        .catch(function(error) {
            console.error("Houve um erro ao buscar os dados de localização!", error);
        });
    }
    useEffect(()=>{
        buscaEndereco();
    
    },[]);


    // Formato do nominatim:
    // numero/rua/cidade/estado/pais

   // const center = {
     //   lat: -3.745,
       // lng: -38.523
     // };

    return(
        <div id="iframe">
            <div id="bE" >
                <ul>
                    <li>O endereço do cliente é: {cliente.neighborhood} </li>
                </ul>
            </div>



            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3698.6483072294013!2d-47.89397872384746!3d-22.024782579885667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b87722afe006bb%3A0x4a8b254e7543696!2sSenac%20S%C3%A3o%20Carlos!5e0!3m2!1sen!2sbr!4v1715387405233!5m2!1sen!2sbr" width="600" height="450"   loading="lazy" ></iframe>
        </div>
    );
}