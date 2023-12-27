import React, {useEffect, useId, useState} from "react";
import {View, StyleSheet,Text, TouchableOpacity, ScrollView,FlatList, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { ItemCheckOut } from "../components";
import { Divider } from "react-native-paper";
import { useMyContextController } from '../providers'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { primaryColor } from "../assets/color";

    function CheckOut({route}) {

        const { cartData, checkedItems, totalAmount } = route.params;
        const [feeShip, setFeeShip] = useState(30000); 
        const [totalProductAmount, setTotalProductAmount] = useState(0);
        const [totalShippingFee, setTotalShippingFee] = useState(feeShip);
        const [total, setTotal] = useState(totalProductAmount + totalShippingFee);
        const navigation = useNavigation()
    
        const [{ userLogin }] = useMyContextController();
        const { email,name,phoneNumber,address,userId } = userLogin;
      
        useEffect(() => {
           
            const productAmount = cartData.reduce((acc, item) => acc + item.price , 0);
            setTotalProductAmount(productAmount);
    
            const total = productAmount + totalShippingFee;
            setTotal(total);
    
            console.log("Nhận dữ liệu trong CheckOut:", cartData, checkedItems, totalAmount);
        }, [cartData, checkedItems, totalAmount, totalShippingFee]);

        const handleCheckout = async (cartItems, userId) => {
            console.log(userId)
            try {
                
                const billRef = await firestore().collection('Bill').add({
                    items: cartItems,
                    timestamp: firestore.FieldValue.serverTimestamp(),
                  
                });
        
                const cartRef = firestore().collection('carts');
                await cartRef.doc(userId).delete();     
        
                console.log('Thanh toán thành công!');
                Alert.alert('Thông báo','Đơn hàng sẽ được vẫn chuyển tới bạn');
                navigation.navigate('Home');
            } catch (error) {
                console.error('Lỗi khi thanh toán:', error);
            }
        };
        
        
        const numberWithCommas = (number) => {
            return number.toLocaleString('vi-VN'); 
        };
        return (
          <View style={{flex:1,backgroundColor:'#fff'}}>
                
                                   
                            {/* product */}
                            <FlatList
                            data={cartData}
                            keyExtractor={(item, index) => (item && item.id ? item.id.toString() : index.toString())}
                            renderItem={({ item }) => (
                                <ItemCheckOut
                                    name={item.name}
                                    price={item.price}
                                    srcImg={item.img}
                                    cate={item.category}
                                    quantity={item.quantity}
                                />
                            )}
                            />
                           <Divider/>
                   {/* bill*/}
                   <View style={{justifyContent:'space-around',paddingTop:20,paddingBottom:20}}>
                        
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:10,marginRight:10}}>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>Tổng thanh toán</Text>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>{numberWithCommas(total)}VND</Text>
                        </View>
                   </View>
                   <View style={styles.wrapCheckOut}>
                        <TouchableOpacity style={{
                            flex:1,
                            backgroundColor:primaryColor,
                            marginLeft:10,
                            marginRight:10,
                            padding:10,justifyContent:'center',
                            alignItems:'center'
                        }}
                        onPress={() => handleCheckout(cartData, userId)}>
                            <Text style={{fontSize:20,color:'#fff'}}>Giao hàng ngay</Text>
                        </TouchableOpacity>
                  
                   </View>
          </View>
        );
    }

    const styles = StyleSheet.create({
        title:{
            fontSize:16,
            color:'#000',
            fontWeight:'bold'
        },
        txtAD:{
            marginLeft:30,
            fontSize:14,
            color:'#000',
        },
        wrapCheckOut: {
            flexDirection: "row",
            backgroundColor: "#fff",
            marginBottom:10
          },
    })
    export default CheckOut;