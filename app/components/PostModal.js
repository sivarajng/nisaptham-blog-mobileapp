import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

export default class PostModal extends Component {

    render() {
        return (

            <Modal isVisible={this.props.isVisible}>
                <View style={{ flex: 1 }}>
                    <Text>Hello!</Text>
                </View>
            </Modal>

        )
    }

}