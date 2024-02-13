import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../controls/Button';

export default function Home({ route }) {
  const navigation = useNavigation();
  const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');

  useEffect(() => {
    if (route.params?.selectedDifficulty) {
      setSelectedDifficulty(route.params.selectedDifficulty);
    }
  }, [route.params?.selectedDifficulty]);

  const handleSelectDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
    navigation.navigate('Settings', { selectedDifficulty: difficulty });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minesweeper</Text>
      <View style={styles.difficultyContainer}>
        <Text style={styles.difficultyText}>
          {selectedDifficulty ? `Difficulty: ${selectedDifficulty}` : 'Difficulty not set'}
        </Text>
      </View> 
      <Button title="New Game" onPress={() => navigation.navigate('Game', { selectedDifficulty: selectedDifficulty })} />
      <Button title="High Scores" onPress={() => navigation.navigate("Highscore")} />
      <Button title="Settings" onPress={() => navigation.navigate("Settings")} /> 
      <Button title="About" onPress={() => navigation.navigate('About')} />   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4ac0fd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'ChalkboardSE-Regular' ,
    marginBottom: 20,
  },
  difficultyContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  difficultyText: {
    fontSize: 16,
  },
});

