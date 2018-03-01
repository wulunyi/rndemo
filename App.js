/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  // Text,
  View,
  ToastAndroid,
  TouchableWithoutFeedback,
  NativeModules
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Grid,
  Col
 } from 'native-base';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends Component {
  state = {
    activeMenuItem: 1,
    menuTagList: [1,2,3,4,5,6,7,7],
    menuDataList: []
  }

  handleMenuItemPress = async (id) => {
    this.setState({
      activeMenuItem: id,
    })

    try {
      await NativeModules.customAndroid.setAlignment(1);
      await NativeModules.customAndroid.printOriginalText(`RIR CHINR \n`);
      await NativeModules.customAndroid.printOriginalText(`中国国际航空公司 \n`);
      await NativeModules.customAndroid.setAlignment(0);
      await NativeModules.customAndroid.printOriginalText(`WULUNYI`);
      await NativeModules.customAndroid.printOriginalText(`菜单 ${id} \n`);
      await NativeModules.customAndroid.lineWrap(5);
    } catch (error) {
      NativeModules.show('error');
    }
  }

  render() {
    const {activeMenuItem, menuTagList} = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='home' />
            </Button>
          </Left>
          <Body >
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>

        <View style={{position: 'relative', flex: 1}}>
          <Grid>
            <Col style={{width: 81, backgroundColor: '#f4f4f4'}}>
              <KeyboardAwareScrollView style={{flex: 1, borderRightWidth: 1, borderRightColor: '#adadad'}}>
                {
                  menuTagList.map( (item, index) => (
                    <View style={[styles.menuItem, index === activeMenuItem && styles.active]} key={index}>
                      <TouchableWithoutFeedback onPress={() => this.handleMenuItemPress(index)}>
                        <Text style={[styles.menuItemText, index === activeMenuItem && styles.activeText]}> 菜名{item}/{index}</Text>
                      </TouchableWithoutFeedback>
                    </View>
                  ))
                }
              </KeyboardAwareScrollView>
            </Col>
            <Col style={{flex: 1}}>
            </Col>
          </Grid>
        </View>

        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    height: 50,
  },
  menuItemText: {
    lineHeight: 50,
    textAlign: 'center',
    color: '#5D5D5D'
  },
  active: {
    backgroundColor: '#fff',
    borderLeftColor: '#8C161B',
    borderLeftWidth: 4,
  },
  activeText: {
    color: '#8C161B',
    fontWeight: 'bold',
  }
});
