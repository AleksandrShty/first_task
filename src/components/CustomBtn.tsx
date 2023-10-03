"use client";
import React, {FC} from 'react';
import styled from 'styled-components';

interface ICustomBtn {
  text: string;
  onClick?: () => void;
}

const Btn = styled.button`
    padding: 5px 10px;
    border: none;
    font: inherit;
    color: #fff;
    background: rgb(79, 79, 79);
    cursor: pointer;
    border-radius: 20px;
`;  

const CustomBtn: FC<ICustomBtn> = ({text, onClick}) => {
  return (
    <Btn onClick={onClick}>{text}</Btn>
  );
}

export default CustomBtn;