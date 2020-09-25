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
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) =>

                        <View>
                            <TouchableOpacity style={styles.menu} onPress={() => this.openModal(item)}>
                                <Text style={styles.menuText}>{item.title}</Text>
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
        height: 200,
        width: '80%',
        borderWidth: 5,
        borderColor: 'black',
        marginTop: '2%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    menuText: {
        marginLeft: '4%',
        fontSize: 16,
        alignSelf: 'center',
    },
});

export default SubMenuTab;