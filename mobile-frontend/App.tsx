import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import React, { Component, ReactNode } from 'react';
import logo from './assets/carp-scales.jpg';
import WordService, { Word } from './services/wordService';

type WordState = {
  word: Word,
  ws: WordService
};

class App extends Component<{}, WordState> {
  __noWord : Word = { text: 'No Word Yet', 
                          words: []
                        };
  state = {
    word: this.__noWord,
    ws: new WordService()
  };

  onPress = async () => {
    const newWord = await this.state.ws.nextWord();
    console.log("got word: ", newWord.text);
    this.setState({
      word: newWord
    })
  };

  render () {
    return (
    <View style={styles.container}>
      <Text style={{color: '#888', fontSize: 48}}>GHOTI</Text>
      <Image source={logo} style={{ width: 305, height: 159 }} />       
      <Text style={{color: '#888', fontSize: 18}}>Welcome to Ghoti!</Text>
      <Text style={{color: '#888', fontSize: 18}}>Press the button to get a word.</Text>
      <StatusBar style="auto" />
      <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
        >
         <Text>New Word</Text>
        </TouchableOpacity>
        <Text>Your word is: {this.state.word.text}</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 20,
    marginBottom: 20,
    marginTop: 20
  }
});

export default App;