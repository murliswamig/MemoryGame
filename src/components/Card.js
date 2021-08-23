import React from 'react';
import { StyleSheet, Text,TouchableOpacity } from "react-native";


export default class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let CardSource = 'X';
    let icon_color = '#393939';

    if(this.props.is_open){
      CardSource = this.props.text;
      icon_color = this.props.color;
    }

    return (
        <TouchableOpacity style={styles.card} onPress={this.props.clickCard}>
         <Text style={{fontSize:26,fontWeight:'bold', color:icon_color}}>{CardSource}</Text>
        </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent:"center",
    alignItems: 'center',
    backgroundColor:'#BEBEBE',
    margin:10
  },
  card_text: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});
