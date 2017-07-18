import React, {Component} from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({error: '', loading: true});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLogingSucces.bind(this))
      .catch((err) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLogingSucces.bind(this))
          .catch(this.onLogingFail.bind(this));
      });
  }

  onLogingSucces(){
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
  }

  onLogingFail(){
    this.setState({
      error: 'Falha de autenticação',
      loading: false
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small"/>;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
        <Input
          label="Email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder="user@gmail.com"
        />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder="password"
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }

}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
