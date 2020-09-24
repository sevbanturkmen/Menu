import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Menu from '../../json/menu.json';
import SubMenus from './SubMenus';

class SubMenuTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

    componentDidMount() {
        const subMenus = this.props.items.map(item => {
            const data = Menu.menus.find(el => el.key == item)
            return {
                title: data.description,
                items: Menu.menus.find(el => el.key == item)
            }
        });

        this.setState({
            dataSource: subMenus
        })
    }

    openModal(item) {
        let data = [...this.state.dataSource];
        const items = data.map(el => {
            if (el.title == item.title) {
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
                    keyExtractor={(item, index) => item.title}
                    renderItem={({ item }) => 

                        <View>
                            <TouchableOpacity style={styles.menu2} onPress={() => this.openModal(item)}>
                                        <Text style={styles.menu2Text}>{item.title}</Text>
                                        {/* <Image source={require('./' + icon + '.jpg')} /> */}
                            </TouchableOpacity>
                            {!item.isVisible ? null : <SubMenus items={item.items.items} />}
                        </View>
                    
                    }
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
        borderWidth: 5,
        borderColor: 'black',
        marginTop: '2%',
        alignSelf: 'center',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    menu2Text: {
        marginLeft: '4%',
        fontSize: 16,
        alignSelf: 'center',
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

export default SubMenuTab;