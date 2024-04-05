import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTodo } from "../reducer/TodoReducer";
const api_url = 'https://660cff053a0766e85dbf31c3.mockapi.io/QLDanhSach';
// ham in danh sach
export const fetchTodo = () => {
    return async dispatch => {
        try {
            const response = await fetch(api_url);
            const data = await response.json();

            data.forEach(row => {
                dispatch(addTodo(row));
            });
        } catch (error) {
            console.error("Error fetching todos: ", error);
        }
    }
};
// Ham xoa
export const deleteTodoApi = createAsyncThunk(
    'QLDanhSach/deleteTodoApi',
    async (id, thunkApi) => {
        try {
           const response = await fetch(`${api_url}/${id}`, {
            method: 'DELETE',
           });

           if(response.ok) {
            return id;
           }else{
            const errorData = await response.json();
            return thunkApi.rejectWithValue(errorData);
           }
        } catch (error) {
           return thunkApi.rejectWithValue(error.message)
        }
    }
);

// Ham them
export const addTodoApi = createAsyncThunk(
    'QLDanhSach/addTodoApi',
    async(objTodo, thunkApi) => {
        console.log(objTodo);
        try {
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objTodo)
            });
            const data = await response.json();

            if(response.ok) {
                thunkApi.dispatch(addTodo(data));
                return data;
            }else{
                const errorData = await response.json();
                return thunkApi.rejectWithValue(errorData);
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

// Ham cap nhat
export const updateTodoApi = createAsyncThunk(
    'QLDanhSach/updateTodoApi',
    async(objUpdate, thunkApi) => {
        try {
            const response = await fetch(`${api_url}/${objUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objUpdate)
            });
            const data = response.json();
            if(response.ok) {
                return data;
            }else{
                const errorData = await response.json();
                return thunkApi.rejectWithValue(errorData);
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)