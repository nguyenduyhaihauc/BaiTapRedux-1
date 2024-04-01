import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "../reducer/TodoReducer";

export default configureStore({
    reducer: {
        listTodo: TodoReducer //dung de luu danh sach du lieu
    }
});