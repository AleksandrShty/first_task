import axios from 'axios';

export async function deleteTodo(id: number) {
    const {data} = await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return data;
}