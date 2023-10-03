"use client";
import React, {FC} from 'react';
import styled from 'styled-components';

import CustomBtn from './CustomBtn';

interface ITodoItem {
    textTask: string;
    handleRemoveTask: () => void;
}

const ItemsWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
`;

  const BodyItem = styled.div`
    display: flex;
    align-items: center;
    width: 500px;
    height: 20px;
    border-radius: 10px;
    background: rgb(79, 79, 79);;
    color: #fff;
    padding: 10px;
    margin-right: 15px;
    cursor: pointer;
`;

const TodoItem: FC<ITodoItem> = ({textTask, handleRemoveTask}) => {
  return (
    <ItemsWrapper>
        <BodyItem>
            {textTask}
        </BodyItem>
        <CustomBtn text='Remove task' onClick={handleRemoveTask} />
    </ItemsWrapper>
  );
}

export default TodoItem;