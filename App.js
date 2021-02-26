import auth from '@react-native-firebase/auth';
import React,{Component} from 'react';
import {View,Button,TextInput} from 'react-native';

import { NativeModules } from 'react-native';
const { RNTwitterSignIn } = NativeModules;

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '10380559452-spg0n47gf2mgsn9p0s586por83hcg2sc.apps.googleusercontent.com',
});

RNTwitterSignIn.init('GAvmV6Wd18eSfrnrVf2Ucf23k', 'z6fGEHoIC88pYAkZyt1kmcxx3zjOpa5niL8PdMWVXUoApkYzi8').then(() =>
  alert('Twitter SDK initialized'),
);

export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:''
    };
  }

  authentication = ()=>{
    var email = this.state.email;
    var password = this.state.password;
    auth()
    .signInWithEmailAndPassword(email,password)
    .then(()=>{
      alert(auth().currentUser.uid);
    })
    .catch(error =>{
      alert(error);
    });
  }

  forgetPassword = ()=>{
    var email = this.state.email;
    auth()
    .sendPasswordResetEmail(email)
    .then(()=>{
      alert("Please check your mail")
    })
    .catch(error =>{
      alert(error);
    });
  }

  signup = () =>{
    var email = this.state.email;
    var password = this.state.password;
    auth()
    .createUserWithEmailAndPassword(email,password)
    .then(() => {
      alert(auth().currentUser.uid);
    })
    .catch(error =>{
      alert(error);
    });
  }

  googleSignIn = async () =>{
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential).then(()=>{
        alert(auth().currentUser.uid);
      });
    } catch (error) {
      alert(error);
    }
  }

  twitterLogin = async () =>{
    try{
      const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();
      const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
      return auth().signInWithCredential(twitterCredential).then(()=>{
        alert(auth().currentUser.uid);
      });
    }
    catch(error){
      alert(error);
    }
  }

  render(){
    return(
      <View>
        <TextInput placeholder={'Enter Email'} onChangeText={email=>this.setState({email})} style={{
          alignItems:'center'
        }}/>
        <TextInput placeholder={'Enter Password'} onChangeText={password=>this.setState({password})} secureTextEntry={true}/>
        <Button title="Sign Up" onPress={this.signup}/>
        <Button title="Login" onPress={this.authentication}/>
        <Button title="Forget Password" onPress={this.forgetPassword}/>
        <GoogleSigninButton onPress={this.googleSignIn}></GoogleSigninButton>
        <Button title="Twitter" onPress={this.twitterLogin}/>
      </View>
    );
  }
}