import React, { useRef, useState } from 'react';
import { Animated, Button, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BurjKhalifa, Makkah, MenaraBanten, TuguYogya } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../route';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ContentType = {
  content: any;
  type: string;
  finish: number;
};

const Story: React.FC = (props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [current, setCurrent] = useState<number>(0);
  const [content, setContent] = useState<ContentType[]>([
    {
      content: Makkah,
      type: 'image',
      finish: 0,
    },
    {
      content: BurjKhalifa,
      type: 'image',
      finish: 0,
    },
    {
      content: MenaraBanten,
      type: 'image',
      finish: 0,
    },
    {
      content: TuguYogya,
      type: 'image',
      finish: 0,
    },
  ]);
  const { height, width } = Dimensions.get('screen');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const start = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        next();
      }
    });
  };

  const next = () => {
    if (current !== content.length - 1) {
      let tempData = [...content];
      tempData[current].finish = 1;
      setContent(tempData);
      setCurrent(current + 1);
      fadeAnim.setValue(0);
    } else {
      close();
    }
  };

  const previous = () => {
    if (current - 1 >= 0) {
      let tempData = [...content];
      tempData[current].finish = 0;
      setContent(tempData);
      fadeAnim.setValue(0);
      setCurrent(current - 1);
    } else {
      close();
    }
  };

  const close = () => {
    fadeAnim.setValue(0);
    console.log('Close');
  };

  return (
    <View style={styles.page}>
      <Image
        style={{ height: height, width: width }}
        source={content[current].content}
        onLoadEnd={() => {
          fadeAnim.setValue(0);
          start();
        }}
      />
      <View style={{ width: width, position: 'absolute', top: 50, justifyContent: 'space-between', flexDirection: 'row' }}>
        {content.map((item, index) => {
          return (
            <View key={index} style={{ flex: 1, height: 3, backgroundColor: 'rgba(255,255,255,.5)', marginLeft: 5 }}>
              <Animated.View
                style={{
                  flex: current === index ? fadeAnim : content[index].finish,
                  height: 3,
                  backgroundColor: current === index ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.1)',
                  transform: [
                    { translateX: fadeAnim }
                  ]
                }}
              />
            </View>
          );
        })}
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 60, right: 0, padding: 20, zIndex: 1 }}>
        <Text style={{ color: 'white', fontSize: 24 }}>X</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={previous} style={{ position: 'absolute', top: 60, left: 0, padding: 20, zIndex: 1 }}>
        <Text style={{ color: 'white', fontSize: 18 }}>&le; Kembali</Text>
      </TouchableOpacity>

      {current !== 3 && (
        <View
          style={{
            width: width,
            height: height,
            position: 'absolute',
            top: 0,
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: '15%',
          }}
        >
          <TouchableOpacity
            style={{ width: '50%', height: '5%', position: 'absolute', bottom: 20 }}
            onPress={() => {
              console.log('Back', current);
              navigation.goBack();
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Lewati</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '50%', height: '5%', position: 'absolute', bottom: 20, right: 0 }}
            onPress={() => {
              console.log('Next', current);
              next();
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>Lanjut</Text>
          </TouchableOpacity>
        </View>
      )}

      {current === 3 && (
        <TouchableOpacity
          style={{ width: '50%', padding: 10, position: 'absolute', bottom: 20, borderWidth: 0.5, borderColor: 'aqua', borderRadius: 8 }}
          onPress={() => {
            console.log('Next', current);
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>BMI</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
