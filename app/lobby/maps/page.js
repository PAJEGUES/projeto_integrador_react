"use client"
import "./search"
import axios from "axios"
import React, { useState,useEffect } from 'react';
import Search from "./search";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "../payment/page"
import dynamic from "next/dynamic"; // Importação dinâmica para evitar problemas de SSR


// Carregar o leaft dinamicamente
const leaflet = dynamic(() => import ("leaflet"), {ssr: false});

export default function Maps ({ cliente }){
    const [local, alteraLocalizacao] = useState(null);
    const [map, setMap] = useState (null);

    useEffect(() =>{
        if (cliente){
            const endereco = `${cliente.address} ${cliente.housenumber}, Sao Carlos, Sao Paulo, Brasil`.split(" ").join("+");
            buscaLocalizacao(endereco);
        }
    },[cliente]);

    useEffect(() => {
        if (local && !isNaN(local.lat) && !isNaN(local.lon)) {
            if (map) {
                map.setView([local.lat, local.lon], 16);
                L.marker([local.lat, local.lon])
                    .addTo(map)
                    .bindPopup('Localização do cliente')
                    .openPopup();
            } else {
                const newMap = L.map('map').setView([local.lat, local.lon], 16);
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(newMap);

                L.marker([local.lat, local.lon])
                    .addTo(newMap)
                    .bindPopup('Localização do cliente')
                    .openPopup();

                setMap(newMap);
            }
        }
    },[local,map]);

    function buscaLocalizacao(endereco) {
        const url = `https://nominatim.openstreetmap.org/search.php?q=${endereco}&format=jsonv2`;

        axios.get(url)
            .then(response => {
                const location = response.data[0];
                alteraLocalizacao({
                    lat: parseFloat(location.lat),
                    lon: parseFloat(location.lon)
                });
            })
            .catch(error => {
                console.error("Houve um erro ao buscar os dados de localização!", error);
            });
    }

    return (
        <div>
            {/* <div>
                <ul>
                    <li>O endereço do cliente é: {cliente?.neighborhood}</li>
                </ul>
            </div> */}
            <div id="map" style={{ height: '50vh', width: '100%' }}>
                {local === null && <p>Carregando...</p>}
            </div>
        </div>
    );


}


//export default function Maps(){
 
//    const [cliente, alteraCliente] = useState ({});
//    const [local, alteraLocalizacao] = useState (null)
//    const [map, setMap] = useState(null);  // Estado para armazenar a instância do mapa
//    useEffect(() => {
//        buscaEndereco();
 
//    }, []);
 
//    useEffect(() => {
//        if (local && !isNaN(local.lat) && !isNaN(local.lon)){
            //Verifica se o mapa já foi inicializado
//                if (map){
//                    map.setView([local.lat, local.lon], 16);
//                    L.marker([local.lat, local.lon])
//                        .addTo(map)
//                        .bindPopup('Localização do cliente')
//                        .openPopup();
//                } else{
//                    // Inicializa o mapa
//                    const newMap = L.map('map').setView([local.lat, local.lon], 16);
// 
//                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//                    maxZoom: 19,
//                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                    }).addTo(newMap);
                   
                    // // Adicione um marcador ao mapa
//                    L.marker([local.lat, local.lon])
//                        .addTo(newMap)
//                        .bindPopup('Localização do cliente')
//                        .openPopup();
 
//                    setMap(newMap); // Armazena a instancia do mapa
//                }
//         }
//     }, [local, map]);
//    function buscaEndereco (){
 
//        axios
//            .get("/api/get_client/" + cliente.id)
//            .then(response =>{
//                const client = response.data;
//                const endereco =  `${client.address} ${client.housenumber}, Sao Carlos, Sao Paulo, Brasil`.split(" ").join("+");
 
//                buscaLocalizacao(endereco);
//                alteraCliente(client);
//        })
//        .catch(error =>{
//            console.error("Houve um erro ao buscar dados do cliente!", error);
//       });
//    }
 
//    function buscaLocalizacao(endereco){
//        const url = `https://nominatim.openstreetmap.org/search.php?q=${endereco}&format=jsonv2`;
 
//        axios
//            .get(url)
//            .then(response =>{
//                const location = response.data[0];
//                alteraLocalizacao({
//                    lat: parseFloat(location.lat),
//                    lon: parseFloat (location.lon)
//                }) ;
//            })
//            .catch(error => {
//                console.error("Houve um erro ao buscar os dados de localização!", error);
//            });
//    }
   
//    return (
//        <div>
//            <div>
//               <ul>
//                    <li>O endereço do cliente é: {cliente.neighborhood}</li>
//                </ul>
//            </div>
//           <div id="map" style={{ height: '450px', width: '600px' }}>
//                {local === null && <p>Carregando...</p>}
//            </div>
//        </div>
//    );
//}