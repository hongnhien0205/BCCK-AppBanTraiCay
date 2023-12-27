import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import {TextInput,Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Formik } from 'formik';
import * as Yup from 'yup'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { primaryColor } from "../assets/color";
import { TouchableOpacity } from "react-native-gesture-handler";
function Signup() {
    const [show, setShow] = useState(true)
    const navigation = useNavigation()
    //signup
    const handleSignUp = async values => {
        const { email, password } = values;
      
        try {
          
          const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      
          const userId = userCredential.user.uid;
      
          await firestore().collection('users').doc(email).set({
            email: email,
            userId: userId,
          
          });
      
          
          navigation.navigate('Login');
        } catch (error) {
          console.error('Error signing up:', error);
          Alert.alert('Thông báo',error)
        }
      };    
    
     const validateSchema = Yup.object().shape({
        email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số, và 1 ký tự đặc biệt').required('Vui lòng nhập mật khẩu'),
        confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Vui lòng nhập lại mật khẩu'),
    })
    return ( 
        <View style={styles.container}>

            <Image source={{uri: 'https://nhainonline.vn/wp-content/uploads/2023/03/goi-y-nhung-logo-hoa-qua-sach.png'}} style={styles.img}/>
            <Text style={styles.title}>Create new account</Text>

        <Formik 
            initialValues={{
            email : '',
            password : '',
            confirmpassword : ''
            }}
            onSubmit={values => handleSignUp(values)}
            validationSchema={validateSchema}
            >
            {({handleBlur,handleChange,handleSubmit,values,touched,errors}) =>(
            <View>
                <TextInput
                label="Email"
                placeholder="Enter your email address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={styles.txtInput}
                />
                    {touched.email && errors.email && <Text style={{ color: 'red',marginLeft:15 }}>{errors.email}</Text>}

                
                <TextInput
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={styles.txtInput}
                secureTextEntry={show}
                right={<TextInput.Icon icon= 'eye' onPress={()=> setShow(!show)}/>}
                />
                    {touched.password && errors.password && <Text style={{ color: 'red',marginLeft:15 }}>{errors.password}</Text>}

    
                <TextInput
                label="Confirm Password"
                placeholder="Enter your confirm password"
                value={values.confirmpassword}
                onChangeText={handleChange('confirmpassword')}
                onBlur={handleBlur('confirmpassword')}
                style={styles.txtInput}
                secureTextEntry={show}
                right={<TextInput.Icon icon= 'eye' onPress={()=> setShow(!show)}/>}
                />
                {touched.confirmpassword && errors.confirmpassword && <Text style={{ color: 'red',marginLeft:15 }}>{errors.confirmpassword}</Text>}

            
    
                <Button mode="contained" style={styles.btn} onPress={handleSubmit}>
                    <Text style={styles.txtBtn}>Đăng ký</Text>
                </Button>
    
                
    
                <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{navigation.navigate('Login')}}>
                    <Text style={styles.txt}>
                       Already have account? <Text style={styles.txtLink}>Sign in</Text>
                    </Text>
                </TouchableOpacity>
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
        textAlign:'center',
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
export default Signup;