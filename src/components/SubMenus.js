import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

class SubMenus extends Component {

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
        data.map(el => {
            if (el.name == item.name) {
                el.isChecked = !el.isChecked;
                if (item.price !== undefined) {
                    if (el.isChecked == true) {
                        alert(item.price + ' ₺ fiyat artışı olacaktır.')
                    }
                }
                this.setState({ checked: false })
            } else {
                el.isChecked = false;
            }
            return el;
        });
    }

    render() {
        const { dataSource } = this.state;
        return (
            <View>
                <FlatList
                    data={dataSource}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) =>
                        <View style={styles.menu}>

                            <Text style={styles.menuText}>{item.name}</Text>
                            <Text style={styles.menuText}>{item.price ? item.price + ' ₺' : null}</Text>
                            {/* <Image source={require(item.image} /> */}
                            <CheckBox
                                onValueChange={() => this.setToggleCheckBox(item)}
                                disabled={false}
                                value={item.isChecked}
                            />
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
        borderWidth: 3,
        borderColor: 'red',
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

export default SubMenus;