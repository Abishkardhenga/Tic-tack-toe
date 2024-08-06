import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Card = ({item}) => {
  return (
    <View>
<Image src={item.image}/>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({})