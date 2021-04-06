import React from 'react'
import styled from 'styled-components'

const StyledI = styled.i`
    border: solid #333;
    border-width: 0 5px 5px 0;
    display: inline-block;
    padding: 3px;
    height: 5px;
    width: 5px;
    cursor: pointer;

    &:hover {
        opacity: 0.4;
    }

    transform: ${({direction}) =>
        direction === 'left' ? 'rotate(135deg)' : 'rotate(-45deg)'};

    ${({direction}) =>
        direction === 'left' ? 'margin-left: 1em;' : 'margin-right: 1em;'}
`;

const Arrow = ({
    onClick,
    direction
}) => {
    return (
        <a onClick={onClick}>
            <StyledI direction={direction} />
        </a>
    )
}

export default Arrow