import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, deleteTodo, updateTodo} from '../redux/reducer/TodoReducer';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import { addTodoApi, deleteTodoApi, fetchTodo, updateTodoApi } from '../redux/actions/todoAction';

const TodoScreen = () => {
  // Khai báo state để thêm
  const [title, setTitle] = useState('');
  const [moTa, setMoTa] = useState('');
  const [ngayThuChi, setNgayThuChi] = useState('');
  const [loaiThuChi, setLoaiThuChi] = useState('');
  const [soTienThu, setSoTienThu] = useState('');
  const [soTienChi, setSoTienChi] = useState('');
  // Khai báo useState để hiển thị Modal
  const [modalVisible, setModalVisible] = useState(false);
  // Khai bao useState Modal thong ke
  const [statisticModal, setStatisticModal] = useState(false);
  // Khai báo useState để lưu giá trị tìm kiếm
  const [searchTitle, setSearchTitle] = useState('');

  // Lấy danh sách trong Store
  const listTodo = useSelector(state => state.listTodo.listTodo);

  // Lấy đối tượng để điều khiển các action
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  // Viết hàm thêm bản ghi
  const handleAddTodo = () => {
    if(title.trim() === '' || moTa.trim === '' || ngayThuChi.trim === '' || loaiThuChi.trim() === '' || soTienThu.trim() === '' || soTienChi.trim() === ''){
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if(isNaN(parseFloat(soTienThu)) || parseFloat(soTienThu) <= 0 || isNaN(parseFloat(soTienChi)) || parseFloat(soTienChi) <= 0) {
      Alert.alert('Số tiền phải là số và phải lớn hơn 0');
      return;
    }
    let duLieuThem = {
      id: Math.random().toString(),
      title: title,
      moTa: moTa,
      ngayThuChi: ngayThuChi,
      loaiThuChi: loaiThuChi,
      soTienThu: soTienThu,
      soTienChi: soTienChi,
    };
    // Gọi action thêm
    dispatch(addTodoApi(duLieuThem))
    .then((result) => {
      console.log("Add successfully");
    });
    setTitle('');
    setMoTa('');
    setNgayThuChi('');
    setLoaiThuChi('');
    setSoTienThu('');
    setSoTienChi('');
    
  };
// Ham xoa
  const handleDeleteTodo = id => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa không?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Hủy xóa'),
          style: 'cancel'
        },
        {
          text: 'Xóa',
          onPress: () => {
            dispatch(deleteTodoApi(id));
          },
        },
      ],
      {cancelable: false}
    );
    
  };

  // Danh cho sua can co State de luu trang thai
  const [editTitle, setEditTitle] = useState('');
  const [editMota, setEditMota] = useState('');
  const [editNgayThuChi, setEditNgayThuChi] = useState('');
  const [editLoaiThuChi, setEditLoaiThuChi] = useState('');
  const [editSoTienThu, setEditSoTienThu] = useState('');
  const [editSoTienChi, seteditSoTienChi] = useState('');
  const [idEdit, setidEdit] = useState(null);

  const handleEdit = (
    id,
    title,
    moTa,
    ngayThuChi,
    loaiThuChi,
    soTienThu,
    soTienChi,
  ) => {
    setEditTitle(title);
    setEditMota(moTa);
    setEditNgayThuChi(ngayThuChi);
    setEditLoaiThuChi(loaiThuChi);
    
    setEditSoTienThu(soTienThu);
    seteditSoTienChi(soTienChi);
    setidEdit(id);
    setModalVisible(true); //Mo Modal sua khi an vao Edit
  };

  // Luu ket qua sau khi update
  const handleUpdate = () => {
    if(editTitle.trim() === '' || editMota.trim() === '' || editNgayThuChi.trim() === '' || editLoaiThuChi.trim() === '' || editSoTienThu.toString().trim() === '' || editSoTienChi.toString().trim() === ''){
      Alert.alert('Vui lòng nhập đầy đủ');
      return;
    }

    if(isNaN(parseFloat(editSoTienThu)) || parseFloat(editSoTienThu) <= 0 || isNaN(parseFloat(editSoTienChi)) || parseFloat(editSoTienChi) <= 0) {
      Alert.alert('Số tiền phải là số và phải lớn hơn 0');
      return;
    }
// =================
    if (
      editTitle.trim() !== '' ||
      editMota.trim() !== '' ||
      editNgayThuChi.trim() !== '' ||
      editLoaiThuChi.trim() !== '' ||
      editSoTienThu.trim() !== '' ||
      editSoTienChi.trim() !== ''
    ) {
      dispatch(
        updateTodoApi({
          id: idEdit,
          title: editTitle,
          moTa: editMota,
          ngayThuChi: editNgayThuChi,
          loaiThuChi: editLoaiThuChi,
          soTienThu: editSoTienThu,
          soTienChi: editSoTienChi,
        })
      )
      .then((result) => {
        console.log("Update successfully");
        setTitle('');
        setMoTa('');
        setNgayThuChi('');
        setLoaiThuChi('');
        setSoTienThu('');
        setSoTienChi('');
        setidEdit(null);
        setModalVisible(false); //Dong cua so sua khida sua xong
      });
// =======================
      
    }
  };
  // ham thong ke
  const [totalThu, setTotalThu] = useState(0);
  const [totalChi, setTotalchi] = useState(0);
  const handleStatistic = () => {
    let totalThu = 0;
    let totalChi = 0;

    // Duyệt qua các todo tính tổng số tienf thu và tổng số tiền chi
    listTodo.forEach(todo => {
      // Cộng số tiền thu
      totalThu += parseFloat(todo.soTienThu);
      totalChi += parseFloat(todo.soTienChi);
    });
    // toFixed lấy sau dấu phẩy
    setTotalThu(totalThu.toFixed(3));
    setTotalchi(totalChi.toFixed(3));
    setStatisticModal(true);
  };

  // Hàm lọc danh sách todo dựa trên tiêu đề tìm kiếm
  const filteredList = listTodo.filter(item =>
    item.title.toLowerCase().includes(searchTitle.toLowerCase()),
  );

  return (
    <ScrollView>
      <View>
        <TextInput
          placeholder="Nhập tiêu đề"
          onChangeText={setTitle}
          value={title}
          style={styles.inputHader}
        />
        <TextInput
          placeholder="Nhập mô tả"
          onChangeText={setMoTa}
          value={moTa}
          style={styles.inputHader}
        />
        <TextInput
          placeholder="Nhập ngày thu chi"
          onChangeText={setNgayThuChi}
          value={ngayThuChi}
          style={styles.inputHader}
        />
        <TextInput
          placeholder="Nhập loại thu chi"
          onChangeText={setLoaiThuChi}
          value={loaiThuChi}
          style={styles.inputHader}
        />
        <TextInput
          placeholder="Nhập số tiền thu"
          onChangeText={setSoTienThu}
          value={soTienThu.toString()}
          style={styles.inputHader}
        />
        <TextInput
          placeholder="Nhập số tiền chi"
          onChangeText={setSoTienChi}
          value={soTienChi.toString()}
          style={styles.inputHader}
        />

        <View
          style={{
            margin: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
            <Pressable onPress={handleAddTodo} style={{
              width: 100,
              backgroundColor: 'yellow',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1, 
              borderColor: 'orange',
              borderRadius: 10,
              paddingVertical: 10
            }}>
              <Text style={{
                color: 'black',
                fontWeight: '600'
              }}>Add</Text>
            </Pressable>

            <Pressable onPress={handleStatistic} style={{
              width: 100,
              backgroundColor: 'yellow',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1, 
              borderColor: 'orange',
              borderRadius: 10,
              paddingVertical: 10
            }}>
              <Text style={{
                color: 'black',
                fontWeight: '600'
              }}>Thống kê</Text>
            </Pressable>
          
          
        </View>
        {/* Tim kiem  */}
        <TextInput
          placeholder="Nhập tiêu đề cần tìm kiếm..........."
          style={styles.inputHader}
          onChangeText={setSearchTitle}
          value={searchTitle}
        />

        {/* Hien thi danh sach */}

        {filteredList.map(row => (
          <View
            key={row.id}
            style={{
              padding: 10,
              margin: 10,
              // backgroundColor: 'cyan',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'orange',
            }}>
            <Text style={styles.stText}>Tiêu đề: {row.title} </Text>
            <Text style={styles.stText}>Mô tả: {row.moTa} </Text>
            <Text style={styles.stText}>Ngày thu chi: {row.ngayThuChi} </Text>
            <Text style={styles.stText}>Loại thu chi: {row.loaiThuChi} </Text>
            <Text style={styles.stText}>Số tiền thu: {row.soTienThu} </Text>
            <Text style={styles.stText}>Số tiền chi: {row.soTienChi} </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity onPress={() => handleDeleteTodo(row.id)}>
                <Text style={{color: 'red'}}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleEdit(
                    row.id,
                    row.title,
                    row.moTa,
                    row.ngayThuChi,
                    row.loaiThuChi,
                    row.soTienThu,
                    row.soTienChi,
                  )
                }>
                <Text style={{color: 'blue'}}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Mo Dialog */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
                width: '80%',
                marginVertical: 10,
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '800',
                  }}>
                  Update
                </Text>
              </View>

              <TextInput
                value={editTitle}
                onChangeText={setEditTitle}
                style={styles.csInput}
              />
              <TextInput
                value={editMota}
                onChangeText={setEditMota}
                style={styles.csInput}
              />
              <TextInput
                value={editNgayThuChi}
                onChangeText={setEditNgayThuChi}
                style={styles.csInput}
              />
              <TextInput
                value={editLoaiThuChi}
                onChangeText={setEditLoaiThuChi}
                style={styles.csInput}
              />
              <TextInput
                value={editSoTienThu.toString()}
                onChangeText={setEditSoTienThu}
                style={styles.csInput}
              />
              <TextInput
                value={editSoTienChi.toString()}
                onChangeText={seteditSoTienChi}
                style={styles.csInput}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Button title="Update" onPress={handleUpdate} />
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal thong ke */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={statisticModal}
          onRequestClose={() => setStatisticModal(!statisticModal)}>
          <View style={styles.modalContainer}>
            <View style={styles.statisticModal}>
              <View
                style={{
                  alignItems: 'center',
                  margin: 10,
                }}>
                <Text
                  style={{
                    color: 'orange',
                    fontSize: 20,
                    fontWeight: '600'
                  }}>
                  Thống kê
                </Text>
              </View>

              <Text style={styles.statisticText}>
                Tổng số tiền thu: {totalThu} đ
              </Text>
              <Text style={styles.statisticText}>
                Tổng số tiền chi: {totalChi} đ
              </Text>
              <Button title="Đóng" onPress={() => setStatisticModal(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = {
  csInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'back',
    padding: 8,
    margin: 10,
  },
  stText: {
    color: 'black',
    padding: 4,
  },
  modalContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  statisticModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  statisticText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  inputHader: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
  },
};

export default TodoScreen;
