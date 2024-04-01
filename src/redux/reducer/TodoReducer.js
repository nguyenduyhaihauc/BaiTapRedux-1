import { createSlice } from "@reduxjs/toolkit";

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
        deleteTodo (state, action) {
            // Xoa phan tu khoi mang
            state.listTodo = state.listTodo.filter(row => row.id !== action.payload);
        },
        updateTodo (state, action) {
            // lấy tham số truyền vào
            const {id, title, moTa, ngayThuChi, loaiThuChi, soTienThu, soTienChi} = action.payload;
            // Tìm bản ghi phù hợp với tham số truyền vào
            const todo = state.listTodo.find(row => row.id === id);
            // update
            if(todo) {
                todo.title = title; //gan gia tri
                todo.moTa = moTa;
                todo.ngayThuChi = ngayThuChi;
                todo.loaiThuChi = loaiThuChi;
                todo.soTienThu = soTienThu;
                todo.soTienChi = soTienChi;
            }
        }
    }
});
// export các thành phần để sang Screen để sử dụng
export const {addTodo, deleteTodo, updateTodo} = todoSlice.actions;
export default todoSlice.reducer;