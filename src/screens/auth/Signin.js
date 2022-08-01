import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

const Signin = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View style={{ flex: 1, backgroundColor: '#2C2C3C', justifyContent: 'center' }}>
        <View style={styles.containt}>
          <Text style={styles.signinText}>Sign In</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
            placeholder={'User Name'}
            placeholderTextColor={'#ffffff'}
          // value={text}
          />
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
            secureTextEntry={true}
            placeholder={'Password'}
            placeholderTextColor={'#ffffff'}
          // value={text}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, }}>
            <TouchableOpacity>
              <Text style={styles.forgotPssword}>Forgot Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Home')}>
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