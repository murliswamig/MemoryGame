import React from 'react';
import { StyleSheet, View, Button } from 'react-native';


import Header from './components/Header';
import Score from './components/Score';
import Card from './components/Card';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.renderCards = this.renderCards.bind(this);
    this.resetCards = this.resetCards.bind(this);

    Array.prototype.shuffle = function() {
      var i = this.length, j, temp;
      if(i == 0) return this;
      while(--i){
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
      }
      return this;
    }


    let cards = [
      {
        text: 'A',
        color: 'red'
      },
      {
        text: 'B',
        color: '#7d4b12'
      },
      {
        text: 'C',
        color: '#f7911f'
      },
      {
        text: 'D',
        color: '#37b24d'
      },
      {
        text: 'E',
        color: '#ffd43b'
      },
      {
        text: 'F',
        color: '#FF0000'
      },
      {
        text: 'G',
        color: '#5f5f5f'
      },
      {
        text: 'H',
        color: '#24292e'
      },
    ];

    let clone = JSON.parse(JSON.stringify(cards));

    this.cards = cards.concat(clone);
    this.cards.map((obj) => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.src = obj.src;
      obj.is_open = false;
    });

    this.cards = this.cards.shuffle();
    this.state = {
      current_selection: [],
      selected_pairs: [],
      score: 0,
      cards: this.cards
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
          {
            this.renderRows.call(this)
          }
        </View>
        <Score score={this.state.score} />
        <Button
          onPress={this.resetCards}
          title="Reset"
          color="#008CFA"
        />
      </View>
    );
  }


  resetCards() {
    let cards = this.cards.map((obj) => {
      obj.is_open = false;
      return obj;
    });

    cards = cards.shuffle();

    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards,
      score: 0
    });
  }


  renderRows() {
    let contents = this.getRowContents(this.state.cards);
    return contents.map((cards, index) => {
      return (
        <View key={index} style={styles.row}>
          { this.renderCards(cards) }
        </View>
      );
    });

  }


  renderCards(cards) {
    return cards.map((card, index) => {
      return (
        <Card
          key={index}
          text={card.text}
          color={card.color}
          is_open={card.is_open}
          clickCard={this.clickCard.bind(this, card.id)}
        />
      );
    });
  }


  clickCard(id) {
    let selected_pairs = this.state.selected_pairs;
    let current_selection = this.state.current_selection;
    let score = this.state.score;

    let index = this.state.cards.findIndex((card) => {
      return card.id == id;
    });

    let cards = this.state.cards;

    if(cards[index].is_open == false && selected_pairs.indexOf(cards[index].text) === -1){

      cards[index].is_open = true;

      current_selection.push({
        index: index,
        text: cards[index].text
      });

      if(current_selection.length == 2){
        if(current_selection[0].text == current_selection[1].text){
          score += 1;
          selected_pairs.push(cards[index].text);
        }else{

          cards[current_selection[0].index].is_open = false;

          setTimeout(() => {
            cards[index].is_open = false;
            this.setState({
              cards: cards
            });
          }, 500);
        }

        current_selection = [];
      }

      this.setState({
        score: score,
        cards: cards,
        current_selection: current_selection
      });

    }

  }


  getRowContents(cards) {
    let contents_r = [];
    let contents = [];
    let count = 0;
    cards.forEach((item) => {
      count += 1;
      contents.push(item);
      if(count == 4){
        contents_r.push(contents)
        count = 0;
        contents = [];
      }
    });

    return contents_r;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 18,
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20,
    marginBottom:20,
  }
});
