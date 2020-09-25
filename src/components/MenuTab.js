import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import Data from '../../json/menu.json';
import Menus from './Menus';


class MenuTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: Data.menus[0].items
        })
    }

    openModal(item) {
        let data = [...this.state.dataSource];
        const items = data.map(el => {
            if (el.name == item.name) {
                el.isVisible = !el.isVisible;
            } else {
                el.isVisible = false;
            }
            return el;
        });
        this.setState({
            dataSource: items
        })
    }


    render() {

        const { dataSource } = this.state;

        return (
            <View>
                <FlatList
                    data={dataSource}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <TouchableOpacity style={styles.menu} onPress={() => this.openModal(item)}>
                                    <Text style={styles.menuText}>{item.name}</Text>
                                    {/* <Image style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 10 }} source={require(item.image)} /> */}
                                </TouchableOpacity>
                                {!item.isVisible ? null : <Menus items={item.items} />}
                            </View>)
                    }}
                />

            </View>
        )
    }
}


const styles = StyleSheet.create({
    menu: {
        height: 200,
        width: '80%',
        borderWidth: 10,
        borderColor: 'gray',
        marginTop: '2%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    menuText: {
        fontSize: 20,
    },
});

export default MenuTab;