import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect,useState} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { signinUserEmail, uid } from '../../redux/action/auth.action';

const Signin = ({ navigation }) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  useEffect(() => {
    dispatch(uid())
  },[])
  

  const dispatch = useDispatch()

  const LoginHandler = () => {
    if (email !== '' && password !== '') {
      dispatch(signinUserEmail(email, password,navigation))
    } else {
      alert('Fill up all details.')
    }
  };



  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View style={{ flex: 1, backgroundColor: '#2C2C3C', justifyContent: 'center' }}>
        <View style={styles.containt}>
          <Text style={styles.signinText}>Sign In</Text>
          <TextInput
            style={styles.input}
            onChangeText={(a) => setEmail(a)}
            placeholder={'User Name'}
            placeholderTextColor={'#ffffff'}
          // value={text}
          />
          <TextInput
            style={styles.input}
            onChangeText={(a) => setPassword(a)}
            secureTextEntry={true}
            placeholder={'Password'}
            placeholderTextColor={'#ffffff'}
          // value={text}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, }}>
            <TouchableOpacity>
              <Text style={styles.forgotPssword}>Forgot Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={()=> LoginHandler()} >
              <AntDesign name="arrowright" color={'#ffffff'} size={30} style={{ padding: 25, backgroundColor: 'red', borderRadius: 100, }} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text></Text>
        </View>

      </View>
      <StatusBar backgroundColor={'#2C2C3C'} barStyle={'light-content'} />
    </SafeAreaView>
  )
}

export default Signin

const styles = StyleSheet.create({
  containt: {
    marginHorizontal: 24
  },
  signinText: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 70,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    padding: 0,
    paddingBottom: 5,
    marginBottom: 25,
    color: '#ffffff'
  },
  forgotPssword: {
    color: '#999999',
    fontWeight: '500'

  }
})