import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#4CAF50', // Green color
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      minWidth: 120, // Minimum width
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10, // Add margin between buttons
      // Gradient background
      background: 'linear-gradient(45deg, #7AE582, #3D8E5F)',
      // Shadow for 3D effect
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 5,
    },
    buttonText: {
      color: '#0D5E0D',  
      fontSize: 17,
      fontFamily: 'ChalkboardSE-Regular',  
      fontWeight: 'bold',  
    },
  });
  
  

export default Button;
