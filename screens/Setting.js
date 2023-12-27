import React from "react";
import {View, StyleSheet,Image,Text, TouchableOpacity,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { primaryColor } from "../assets/color";
import { Divider } from "react-native-paper";
import { firebase } from '@react-native-firebase/auth'
import { useNavigation } from "@react-navigation/native";
import { useMyContextController } from '../providers'
import auth from "@react-native-firebase/auth";

function Setting() {
    const [{ userLogin }] = useMyContextController();
    const { email,name,phoneNumber,address } = userLogin;
    const navigation = useNavigation()


    if (!userLogin) {
        return <Text>Người dùng chưa đăng nhập</Text>;
      }
      const handleLogout = async () => {
        try {
         
          const currentUser = auth().currentUser;
          if (currentUser) {
            await auth().signOut();
          
            navigation.navigate('Login');
          } else {
            console.warn('Không có người dùng đang đăng nhập.');
          }
        } catch (error) {
          console.error('Đăng xuất thất bại:', error.message);
        }
      };
    return ( 
        <View style={{flex:1,backgroundColor:'#fff'}}>
            {/* image */}
            <View style={{ alignItems:'center',height:200}}>
                <Image source={require('../assets/category/user.png')} style={{height:100,width:100,tintColor:'#000'}}/>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>{email}</Text>
                    <TouchableOpacity 
                    style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10}}
                    onPress={handleLogout}>
                        <TouchableOpacity style={{
                          flexDirection:'row',alignItems:'center',backgroundColor:primaryColor,
                          flex:1,marginLeft:10,marginRight:10,padding:5,borderRadius:10,justifyContent:'center'}}>
                            <Text style={{marginLeft:10,fontSize:20,color:'#fff'}}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    
            </View>
            {/* dif */}
          
        </View>
     );
}

export default Setting;