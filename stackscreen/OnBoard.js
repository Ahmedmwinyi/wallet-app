import { View, Text, Image, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppTheme, { COLORS, SIZE } from '../constants/theme'
import Button from './Button'
import { LinearGradient } from 'expo-linear-gradient'

export default function OnBoard({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary}}>
      <View>
        <Image 
          source={require("../assets/images/wale3.png")}
          style={{
            height: 100,
            width: 100,
            borderRadius: 20,
            position: 'absolute',
            transform: [
              { translateX: 20 },
              { translateY: 50 },
              { rotate: "-15deg" }
            ]
          }}
        />
        <Image
          source={require("../assets/images/coin2.jpg")}
          style={{
            height: 100,
            width: 100,
            borderRadius: 20,
            position: 'absolute',
            top: -30,
            left: 100,
            transform: [
              { translateX: 50 },
              { translateY: 50 },
              { rotate: "-15deg" }
            ]
          }}
        />
        <Image
          source={require("../assets/images/wale4.jpeg")}
          style={{
            height: 100,
            width: 100,
            borderRadius: 20,
            position: 'absolute',
            top: 140,
            left: -50,
            transform: [
              { translateX: 70 },
              { translateY: 50 },
              { rotate: "15deg" }
            ]
          }}
        />

        <Image
          source={require("../assets/images/coins.jpg")}
          style={{
            height: 200,
            width: 200,
            borderRadius: 20,
            position: 'absolute',
            top: 110,
            left: 100,
            transform: [
              { translateX: 50 },
              { translateY: 50 },
              { rotate: "-15deg" }
            ]
          }}
        />

        <View style={{ paddingHorizontal: 22, position: 'absolute', top: 400, width: "100%" }}>
          <Text style={{ fontSize: SIZE.largeTitle, fontWeight: 800, color: COLORS.white, }}>Get Started</Text>
          <View style={{ marginVertical: 22 }}>
            <Text style={{ fontSize: SIZE.h3, color: COLORS.white, marginVertical: 4 }}>Connect with each other easily</Text>
            <Text style={{ fontSize: SIZE.h3, color: COLORS.white }}>Transact, and Scan to pay wisely</Text>
          </View>

          <Button
            title="Join Now"
            onPress={() => navigation.navigate("SignUp")}
            style={{ marginTop: 22, width: "100%" }}
          />

          <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, color: COLORS.white, }}>Already have an account ?</Text>
            <Pressable onPress={() => navigation.navigate("LogIn")}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 4, color: COLORS.white, }}>Login</Text>
            </Pressable>
          </View>
        </View>

      </View>
    </SafeAreaView>
  )
}