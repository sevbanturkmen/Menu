import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import SubMenuTab from './SubMenuTab';

class Menus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            checked:false
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: this.props.items
        })
    }

    setToggleCheckBox(item) {
        const {checked} =this.state;
        let data = [...this.state.dataSource];
        const items=data.map(el => {
            if (el.name == item.name) {
                el.isChecked = !el.isChecked;
                this.setState({checked : false})
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

        // let index = items.findIndex(el => el.name == item.name);
        // items[index] = { ...items[index], key: item.name };

        this.setState({
            dataSource: items
        })
    }


    render() {
        const { dataSource , checked} = this.state;
        return (
            <View>
                <FlatList
                    data={dataSource}
                    keyExtractor={(item, index) => item.name}
                    renderItem={({ item }) => {
                        const view = item.subMenus ?
                            <View>
                                <TouchableOpacity style={styles.menu2} onPress={() => this.openModal(item)}>
                                    <Text style={styles.menu2Text}>{item.name}</Text>
                                    <Text style={styles.menu2Text}>{item.price+' ₺'}</Text>
                                    {/* <Image source={require('./' + icon + '.jpg')} /> */}

                                </TouchableOpacity>
                                {!item.isVisible ? null : <SubMenuTab items={item.subMenus} />}
                            </View>
                            :
                            <View style={styles.menu}>
                                <Text style={styles.menu2Text}>{item.name}</Text>
                                <Text style={styles.menu2Text}>{item.price+ ' ₺'}</Text>
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
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    menu: {
        width: '80%',
        height: 200,
        borderWidth: 2,
        borderColor: 'blue',
        marginTop: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10
    },
    menuText: {
        fontSize: 15,
        marginLeft: '4%'
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

export default Menus;