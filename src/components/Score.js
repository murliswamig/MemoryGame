import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Score =({score})=> {
    return (
      <View style={styles.score_container}>
        <Text style={styles.score}>{score}</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  score_container: {
    alignItems: 'center',
    padding: 10
  },
  score: {
    fontSize: 40,
    fontWeight: 'bold'
  }
});

export default Score;
