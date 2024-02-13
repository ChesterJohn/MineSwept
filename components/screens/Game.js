import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../controls/Button';
import Icon from 'react-native-vector-icons/FontAwesome';


const { width } = Dimensions.get('window');

const Game = ({ route }) => {
  const { selectedDifficulty } = route.params; 

  // difficulty settings
  const difficultySettings = {
    Easy: { gridSize: 2, bombCount: 1, baseScore: 0, extraPoints: 10 },
    Medium: { gridSize: 4, bombCount: 4, baseScore: 0, extraPoints: 25 },
    Difficult: { gridSize: 5, bombCount: 10, baseScore: 0, extraPoints: 50 },
  };

  const { gridSize, bombCount, baseScore, extraPoints } = difficultySettings[selectedDifficulty];

  // variables
  const [grid, setGrid] = useState(Array(gridSize).fill(Array(gridSize).fill(false)));
  const [bombLocations, setBombLocations] = useState([]);
  const [time, setTime] = useState(0);
  const [cellsRemaining, setCellsRemaining] = useState(gridSize * gridSize - bombCount);
  const [score, setScore] = useState(baseScore);

  // place bombs based on difficulty
  const placeBombs = () => {
    const bombLocations = [];
    while (bombLocations.length < bombCount) {
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * gridSize);
      if (!bombLocations.some(loc => loc.x === x && loc.y === y)) {
        bombLocations.push({ x, y });
      }
    }
    setBombLocations(bombLocations);
  };

  
  const handlePress = (x, y) => {
    if (bombLocations.some(loc => loc.x === x && loc.y === y)) {
      Alert.alert('Game Over', 'You tapped on the bomb! Try again.', [{ text: 'OK', onPress: resetGame }]);
    } else {
      const newGrid = grid.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          if (rowIndex === x && colIndex === y) {
            if (!cell) {
              setCellsRemaining(prevCells => prevCells - 1);
              setScore(prevScore => prevScore + extraPoints); // Add extra points based on difficulty
            }
            return true;
          }
          return cell;
        });
      });
      setGrid(newGrid);
    }
  };

  // resets the game
  const resetGame = () => {
    setGrid(Array(gridSize).fill(Array(gridSize).fill(false)));
    placeBombs();
    setTime(0);
    setCellsRemaining(gridSize * gridSize - bombCount);
    setScore(baseScore);
  };

  // resetGame during initialization
  useEffect(() => {
    resetGame();
  }, []);

  // update time and deduct score
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prevTime => prevTime + 1);
      setScore(prevScore => {
        if (prevScore > 0) {
          return prevScore - 1; // Deduct a point for every second elapsed
        }
        return prevScore;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // the game is won when theres no cells remaining and bombs are not tapped
  useEffect(() => {
    if (cellsRemaining === 0) {
      endGame(true);
      Alert.alert('Congratulations!', `You won the game with a score of ${score}!`, [{ text: 'OK', onPress: resetGame }]);
    }
  }, [cellsRemaining]);

  // end the game
  const endGame = async (keepScore) => {
    if (!keepScore) {
      setScore(0);
    } 
    if (cellsRemaining != 0 && keepScore) {
        Alert.alert('Chicken!', `You ended the game with a score of ${score}!`, [{ text: 'OK', onPress: resetGame }]);
    } 
    updateHighestScore(score);
    resetGame();
  };

  // update high scores
  const updateHighestScore = async (currentScore) => {
    try {
      const value = await AsyncStorage.getItem('highestScores');
      let scores = [];
      if (value !== null) {
        scores = JSON.parse(value);
      }
      scores.push(currentScore);
      scores.sort((a, b) => b - a);
      scores = scores.slice(0, 3);
      await AsyncStorage.setItem('highestScores', JSON.stringify(scores));
    } catch (error) {
      console.error('Error updating highest scores: ', error);
    }
  };

  // render the grid
  const renderGrid = () => {
    const cellSize = width / gridSize;
    return grid.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => (
          <TouchableOpacity
            key={colIndex}
            style={[styles.cell, { 
                margin: 5,
                width: cellSize,
                height: cellSize, 
                backgroundColor: cell ? '#d7b899' : '#a6d948' }]}
            onPress={() => handlePress(rowIndex, colIndex)}
            disabled={cell}
          >
            {cell && bombLocations.find(loc => loc.x === rowIndex && loc.y === colIndex) ? (
              <Text style={styles.bombText}>💣</Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap on the grid to avoid the bombs!</Text>
      <Text style={styles.timer}>Time: {time} seconds</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <View style={styles.grid}>{renderGrid()}</View> 
      <View style={styles.buttonContainer}>
        <Button title={<><Icon name="refresh" size={20} /> Restart </>} onPress={resetGame} />
        <Button title={<><Icon name="hand-stop-o" size={20} /> Give Up</>} onPress={() => endGame(true)} />
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'ChalkboardSE-Regular' ,
    marginBottom: 10,
  },
  timer: {
    fontSize: 16,
    marginBottom: 5,
  },
  score: {
    fontSize: 16,
    marginBottom: 10,
  },
  grid: {
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center', 
    backgroundColor: '#8ecc3a',
    margin: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8ecc3a',
  },
  bombText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,  
    marginTop: 10,  
  },
  
});

export default Game;
