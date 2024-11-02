import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Animated,
  } from "react-native";
  import React, { useRef } from 'react';
  import Svg, { Path, Text as SvgText } from 'react-native-svg';
  import { useState } from "react";
  import { Link, router } from "expo-router";
  import { LinearGradient } from 'expo-linear-gradient';
  import { useFonts } from 'expo-font';
  import * as SplashScreen from 'expo-splash-screen'
  import {signInWithEmailAndPassword} from '@firebase/auth'
  import { useEffect } from 'react';
  import { FIREBASE_AUTH } from "@/firebaseConfig";
  
  
  export default function Login() {
    
    const [loaded, error] = useFonts({
      'inter': require('../assets/fonts/Inter_18pt-Bold.ttf'),
      'interBold': require('../assets/fonts/Inter_18pt-ExtraBold.ttf'),
    });
    
    const auth = FIREBASE_AUTH;
  
    useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);
  
    if (!loaded && !error) { //createUserWIthPassWord
      return null;
    }
  
    const signIn = () =>
    {
      signInWithEmailAndPassword(auth, email, pass).then((dadosUsuario) => {
        console.log(dadosUsuario);
        router.push('/(tabs)')
      }).catch((err) => {
        alert(err.message)
      })
  
    }
  
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
  
  
    console.log(email, pass);
    console.log(typeof email, typeof pass);
  
  
    const onPress = () => {
      router.push("../(tabs)");
    };

    const toRegister = () => {
        router.push("./register");
      };
  
    const animatedValue = useRef(new Animated.Value(0)).current;
  
    // Animação para mover a onda
    useEffect(() => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        })
      ).start();
    }, []);
  
    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-200, 0], // Movimenta a onda horizontalmente
    });
  
    return (
  
      // <LinearGradient
      //     // Button Linear Gradient
      //     colors={['#daa3d1', '#905fd8']}
      //     style={styles.bg}>
      <>
  
  
      <View>

      <View style={styles.box} >
          <TextInput  placeholder='email'
           style={styles.input}
           onChangeText={setEmail}
           value={email}
           keyboardType="email-address"/>
          <TextInput
            onChangeText={setPass}
            value={pass}
            placeholder="Digite sua senha"
            keyboardType="numeric"
            secureTextEntry
            style={styles.input}/>
          <TouchableOpacity style={styles.btn} onPress={signIn}>
              <Text style={styles.txt}>Entrar</Text>
          </TouchableOpacity>
            <Text style={styles.link} onPress={toRegister}  >ou cadastre-se</Text>
      </View>

        
      </View>
      </>
      // </LinearGradient>
    );
  }
  
  const styles = StyleSheet.create({
  
    mainContainer:
    {
      display: "flex",
      top: 0,
      margin: 0,
      padding: 0,
      height: "100%",
      backgroundColor: '#FFFFFFFF',
    },
  
    container: {
  
      margin: 0,
      padding: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFFFF',
      flexDirection: "column",
      marginBottom: 10
  
    },
    container2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  
      bottom: 0,
      position: "absolute",
      width:"100%",
    },
    content: {
     top:0,
      maxHeight: 100
    },
    input: {
      borderBottomWidth: 1, // Adiciona uma linha na parte inferior
      borderBottomColor: "#AB88DEFF", // Cor da linha
      backgroundColor: "transparent", // Fundo transparente
      height: 40, // Altura do input
      marginVertical: 10, // Margem vertical para espaçamento
      padding: 5, // Padding interno
    },
    local: {
      top: 0
    },
    link:
    {
        margin: 5,

    },
  
    boasVindas:
    {
      textAlign: "center",
      fontFamily: "inter"
      //color: "#ffffff
    },
  
    txt:
    {
      color: "#ffff",
      textAlign: "center"
    },
    bg:
    {
      flex: 1
    },
    box: {
      backgroundColor: "#ffffff",
      display:'flex',
      justifyContent: "center",
      alignItems: 'center',
      margin: 10,
      borderRadius: 10,
      padding: 10
    },
    btn: {
      backgroundColor: "#5B29A7FF",
      padding: 10,
      borderRadius: 30,
      marginTop: 50,
      minWidth: "auto",
      width: 250,
      alignSelf: "center"
    },
    createAccount:
    {
      margin: 15,
      alignSelf: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#AB88DEFF"
    },
    bold:
    {
      textAlign: "center",
      fontFamily: "interBold",
    },
    waveContainer: {
  
      top: -50, // Ajusta a posição da onda
      left: 0,
      width: 600,
      height: 100,
    },

  });
  
