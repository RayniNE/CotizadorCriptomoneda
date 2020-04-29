import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';

const Boton = styled.input`

margin-top: 20px;
font-weight: bold;
font-size: 20px;
padding: 10px;
background-color: #66a2fe;
border: none;
width: 100%;
border-radius: 10px;
color: #FFF;
transition: background-color .3s ease;

&:hover{
    background-color: #326ac0;
    cursor: pointer;
}

`;

const Formulario = ({setMoneda, setCriptomoneda}) => {

    //State del listado de Criptomonedas.
    
    const [criptos, setCriptos] = useState([]);
    
    const [error, setError] = useState(false);

    const MONEDAS = [
        {
            codigo: 'USD',
            nombre: 'Dolar de Estados Unidos'
        },
        {
            codigo: 'MXN',
            nombre: 'Peso mexicano'
        },
        {
            codigo: 'EUR',
            nombre: 'Euro'
        },
        {
            codigo: 'GBP',
            nombre: 'Libra Esterlina'
        },
        {
            codigo: 'DOP',
            nombre: 'Peso dominicano'
        }

    ];

    //Utilizar useMoneda.
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '', MONEDAS);

    //Utilizar useCriptomoneda.
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', criptos  );



    //Ejecutar llamado a la API.
    useEffect(() => {
        const consultarApi = async() => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            setCriptos(resultado.data.Data);
        }
        consultarApi();
    }, [])


    const cotizarMoneda = e => {
        e.preventDefault();

        //Validar
        if(moneda === '' || criptomoneda === ''){
            setError(true);
            return;
        }
        //Pasar datos al componente principal.
        setError(false);
        setMoneda(moneda);
        setCriptomoneda(criptomoneda);
    }

    return (

        <form
            onSubmit={cotizarMoneda}
        >  
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectMonedas/>

            <SelectCripto/>

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>

      );
}
 
export default Formulario;