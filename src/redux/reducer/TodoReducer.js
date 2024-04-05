import { createSlice } from "@reduxjs/toolkit";
import { deleteTodoApi, updateTodoApi } from "../actions/todoAction";

//B1: Khai bao khoi tao, chữ initialState dùng để lưu danh sách Todo
const initialState = {
    listTodo: []
}

//B2: Thiết laapn cho Reducer= to

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo (state, action) {
            state.listTodo.push (action.payload);
            // Khi gọi hàm addTodo thì sẽ truyền vào cho hàm tham số là dữ liệu của payload
        },

        // Có thêm các action khác thì viết ở đây
        
        
    },
    extraReducers: builder => {
        builder.addCase(deleteTodoApi.fulfilled, (state, action) => {
            // Xoa phan tu khoi mang
            state.listTodo = state.listTodo.filter(row => row.id !== action.payload);
        }) .addCase(deleteTodoApi.rejected, (state, action) => {
            console.log("Delete rejected: ", action.error.message);
        });

        builder.addCase(updateTodoApi.fulfilled, (state, action) => {
            const {id, title, moTa, ngayThuChi, loaiThuChi, soTienThu, soTienChi} = action.payload;
            const todo = state.listTodo.find(row => row.id === id);
            if(todo) {
                todo.title = title; //gan gia tri
                todo.moTa = moTa;
                todo.ngayThuChi = ngayThuChi;
                todo.loaiThuChi = loaiThuChi;
                todo.soTienThu = soTienThu;
                todo.soTienChi = soTienChi;
            }
        })
    }
});
// export các thành phần để sang Screen để sử dụng
export const {addTodo} = todoSlice.actions;
export default todoSlice.reducer;