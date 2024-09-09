import React from 'react';
import { Container } from './styles';

function InputField({label, ...props}) {
    return (
        <Container>
            <label htmlFor={label}>{label}</label>
            <input {...props} />
        </Container>
    )
}

export default InputField;