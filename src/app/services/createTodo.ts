import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export async function createTodo(text: string) {
    const {data} = await axios.post(
        `https://jsonplaceholder.typicode.com/todos`, {
            id: Number(uuidv4()),
            title: text,
            completed: false,
            userId: 120
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return data;
}