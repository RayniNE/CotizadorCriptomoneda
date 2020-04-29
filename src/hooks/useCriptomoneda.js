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

const useCriptomoneda = (label, stateInicial, criptos) => {

    //State de nuestro custom hook.
    const [state, setState] = useState(stateInicial);

    const SelectCripto = () => (
        <Fragment> 

            <Label> {label} </Label>
            <Select 
                onChange={e => setState(e.target.value)}
                value={state}
            >
                <option value=""> -- Seleccione --</option>
                {criptos.map(cripto => 
                    (<option value={cripto.CoinInfo.Name} key={cripto.CoinInfo.Id}> {cripto.CoinInfo.FullName} </option>)
                )}
            </Select>

        </Fragment>
    );

    //Se retorna el state, interfaz y la funcion que modifica el State.
    return [state, SelectCripto, setState];

}

export default useCriptomoneda;