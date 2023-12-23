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
      const { email,name,phoneNumber,address } = userLogin;
    return ( 
        <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
            {/* image */}
            <View style={{flexDirection:'row', alignItems:'center',height:200,backgroundColor:primaryColor}}>
                <Image source={require('../assets/user.png')} style={{height:100,width:100,tintColor:'#fff'}}/>
                <View style={{width:300}}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{email}</Text>
                   
                </View>
            </View>
            {/* dif */}
            <View>
                {/* history */}
               <View>

                <Text style={{fontSize:20,fontWeight:'bold', color:'#000'}}>Thông tin của bạn</Text>
                <View >
                  <Text style={{fontSize:16,marginTop:20,marginLeft:10}}>Họ và tên: {name}</Text>
                  <Divider/>
                  <Text style={{fontSize:16,marginTop:20,marginLeft:10}}>Số điện thoại: {phoneNumber}</Text>
                  <Divider/>
                  <Text style={{fontSize:16,marginTop:20,marginLeft:10}}>Email: {email}</Text>
                  <Divider/>
                  <Text style={{fontSize:16,marginTop:20,marginLeft:10}}>Địa chỉ: {address}</Text>
                  <Divider/>
                </View>
                    {/* LOG OUT */}
                    <TouchableOpacity 
                    style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10}}
                    onPress={handleLogout}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name='arrow-circle-left' size={25} color={primaryColor}/>
                            <Text style={{marginLeft:10,fontSize:16}}>Đăng xuất</Text>
                        </View>
                    </TouchableOpacity>
                    <Divider/>
                    
                </View>
            </View>
        </ScrollView>
     );
}

export default Setting;