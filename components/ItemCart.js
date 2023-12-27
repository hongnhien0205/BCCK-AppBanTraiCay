import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firestore from "@react-native-firebase/firestore";

function ItemCart({
  namePro,
  nameShop,
  price,
  category,
  srcImg,
  isChecked,
  onToggleCheck,
  proquantity,
  onRemove,
  updateCartItem,
  productId,
}) {
  const [quantity, setQuantity] = useState(proquantity);
  const [totalPrice, setTotalPrice] = useState(price);

  const numberWithCommas = (number) => {
    if (number !== undefined && number !== null) {
      return number.toLocaleString("vi-VN");
    } else {
      return "N/A";
    }
  };

  // Trong component ItemCart
const updateQuantityAndPrice = (newQuantity) => {
  setQuantity(newQuantity);

  // Tính toán giá mới dựa trên số lượng mới
  const newPrice = newQuantity * price;
  setTotalPrice(newPrice);

  // Gọi hàm callback từ props để cập nhật giỏ hàng trong component cha
  updateCartItem(productId, newQuantity, newPrice);
};

  
  

  return (
    <View style={styles.container}>
      
      <View style={styles.wrapProduct}>
       
        <Image source={{ uri: srcImg }} style={styles.img} />
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <View style={{width:190}}>
            <Text style={styles.name}>{namePro}</Text>
            <Text style={styles.price}>{numberWithCommas(totalPrice)}</Text>
  
            <View style={styles.wrapBtn}>
              <TouchableOpacity
                style={styles.btnMP}
                onPress={() => {
                  if (quantity > 1) {
                    updateQuantityAndPrice(quantity - 1);
                  }
                }}
              >
                <Icon name="minus" size={25} color="#000" style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity
                style={styles.btnMP}
                onPress={() => {
                  updateQuantityAndPrice(quantity + 1);
                }}
              >
                <Icon name="plus" size={25} color="#000" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={onRemove} style={{}}>
            <Text style={{fontSize:20,color:'red',marginRight:30}}>Xóa</Text>
        </TouchableOpacity> 
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        marginTop:10,
        backgroundColor:'#fff'
    },
    wrapHeader:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
    },
    txtName:{
        fontSize:20,
        fontWeight:'bold',
        color:'#000',
        alignSelf:'center'
    },
    name:{
        fontSize:20,
        marginBottom:5,
        color:"#000",
    },
    price:{
        fontSize:20,
        marginBottom:5,
        color:'red',
    },
    cate:{
        marginBottom:5

    },
    quantity:{
        fontSize:20,
        color:"#000",
        marginLeft:5,
        marginRight:5
    },
    wrapProduct:{
        flexDirection:'row',
        height:160,
        alignItems:'center',
    },
    wrapBtn:{
        flexDirection:'row'
    },
    btnMP:{
        height:30,
        width:30,
        borderWidth:1,
        borderColor:'#ccc',
        alignSelf:'center'
    },
    icon:{
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    img: {
        width: 150,
        height: 150,
        borderRadius:30,
        resizeMode: 'cover',
        alignSelf:'center',
        marginRight:20,
        marginLeft:10
    },
})

export default ItemCart;