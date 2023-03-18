import React,{useState, useEffect} from 'react'
import { Text , StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import {app, auth, db} from '../store/config.js';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import {changePassword} from '../store/auth-config'

const Dashboard = () => {
  const [name, setName] = useState([]);


  useEffect(() => {
    onAuthStateChanged(auth, (user) =>  {
      if (user) {
        setName(user.displayName)
      } else {
        console.log("User not signed in")
      }
    })
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      
        <Text style={{fontSize:20, fontWeight:'bold'}}>
          Hello, {name}
        </Text>
        <TouchableOpacity
            onPress={()=>{
              changePassword()
          }}
            style={styles.button}
        >
          <Text style={{fontWeight:'bold', fontSize:22}}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={async ()=>{
              await signOut(auth);
          }}
            style={styles.button}
        >
          <Text style={{fontWeight:'bold', fontSize:22}}>Sign Out</Text>
        </TouchableOpacity>
      
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex:1,  
    alignItems:'center',
    marginTop:100,
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
