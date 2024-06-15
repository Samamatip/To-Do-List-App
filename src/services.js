import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

const API = axios.create({
    baseURL: BASE_URL,
});

export const getTodo = async () => {
    const response = await API.get('/todos/get');
    return response.data;
};

export const createTodo = async (todo) => {
    const response = await API.post('/todos/create', todo);
    return response.data;
};

export const updateTodo = async (id, todo) => {
    const response = await API.put(`/todos/update/${id}`, todo);
    return response.data;
};

export const deleteTodo = async (id) => {
    const response = await API.delete(`/todos/delete/${id}`);
    return response.data;
};
