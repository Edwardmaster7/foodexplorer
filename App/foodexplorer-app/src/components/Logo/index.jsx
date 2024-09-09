import React from 'react';
import { Container } from './styles';
import logo from '../../assets/logo_polygon.svg';


function Logo() {
    return (
    <Container>
        <img src={logo} alt="Logo" />
        <h1>food explorer</h1>
    </Container>
    )
}

export default Logo;