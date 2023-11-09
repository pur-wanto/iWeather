import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { RootStackParamList } from '../../route'

const Detail: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Detail</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Detail