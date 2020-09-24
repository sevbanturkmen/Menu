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
        // let index = items.findIndex(el => el.name == item.name);
        // items[index] = { ...items[index], key: item.name };

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
                    keyExtractor={(item, index) => item.name}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <TouchableOpacity style={styles.menu2} onPress={() => this.openModal(item)}>
                                    <Text style={styles.menu2Text}>{item.name}</Text>
                                    <Image style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 10 }} />
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
        width: '90%',
        height: '10%',
        borderWidth: 0.5,
        borderColor: 'white',
        marginTop: '2%',
        marginBottom: '1%',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'blue'
    },
    menuText: {
        fontSize: 15,
        marginLeft: '4%'
    },
    menu2: {
        height: 200,
        width: '80%',
        borderWidth: 10,
        borderColor: 'gray',
        marginTop: '2%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10
    },
    menu2Text: {
        fontSize: 20,
    },
    checkboxContainer: {
        padding: 0,
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 0,
        borderColor: '#aaa',
        borderWidth: 1,
    },
});

export default MenuTab;