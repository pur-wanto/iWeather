import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <View style={styles.page}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})