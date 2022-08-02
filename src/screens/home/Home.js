import { Image, SafeAreaView, ScrollView, StyleSheet, Modal, Text, TextInput, TouchableOpacity, View, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { backgroundColor } from '../../colors/colors'
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { uploadProduct } from '../../redux/action/product.action'
import { getproduct } from '../../redux/action/product.action';
import { getProductDetail } from '../../redux/action/product.action';

const Home = ({ navigation }) => {
  const [menu, setMenu] = useState('1')
  const [open, setOpen] = useState(false);
  const [productImage, setProductImage] = useState('')
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [discription, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [itemDetailId, setItemDetailId] = useState('');

  const [items, setItems] = useState([
    { label: 'Phone', value: 'phones' },
    { label: 'Wearable', value: 'wearable' },
    { label: 'Laptop', value: 'laptop' },
    { label: 'Drones', value: 'drones' }
  ]);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getproduct())
  }, [])

  const imageHandler = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(async image => {
      let a = image.path.split("/")
      let fileName = a[a.length - 1];
      console.log(fileName);
      const reference = storage().ref('/product/' + fileName);
      await reference.putFile(image.path);
      const url = await storage().ref('/product/' + fileName).getDownloadURL();
      setProductImage(url)
      console.log(url);
    });
  }

  const uploadProductHandler = () => {
    if (!(productImage === '' || name === '' || discription === '' || price === '' || category === '')) {
      const data = ({
        productImage,
        name,
        discription,
        category,
        price
      })
      dispatch(uploadProduct(data))
      setCategory('')
      setDescription('')
      setName('')
      setProductImage('')
      setPrice('')
    } else {
      alert('Fillup all details...')
    }
  }


  console.log('itemDetailId', itemDetailId);

  const allProduct = useSelector(state => state.product)
  const addedItems = ({ item }) => {
    return (
      <TouchableOpacity style={{
        marginTop: 20, height: 90, marginHorizontal: 20,
        backgroundColor: 'rgba(55, 146, 220, 0.16)', borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
      }} onPress={() => {
        setModalVisible(true)
        setItemDetailId(item.id)
      }}>
        <View>
          <Image source={{
            uri: item.imgURl
          }} style={{ height: 90, width: 90, borderRadius: 5, }} />
        </View>
        <View style={{ marginLeft: 15, }}>
          <Text numberOfLines={1} style={{ color: 'black', fontSize: 18, fontWeight: '600', maxWidth: 200, paddingVertical: 3, }}>{item.name}</Text>
          <Text numberOfLines={2} style={{ color: 'gray', fontSize: 14, fontWeight: '500', maxWidth: 200, paddingVertical: 3, }}>{item.details}</Text>
          <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', paddingVertical: 3, }}>₹ {item.price}</Text>
        </View>
      </TouchableOpacity>

    )
  }

  // if (modalVisible === true) {
  //   dispatch(getProductDetail(itemDetailId))
  // }




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <View style={{ flex: 1, }}>
        <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 28, letterSpacing: 3, fontWeight: '500', color: '#000000' }}>MyShop-Admin</Text>
          <TouchableOpacity>
            <AntDesign name="setting" color={'#000000'} size={25} />
          </TouchableOpacity>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity onPress={() => setMenu('0')}>
            <Text style={[styles.menuItem, menu == 0 ? styles.selectColor : styles.menuItem]}>Data Stat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenu('1')}>
            <Text style={[styles.menuItem, menu == 1 ? styles.selectColor : styles.menuItem]}>Upload Item</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenu('2')}>
            <Text style={[styles.menuItem, menu == 2 ? styles.selectColor : styles.menuItem]}>All Data</Text>
          </TouchableOpacity>
        </View>
        {
          menu === '1' ?
            <>
              <ScrollView>
                <View style={styles.menuData}>
                  <DropDownPicker
                    open={open}
                    value={category}
                    items={items}
                    setOpen={setOpen}
                    setValue={setCategory}
                    setItems={setItems}
                    containerStyle={styles.categoryDropdown}
                  />

                  <View style={styles.pickImage}>
                    {
                      productImage == '' ?
                        <Image source={require('../../images/1.jpg')} style={{ height: 50, width: 50, borderRadius: 10 }} />
                        :
                        <Image source={{
                          uri: productImage
                        }} style={{ height: 50, width: 50, borderRadius: 10 }} />
                    }

                    <TouchableOpacity onPress={() => imageHandler()}>
                      <Text style={styles.pickImageBtn}>Pick Image</Text>
                    </TouchableOpacity>
                  </View>

                  <TextInput
                    style={styles.input}
                    onChangeText={(a) => setName(a)}
                    value={name}
                    placeholder={'Enter Item name'}
                    placeholderTextColor={'#000000'}
                  />

                  <TextInput
                    style={styles.descriptionInput}
                    onChangeText={(a) => setDescription(a)}
                    value={discription}
                    placeholder={'Enter item Description'}
                    placeholderTextColor={'#000000'}
                    multiline
                    numberOfLines={4}

                  />

                  <TextInput
                    style={styles.input}
                    onChangeText={(a) => setPrice(a)}
                    value={price}
                    placeholder={'Enter item price (₹)'}
                    placeholderTextColor={'#000000'}
                  />

                </View>

                {/* <View style={{ position: 'absolute', bottom: 30, width: '100%', }}> */}
                <View style={{ marginTop: 70, marginBottom: 10, width: '100%', }}>
                  <TouchableOpacity style={styles.uploadView} onPress={() => uploadProductHandler()}>
                    <Text style={styles.uploadBtn}>Upload Product</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>

            </>
            :
            null
        }
        {
          menu === '2' ?
            <>
              <FlatList
                data={allProduct.product}
                renderItem={addedItems}
                keyExtractor={item => item.id}
              />

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => [setModalVisible(!modalVisible), setItemDetailId('')]}
                    >
                      <AntDesign name="close" color={'#ffffff'} size={25} />
                    </Pressable>

                    {
                    allProduct.product.map((d) => {
                     if(d.id === itemDetailId){
                      return(
                        <Image source={{uri: d.imgURl}} style={{ width: 380,
                          height: 200, borderTopRightRadius: 20,
                          borderTopLeftRadius: 20,}} />
                      )
                     }
                    })}
                  </View>
                </View>
              </Modal>
            </>
            :
            null
        }
      </View>

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#rgba(0, 0, 0, 0.28)',
    marginTop: 35,
  },
  menuItem: {
    color: '#000000',
    paddingBottom: 12,
    fontWeight: '500',
    fontSize: 20,
  },
  selectColor: {
    color: '#3b3688',
    borderBottomColor: '#3b3688',
    borderBottomWidth: 3,
  },
  menuData: {
    marginHorizontal: 20
  },
  categoryDropdown: {
    marginTop: 30,
    borderRadius: 50,
  },
  pickImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    padding: 5,
  },
  pickImageBtn: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#3b3688',
    color: '#ffffff',
    fontSize: 18,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
    fontSize: 16,
    color: '#000000'
  },
  descriptionInput: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
    fontSize: 16,
    color: '#000000',
    height: 80,
  },
  uploadView: {
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: '#3b3688',
  },
  uploadBtn: {
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    width: '100%'

  },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: 380,
    height: 500,
    // margin: 20,
    backgroundColor: "white",
    // borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 100,
    padding: 10,
    // elevation: 2,
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 100,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "rgba(55, 146, 220, 0.1)",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: '#000000',
    marginBottom: 15,
    textAlign: "center"
  }
})