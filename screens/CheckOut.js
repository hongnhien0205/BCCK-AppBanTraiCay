import React, {useEffect, useId, useState} from "react";
import {View, StyleSheet,Text, TouchableOpacity, ScrollView,FlatList, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { ItemCheckOut } from "../components";
import { Divider } from "react-native-paper";
import { useMyContextController } from '../providers'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";

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
               <ScrollView >
                {}
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Icon name='location-on' size={30} color='#000'/>
                                    <Text style={styles.title}>Địa chỉ giao hàng</Text>
                                </View>
                            <TouchableOpacity style={{marginBottom:20}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingBottom:30,paddingTop:10}}>
                                    <View>
                                        <Text style={styles.txtAD}>{name} | {phoneNumber}</Text>
                                        <Text style={styles.txtAD}>{address}</Text>
                                    </View>
                                    <Icon style={{padding:10}}><Icon name='keyboard-arrow-right' size={30} color='#ccc'/></Icon>
                                </View>
                            <Divider/>
                            </TouchableOpacity>
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
                        <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                            <Icon name='note-alt' size={30} color='#000'/>
                            <Text style={{marginLeft:5,fontSize:16,fontWeight:'bold',color:'#000'}}>Chi tiết thanh toán</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:10,marginRight:10}}>
                            <Text>Tổng tiền hàng</Text>
                            <Text>đ{numberWithCommas(totalProductAmount)}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:10,marginRight:10}}>
                            <Text>Tổng phí vận chuyển</Text>
                            <Text>đ{numberWithCommas(totalShippingFee)}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:10,marginRight:10}}>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>Tổng thanh toán</Text>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>{numberWithCommas(total)}VND</Text>
                        </View>
                   </View>
                    
               </ScrollView>
               {/* button */}
               <View style={{height:70,borderTopWidth:1,borderColor:'#ccc',flexDirection:'row'}}>
                    <View style={{flex:1,justifyContent:'space-around',alignItems:'flex-end'}}>
                        <Text style={{fontSize:16,marginRight:10}}>Tổng thanh toán:</Text>
                        <Text style={{fontSize:20,marginRight:10,color:'red'}}>{numberWithCommas(total)}VND</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor:'#FF6600',paddingLeft:20,paddingRight:20,justifyContent:'center'}}
                    onPress={() => handleCheckout(cartData,userId)}
                    >
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
        }
    })
    export default CheckOut;