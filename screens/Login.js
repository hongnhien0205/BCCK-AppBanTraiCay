import React, { useState,useEffect } from "react";
import { View, StyleSheet, Image, Text,Alert  } from "react-native";
import {TextInput,Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { useMyContextController, login } from '../providers'
import { TouchableOpacity } from "react-native-gesture-handler";
import { primaryColor } from "../assets/color";

function Login() {
    const navigation = useNavigation();
    //state
    const [show, setShow] = useState(true)


    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    useEffect(() => {
        console.log("useEffect triggered");
        if (userLogin !== null)
        { navigation.navigate("Home")
    };
      }, [userLogin]);
    const handleLogin =(values)=>{
        const{email, password} = values
        login(dispatch,email,password);
    }
    return ( 
        <View style={styles.container}>

            <Image source={require('../assets/Tech.png')} style={styles.img}/>
            <Formik 
                 initialValues={{
                     email: "",
                    password: "",
                     }}
                     onSubmit={values => handleLogin(values)}
                >
            {({handleBlur,handleChange,handleSubmit,values,touched,errors}) =>(
            <View>
                <TextInput
                label="Email"
                placeholder="Enter your email address"
                value={values.email}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                style={styles.txtInput}
                left={<TextInput.Icon icon= 'email' />}
                />
                {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                
                <TextInput
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={styles.txtInput}
                secureTextEntry={show}
                right={<TextInput.Icon icon= 'eye' onPress={()=> setShow(!show)}/>}
                left={<TextInput.Icon icon= 'key' />}
                />
                {touched.password && errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

                <TouchableOpacity onPress={()=>{navigation.navigate('SendPass')}}>
                    <Text 
                    style={styles.txtLink}
                    >Quên mật khẩu?</Text>
                </TouchableOpacity>
    
                <Button mode="contained" style={styles.btn} onPress={handleSubmit}>
                    <Text style={styles.txtBtn}>Đăng nhập</Text>
                </Button>
    
                
    
                <View style={{alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                    <Text style={styles.txt}>
                        Chưa có tài khoản? 
                        
                    </Text>
                        <Button  onPress={()=>{Alert.alert('click')}}>
                            <Text style={styles.txtLink} onPress={()=>{navigation.navigate('Signup')}}>Đăng ký ngay</Text>
                        </Button>
                </View>
            </View>
              )}
              </Formik>
        </View>
     );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    img:{
        width:200,
        height:200,
        alignSelf:'center',
        marginBottom:20
    },
    title:{
        fontSize:25,
        fontWeight:'bold',
        color:'#000',
        marginLeft:10,
        marginBottom:20
    },
    txt:{
        fontSize:20,
        color:'#000',
    },
    txtInput:{
        marginLeft:10,
        marginRight:10,
        marginTop:10,
    },
    txtLink:{
        fontSize:20,
        color:'#27A2F0',
        alignSelf:'flex-end',
        marginRight:10,
        marginTop:10,
        marginBottom:30
    },
    btn:{
        borderRadius:0,
        borderWidth:1,
        backgroundColor:primaryColor,
        marginLeft:10,
        marginRight:10,
        marginBottom:20,
        paddingTop:5,
        paddingBottom:5
    },
    txtBtn:{
        fontSize:20,
        color:'#fff',
    },
    wrapBtn:{
        flexDirection:'row',
        justifyContent:'center',
    },
    btnSocial:{
        borderRadius:20,
        backgroundColor:'#fff',
        marginLeft:10,
        marginRight:10,
        marginBottom:20,
        paddingTop:15,
        paddingBottom:15
    },
   
    txtBtn:{
        fontSize:20,
        color:'#fff',
    },
   
})
export default Login;