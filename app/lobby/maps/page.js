"use client"
import "./search"
import axios from "axios"
import React, { useState,useEffect } from 'react';
import Search from "./search";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


export default function Maps(){

    const [cliente, alteraCliente] = useState ({});
    const [local, alteraLocalizacao] = useState (null)
    const [map, setMap] = useState(null);  // Estado para armazenar a instância do mapa

    useEffect(() => {
        buscaEndereco();
    }, []);

    useEffect(() => {
        if (local && !isNaN(local.lat) && !isNaN(local.lon)){
            //Verifica se o mapa já foi inicializado
                if (map){
                    map.setView([local.lat, local.lon], 16);
                    L.marker([local.lat, local.lon])
                        .addTo(map)
                        .bindPopup('Localização do cliente')
                        .openPopup();
                } else{
                    // Inicializa o mapa
                    const newMap = L.map('map').setView([local.lat, local.lon], 16);

                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(newMap);
                    
                    // // Adicione um marcador ao mapa
                    L.marker([local.lat, local.lon])
                        .addTo(newMap)
                        .bindPopup('Localização do cliente')
                        .openPopup();

                    setMap(newMap); // Armazena a instancia do mapa
                }
         }
     }, [local, map]);

    function buscaEndereco (){

        axios
            .get("/api/get_client/16")
            .then(response =>{
                const client = response.data;
                const endereco =  `${client.address} ${client.housenumber}, Sao Carlos, Sao Paulo, Brasil`.split(" ").join("+");

                buscaLocalizacao(endereco);
                alteraCliente(client);
        })
        .catch(error =>{
            console.error("Houve um erro ao buscar dados do cliente!", error);
        });
    }

    function buscaLocalizacao(endereco){
        const url = `https://nominatim.openstreetmap.org/search.php?q=${endereco}&format=jsonv2`;

        axios
            .get(url)
            .then(response =>{
                const location = response.data[0];
                alteraLocalizacao({
                    lat: parseFloat(location.lat),
                    lon: parseFloat (location.lon)
                }) ;
            })
            .catch(error => {
                console.error("Houve um erro ao buscar os dados de localização!", error);
            });
    }
    

    return (
        <div>
            <div>
                <ul>
                    <li>O endereço do cliente é: {cliente.neighborhood}</li>
                </ul>
            </div>
            <div id="map" style={{ height: '450px', width: '600px' }}>
                {local === null && <p>Carregando...</p>}
            </div>
        </div>
    );
}

//    function buscaEndereco(){
//        axios.get("/api/get_client/17")
//        .then(function(response){
//            console.log(response.data)
//            alteraCliente(response.data)

//            const client = response.data;
//            const endereco = `${client.address}/${client.housenumber}/sao carlos/sao paulo/brasil`.split(" ").join("+");
            // const endereco = `${client.address}/${client.housenumber}/sao carlos/sao paulo/brasil`.split(" ").join("+");
//            console.log(endereco)
            //let endereco =  client.housenumber+"/"+client.address+"/"+saocarlos+"/"+saopaulo+"/"+brasil

            // chama buscaLozalizacao com o endereco obtido
//            buscaLocalizacao(endereco);
            // Retorna o endereco para caso seja necessário
           
//        })
//        .catch(function(error){
//            console.error("Houve um erro ao buscar os dados do cliente!",error);
//       });
//    }

//    function buscaLocalizacao(endereco){

//        let url = "https://nominatim.openstreetmap.org/search.php?q="+endereco+"&format=jsonv2";
//        console.log(url)

       // let url = "https://nominatim.openstreetmap.org/ui/search.html?"+endereco
      
//        axios.get(url)
//        .then(function(response){
//            console.log(response.data);
            
//                const location = response.data[0];
//                alteraLocalizacao({
//                   lat: parseFloat(location.lat),
//                    lon: parseFloat(location.lon)
//                });
//            })
//            .catch(function(error) {
//                console.error("Houve um erro ao buscar os dados de localização!", error);
//            });
//        }
//        console.log(local)
//    useEffect(()=>{
//        buscaEndereco();
    
//    },[]);


    // Formato do nominatim:
    // numero/rua/cidade/estado/pais

   // const center = {
     //   lat: -3.745,
       // lng: -38.523
     // };

     // https://www.google.com/maps/place/21%C2%B059'46.2%22S+47%C2%B051'55.7%22W/@-21.9961711,-47.8680554,17z

     // -22.0081316, lon: -47.8918591 <<< Senac

//    return(
//        <div id="iframe">
//            <div id="bE" >
//                <ul>
//                    <li>O endereço do cliente é: {cliente.neighborhood} </li>
//                </ul>
//            </div>
//            {
//                local!=null?
//
//                // <iframe src="    https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d3699.395001337505!2d-47.8680554!3d-21.9961711!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDU5JzQ2LjIiUyA0N8KwNTEnNTUuNyJX!5e0!3m2!1sen!2sbr!4v1717548007831!5m2!1sen!2sbr" width="600" height="450"  loading="lazy"></iframe>
//                <iframe src={`https://www.openstreetmap.org/#map=19/-22.00401/-47.89188`} width="600" height="450"   loading="lazy" ></iframe>
//                // <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3698.6483072294013!2d${local.lon}!3d${local.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b87722afe006bb%3A0x4a8b254e7543696!2s!5e0!3m2!1sen!2sbr!4v1715387405233!5m2!1sen!2sbr`} width="600" height="450"   loading="lazy" ></iframe>
//
//                //<iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3698.6483072294013!2d${local.lon}!3d${local.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b87722afe006bb%3A0x4a8b254e7543696!2sSenac%20S%C3%A3o%20Carlos!5e0!3m2!1sen!2sbr!4v1715387405233!5m2!1sen!2sbr`} width="600" height="450"   loading="lazy" ></iframe>
//                    :
//                    <p>Carregando</p>
//            }
//        </div>
//    );
//}