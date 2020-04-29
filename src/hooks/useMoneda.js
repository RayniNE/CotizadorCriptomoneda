import React, {Fragment, useState} from 'react';
import styled from 'styled-components';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useMoneda = (label, stateInicial, MONEDAS) => {

    //State de nuestro custom hook.
    const [state, setState] = useState(stateInicial);

    const Seleccionar = () => (
        <Fragment> 

            <Label> {label} </Label>
            <Select 
                onChange={e => setState(e.target.value)}
                value={state}
            >
                <option value=""> -- Seleccione --</option>
                {MONEDAS.map(moneda => 
                    (<option value={moneda.codigo} key={moneda.codigo}> {moneda.nombre} </option>)
                )}
            </Select>

        </Fragment>
    );

    //Se retorna el state, interfaz y la funcion que modifica el State.
    return [state, Seleccionar, setState];

}

export default useMoneda;