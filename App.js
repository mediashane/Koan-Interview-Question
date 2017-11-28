import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import axios from 'axios';
import { Button, Card } from 'react-native-elements';
import _ from 'lodash';

export default class App extends React.Component {

  state = {
    stars: [],
    text: 'Useless Placeholder',
  }

  componentWillMount() {
    this.grabStars();
  }

  grabStars = async () => {
    try {
      const apiCall = await axios.get(`https://api.github.com/search/repositories?q=${this.state.text}+stars:%3E127+language:javascript`);
      const { data } = apiCall;
      const listOfReplies = data.items.map((item, i) => {
        return item.name
      })
      this.setState({ listOfReplies });
      console.log('LIST', listOfReplies);
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
        style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
        onSubmitEditing={() => this.grabStars()}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <FlatList
        data={this.state.listOfReplies}
        renderItem={({item}) => <Text>{item}</Text>}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 200,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
