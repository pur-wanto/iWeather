import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { clear, clouds, drizzle, haze, mist, rain, snow, thunderstorm } from '../../assets'
import { RootStackParamList } from '../../route'
import Loading from '../../components/Loading'
import Geolocation from '@react-native-community/geolocation';

interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

type Coords = {
  latitude: number;
  longitude: number;
}

const Home: React.FC = () => {
  const navigation = useNavigation<RootStackParamList>();
  const [data, setData] = useState<{}>({});
  const [dataWeather, setDataWeather] = useState<Weather[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setLat(info.coords.latitude);
      setLong(info.coords.longitude);
      console.log(info)
    });

    inHere()
  }, [])

  function inHere() {
    const appId = '5c24d2901dd0200a3c2c7013aef23811'
    try {
      axios.get(`https://api.openweathermap.org/data/3.0/onecall?appid=${appId}=${lat}&lon=${long}`)
        .then(res => {
          console.log("Response", res)
        })
    } catch (error) {
      console.log("Error", error)
    }
  }

  const getDataWeather = async (search: string) => {
    const appId = '5c24d2901dd0200a3c2c7013aef23811'
    setLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?country=id&q=${search}&appid=${appId}`)
        .then(res => {
          setLoading(false);
          setData(res.data)

          const weather = res.data.weather
          setDataWeather(weather)
          console.log("Response", weather)
        })
    } catch (error) {
      setLoading(false);
      setError(true)
      console.log("Error", error)
    }
  }

  const weatherText =
    dataWeather?.[0]?.main == 'Clear' ? <Text style={styles.textWeather}>Bersih</Text> :
      dataWeather?.[0]?.main == 'Clouds' ? <Text style={styles.textWeather}>Berawan</Text> :
        dataWeather?.[0]?.main == 'Drizzle' ? <Text style={styles.textWeather}>Bersih</Text> :
          dataWeather?.[0]?.main == 'Haze' || dataWeather?.[0]?.main == 'Mist' || dataWeather?.[0]?.main == 'Smoke' ? <Text style={styles.textWeather}>Kabut</Text> :
            dataWeather?.[0]?.main == 'Rain' ? <Text style={styles.textWeather}>Hujan</Text> :
              dataWeather?.[0]?.main == 'Snow' ? <Text style={styles.textWeather}>Salju</Text> : <Text style={styles.textWeather}>Petir</Text>


  const weatherImage =
    <ImageBackground source={
      dataWeather?.[0]?.main == 'Clear' ? clear :
        dataWeather?.[0]?.main == 'Clouds' ? clouds :
          dataWeather?.[0]?.main == 'Drizzle' ? drizzle :
            dataWeather?.[0]?.main == 'Haze' ? haze :
              dataWeather?.[0]?.main == 'Mist' || dataWeather?.[0]?.main == 'Smoke' ? mist :
                dataWeather?.[0]?.main == 'Rain' ? rain :
                  dataWeather?.[0]?.main == 'Snow' ? snow :
                    thunderstorm
    }
      style={{ height: '95%', width: '100%' }}
    >
      <View style={{ height: '80%', alignItems: 'center', justifyContent: 'center' }}>
        {weatherText}
      </View>
    </ImageBackground>

  if (error) {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <TouchableOpacity onPress={() => setError(false)}>
          <Text>Datanya belum ada....</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#61A3BA' }}>
      <View style={{ flexDirection: 'row', marginHorizontal: '5%', justifyContent: 'space-between', marginVertical: 10 }}>
        <TextInput
          onChangeText={(search) => setSearch(search)}
          placeholder='Input your location'
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={() => getDataWeather(search)}
          style={styles.button}
        >
          <Text>Cari</Text>
        </TouchableOpacity>
      </View>
      {weatherImage}
      {loading &&
        <View style={styles.loading}>
          <Loading />
        </View>
      }
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 8,
    width: '80%'
  },
  button: {
    borderRadius: 8,
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textWeather: { fontSize: 24, color: 'aqua' },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C4DFDF',
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
});
