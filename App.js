import React, {Component} from 'react';
import { View } from 'react-native';
import MenuTab from './src/components/MenuTab';

class App extends Component {

    render() {
        return (
          <View style={{marginTop:15,backgroundColor:'white',flex:1}}>
          <MenuTab/> 
          </View>
        );
    }
}

export default App;
