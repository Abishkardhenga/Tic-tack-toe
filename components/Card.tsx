import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { circle, close, draw } from "../constants/icon";



    type nameType = {
        name:string
    }

const Card = ({ name }:nameType) => {
  let imageSource;

  switch (name) {
    case "Empty":
      imageSource = draw;
      break;
    case "Cross":
      imageSource = close;
      break;
    case "Circle":
      imageSource = circle;
      break;
    default:
      return null; 
  }

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  image: {
    width: 60,
    height: 60,
  },
});

export default Card;
