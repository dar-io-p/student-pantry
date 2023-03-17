import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {app, auth, db} from '../store/config.js';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import {registerUser} from '../store/auth-config'


const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

    
  return (
    <View style={styles.container}>
        <Text style={{fontWeight:'bold', fontSize:23,}}>
          Register Here!
        </Text>
        <View style={{marginTop:40}}>
          <TextInput style={styles.textInput} 
              placeholder="Display Name" 
              onChangeText={(displayName) => setDisplayName(displayName)}
              autoCorrect={false}
          />
          <TextInput style={styles.textInput} 
            placeholder="Email" 
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <TextInput style={styles.textInput} 
            placeholder="Password" 
            onChangeText={(password)=> setPassword(password)}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
            onPress={()=>registerUser(email, password, displayName)}
            style={styles.button}
        >
          <Text style={{fontWeight:'bold', fontSize:22}}>Register</Text>
        </TouchableOpacity>
      </View>
  )
}

export default Registration

const styles = StyleSheet.create({
  container: {
    flex:1,  
    alignItems:'center',
    marginTop:80,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom:10,
    width:400,
    fontSize: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop:50,
    height:70,
    width:250,
    backgroundColor:'#026efd',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
  }
});