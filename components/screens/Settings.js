import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../controls/Button';
import Icon from 'react-native-vector-icons/FontAwesome';


const Settings = ({ navigation }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    navigation.navigate('Home', { selectedDifficulty: difficulty }); // Pass selected difficulty to Home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Difficulty</Text>
      <View style={styles.buttonContainer}> 
        <Button title={<><Icon name="smile-o" size={20} /> Easy </>} onPress={() => handleDifficultySelect('Easy')}/>
        <Button title={<><Icon name="meh-o" size={20} /> Medium </>} onPress={() => handleDifficultySelect('Medium')}/>
        <Button title={<><Icon name="frown-o" size={20} /> Difficult </>} onPress={() => handleDifficultySelect('Difficult')}/>
      </View>
      {selectedDifficulty && (
        <Text style={styles.selectedDifficulty}>Selected Difficulty: {selectedDifficulty}</Text>
      )}
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
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  selectedDifficulty: {
    fontSize: 16,
  },
});

export default Settings;
