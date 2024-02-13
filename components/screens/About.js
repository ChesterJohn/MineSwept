
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About the Game</Text>
      <Text style={styles.description}>
        Minesweeper Game is a classic single-player puzzle game. The objective is to clear a rectangular board
        containing hidden "mines" or bombs without detonating any of the.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4ac0fd',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'ChalkboardSE-Regular' ,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default About;
