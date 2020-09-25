import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import SubMenuTab from './SubMenuTab';

class Menus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            checked: false
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: this.props.items
        })
    }

    setToggleCheckBox(item) {
        let data = [...this.state.dataSource];
        const items = data.map(el => {
            if (el.name == item.name) {
                el.isChecked = !el.isChecked;
                this.setState({ checked: false })
            } else {
                el.isChecked = el.isChecked;
            }
            return el;
        });
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
                        const view = item.subMenus ?
                            <View>
                                <TouchableOpacity style={styles.menu2} onPress={() => this.openModal(item)}>
                                    <Text style={styles.menuText}>{item.name}</Text>
                                    <Text style={styles.menuText}>{item.price + ' ₺'}</Text>
                                    {/* <Image source={require(item.image)} /> */}

                                </TouchableOpacity>
                                {!item.isVisible ? null : <SubMenuTab items={item.subMenus} />}
                            </View>
                            :
                            <View style={styles.menu}>
                                <Text style={styles.menuText}>{item.name}</Text>
                                <Text style={styles.menuText}>{item.price + ' ₺'}</Text>
                                {/* <Image source={require(item.image)} /> */}
                                <CheckBox
                                    onValueChange={() => this.setToggleCheckBox(item)}
                                    disabled={false}
                                    value={item.isChecked}
                                />
                            </View>

                        return view
                    }
                    }
                />

            </View>
        )
    }
}


const styles = StyleSheet.create({
    menu: {
        width: '80%',
        height: 200,
        borderWidth: 3,
        borderColor: 'blue',
        marginTop: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10
    },
    menuText: {
        marginLeft: '4%',
        fontSize: 16,
        alignSelf: 'center',
    },
    menu2: {
        height: 200,
        width: '80%',
        borderWidth: 8,
        borderColor: 'blue',
        marginTop: '2%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
});

export default Menus;