import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { primaryColor } from "../assets/color";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

function Details({ route }) {
  const { product } = route.params;
  const navigation = useNavigation();
  const [isCart, setIsCart] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const userId = auth().currentUser ? auth().currentUser.uid : null;

  const numberWithCommas = (number) => {
    return number.toLocaleString("vi-VN"); 
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartRef = firestore().collection('carts').doc(userId);
        const cartDoc = await cartRef.get();

        if (cartDoc.exists) {
          const cartData = cartDoc.data();
          let totalCount = 0;

          Object.values(cartData).forEach((item) => {
            totalCount += item.quantity || 0;
          });

          console.log('Tổng Số Lượng:', totalCount);

          setCartCount(totalCount);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
      }
    };

      if (userId) {
      fetchCartData();
    }
  }, [userId]);

  const addToCart = async () => {
    console.log("User: " + userId)
  console.log('Product ID:', product.id);
    try {
      const cartRef = firestore().collection('carts').doc(userId);
      const cartDoc = await cartRef.get();
  
      if (!cartDoc.exists) {
   
        cartRef.set({
          [product.id]: {
            name: product.productName,
            price: product.price,
            shop:product.nameShop,
            img: product.imageUrl150,
            quantity: 1,
            
          },
        });
      } else {
    
        const cartData = cartDoc.data();
  
        if (cartData[product.id]) {
          const newQuantity = cartData[product.id].quantity + 1;
        const newPrice = product.price * newQuantity;
                  cartRef.update({
          
            [`${product.id}.quantity`]: newQuantity,
            [`${product.id}.price`]: newPrice,
          });
        } else {

          cartRef.update({
            [product.id]: {
            name: product.productName,
            price: product.price,
            shop:product.nameShop,
            img: product.imageUrl150,
              quantity: 1,
              
            },
          });
        }
      }
  
      
      Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng.');
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại.');
    }
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.navigator}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>

        <View style={styles.cartAndMore}>
          <View style={styles.cartIconContainer}>
            {isCart && (
              <Text style={styles.cartBadge}>{cartCount}</Text>
            )}
            <TouchableOpacity
              style={styles.cartIcon}
              onPress={() => navigation.navigate("Cart")}
            >
              <Icon name="cart-outline" size={30} color="#fff" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.moreIcon}
            onPress={() => {
              
            }}
          >
            <Icon name="unfold-more-vertical" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.wrapAll}>
        <Image style={styles.backgroundImage} source={{ uri: product.imageUrl400 }} />

        <Text style={{ color: 'red', fontSize: 25 }}>{numberWithCommas(product.price)}/1kg</Text>
        <Text style={styles.name}>{product.productName}</Text>
        <View style={styles.wrap}>

          {/* rating */}
          <StarRatingDisplay
            style={styles.starRating}
            rating={product.rating}
            starSize={25}
          />
          <Text>Đã bán : {product.sold}</Text>
          
        </View>
        <View style={{marginTop:20}}>
            <Text style={{fontSize:18,color:'#000'}}>Mô tả sản phẩm</Text>
            <Text style={{fontSize:16, marginTop:5}}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.wrapBtn}>
        <TouchableOpacity style={styles.btnAddCart} onPress={addToCart}>
          <Icon name='plus' size={25} color='#fff' />
          <Text style={{ fontSize: 18, color: '#fff', marginRight: 20 }}>
            Thêm vào giỏ hàng
          </Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navigator: {
    backgroundColor:primaryColor,
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'relative',
    left: 20,
    backgroundColor: 'rgba(211,211,211,0.3)',
    borderRadius: 30,
    padding: 5,
  },
  cartAndMore: {
    flexDirection: 'row',
  },
  cartIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(211,211,211,0.5)',
    borderRadius: 30,
    padding: 5,
    marginRight: 10,
  },
  cartBadge: {
    position: 'relative',
    top: -15,
    left: 50,
    backgroundColor: 'red',
    fontSize: 14,
    color: '#fff',
    borderRadius: 14,
    marginRight: 5,
    paddingHorizontal: 7,
    zIndex: 1,
  },
  moreIcon: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(211,211,211,0.5)',
    borderRadius: 30,
    padding: 5,
    marginRight: 10,
  },
  wrapAll: {
    marginLeft: 10,
    marginRight: 10,
  },
  backgroundImage: {
    borderRadius:30,
    height: 400,
    width: 400,
  },
  starRating: {},
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
    color: '#000000',
    paddingTop: 10,
    paddingBottom: 10,
  },
  wrapBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnAddCart: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: primaryColor,
    padding: 20,
    justifyContent:'center',
  },
  btnBuy: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    padding: 20,
    justifyContent: 'space-between',
  },
});

export default Details;
