import firebase from 'firebase';
import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null};

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC7yChGPFH7EeZt5zQI9F65oIvdTfv8sXg',
      authDomain: 'authfirabesereactnativeapp.firebaseapp.com',
      databaseURL: 'https://authfirabesereactnativeapp.firebaseio.com',
      projectId: 'authfirabesereactnativeapp',
      storageBucket: 'authfirabesereactnativeapp.appspot.com',
      messagingSenderId: '672626499780'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.setState({loggedIn: true});
      }else{
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent(){
    console.log("aqui");
    switch (this.state.loggedIn) {
      case true:
        //firebase.auth().signOut();

        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }

  }

  render() {
    return(
      <View>
        <Header headerText="Autenticação"></Header>
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
