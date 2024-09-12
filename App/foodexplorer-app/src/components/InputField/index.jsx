import React from 'react';
import { Container } from './styles';

function InputField({label, icon, alt, ...props}) {
    return (
        <Container>
            { label && <label htmlFor={label}>{label}</label>}
            <div className="icon">
                { icon && <img src={icon} alt={alt} className="search-icon" /> }
            </div>
            <input alt={alt} {...props} className={icon ? "input-with-icon" : ""} />
        </Container>
    )
}

export default InputField;