import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { ItemCart } from "../components";
import { primaryColor } from "../assets/color";

function Cart() {
  const navigation = useNavigation();
  const [cartData, setCartData] = useState([]);

  const loadCartData = async () => {
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;
      const cartRef = firestore().collection("carts").doc(userId);

      try {
        const cartSnapshot = await cartRef.get();
        if (cartSnapshot.exists) {
          const cartData = cartSnapshot.data();
          const cartItems = Object.entries(cartData).map(([productId, productData]) => {
            return {
              id: productId,
              ...productData,
            };
          });
          setCartData(cartItems);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  };

  useEffect(() => {
    loadCartData();
  }, []);

  const calculateTotalAmount = () => {
    // Tính tổng tiền từ các sản phẩm trong giỏ hàng
    const totalAmount = cartData.reduce((total, product) => {
      return total + product.price;
    }, 0);

    return totalAmount;
  };

  // xoa sp khoi gio hang
  const removeItem = async (productId) => {
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;
      const cartRef = firestore().collection("carts").doc(userId);

      try {
        // Lấy dữ liệu giỏ hàng hiện tại
        const cartSnapshot = await cartRef.get();
        if (cartSnapshot.exists) {
          const currentCartData = cartSnapshot.data();

          // Xóa sản phẩm được chọn khỏi giỏ hàng
          delete currentCartData[productId];

          // Cập nhật giỏ hàng trên Firestore
          await cartRef.set(currentCartData);

          // Tải lại dữ liệu giỏ hàng
          loadCartData();
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
      }
    }
  };

  // cap nhat gio han
  const updateCartItem = async (productId, newQuantity, newPrice) => {
    const user = auth().currentUser;

    if (user) {
      const userId = user.uid;
      const cartRef = firestore().collection("carts").doc(userId);

      try {
        const cartSnapshot = await cartRef.get();

        if (cartSnapshot.exists) {
          const currentCartData = cartSnapshot.data();

          if (currentCartData[productId]) {
            currentCartData[productId].quantity = newQuantity;
            currentCartData[productId].price = newPrice;
          }

          await cartRef.set(currentCartData);

          loadCartData();
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm trong giỏ hàng:", error);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(211,211,211,0.2)" }}>
      {cartData.length > 0 ? (
        <>
          <FlatList
            data={cartData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <ItemCart
                key={index}
                productId={item.id}
                namePro={item.name}
                nameShop={item.shop}
                category={item.category}
                price={item.price}
                proquantity={item.quantity}
                srcImg={item.img}
                onRemove={() => removeItem(item.id)}
                updateCartItem={updateCartItem}
              />
            )}
          />
          <View style={styles.wrapCheckOut}>
           
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: primaryColor,
                marginLeft: 10,
                marginRight: 10,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("CheckOut", { cartData })}
            >
              <Text style={{ fontSize: 20, color: "#fff" }}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{textAlign:'center',fontSize:20}}>Chưa có sản phẩm trong giỏ</Text></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  wraptxt: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  wrapBtn: {
    backgroundColor: "red",
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
  },
  wrapCheckOut: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});

export default Cart;
