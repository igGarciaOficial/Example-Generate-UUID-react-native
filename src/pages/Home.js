import React from 'react';
import {View, Text, Button} from 'react-native';
import {styleHome} from '../styles/home-style.js';

const controllerUUID = require('../services/credentials.js')

export default class Home extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      uuidKey: 'uuidKey'
    }

    this.deleteCredentialAndState = this.deleteCredentialAndState.bind(this);
    this.createCredentialAndState = this.createCredentialAndState.bind(this);

  }

  async deleteCredentialAndState(){
    let result = await controllerUUID.deleteCredentials();
    if (!result) this.setState({uuidKey:''})
    else alert('Erro ao deletar item')
  }
  async createCredentialAndState(){
    await controllerUUID.createUUID();
    let key = await controllerUUID.getUUID();
    this.setState({uuidKey: key});
  }

  async componentDidMount(){
    let key = await controllerUUID.getUUID();
    this.setState({uuidKey: key});
  }


  render(){
    return (
      <View style={styleHome.container}>
        <Text>UUID KEY:</Text>


        <Text>{this.state.uuidKey}</Text>

        <View style={styleHome.containerButton}>
          <Button
            title='Delete uuid'
            color='red'
            onPress ={this.deleteCredentialAndState}
            style={styleHome.deleteButton}
          />
        </View>
        <View style={styleHome.containerButton}>
          <Button
            title='New uuid'
            color='green'
            onPress ={this.createCredentialAndState}
            style={styleHome.deleteButton}
          />
        </View>

      </View>
    )
  }

}
