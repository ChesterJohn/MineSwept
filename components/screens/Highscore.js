import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../controls/Button';
import Icon from 'react-native-vector-icons/FontAwesome';


const Highscore = () => {
  const [highestScores, setHighestScores] = useState([]);

  useEffect(() => {
    getHighestScores();
  }, []);

  const getHighestScores = async () => {
    try {
      const value = await AsyncStorage.getItem('highestScores');
      if (value !== null) {
        setHighestScores(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error retrieving highest scores: ', error);
    }
  };

  const resetScores = async () => {
    try {
      await AsyncStorage.removeItem('highestScores');
      setHighestScores([]);
      Alert.alert('Success', 'Scores reset successfully.');
    } catch (error) {
      console.error('Error resetting scores: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top 3 Scores</Text>
      {highestScores.map((score, index) => (
        <Text key={index} style={styles.score}>{index + 1}. {score}</Text>
      ))} 
      <Button title={<><Icon name="refresh" size={20} /> Reset </>} onPress={resetScores} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: '#4ac0fd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'ChalkboardSE-Regular' ,
    marginBottom: 10,
  },
  score: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Highscore;
