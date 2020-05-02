import {AsyncStorage} from 'react-native';
const uuid = require('react-native-uuid');


module.exports = {

  async checkUserCredentials(){
    let userKey = await this.getData('@uuidKey');
    if (userKey === null || userKey === '') {
      await this.createUUID();
    }
  },

  async getUUID(){
    await this.checkUserCredentials();
    let userKey = await this.getData('@uuidKey')
    return userKey;
  },

  async createUUID(){
    const newKey = uuid.v4();
    try{
      await AsyncStorage.setItem('@uuidKey', newKey);
    }catch(e){
      return 'Error to create a new key';
    }
  },

  async getData(dataTarget){
    let value = await AsyncStorage.getItem(dataTarget);
    return value;
  },

  async deleteCredentials(){
    try{
      await AsyncStorage.removeItem('@uuidKey');
    }catch(e){
      return 'Erro ao deletar item'
    }
  }
}
