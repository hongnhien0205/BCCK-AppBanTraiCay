import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Text, Modal, TouchableWithoutFeedback } from "react-native";
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProductComp } from "../components";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { primaryColor } from "../assets/color";

function Home() {
  const [selectedTab, setSelectedTab] = useState('all');
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleTabPress = tab => {
    setSelectedTab(tab);
  };

  const numberWithCommas = (number) => {
    return number.toLocaleString('vi-VN');
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesSnapshot = await firestore().collection("categories").get();
        const categoriesData = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategoriesData(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = () => {
      const unsubscribe = firestore().collection("products").onSnapshot((snapshot) => {
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      });

      return () => unsubscribe();
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeAndNavigate = (categoryName) => {
    navigation.navigate('Categories', {cate:categoryName})
    toggleModal();
  };

  const getProductsByTab = () => {
    if (selectedTab === 'all') {
      return products;
    }

    const selectedCategory = categoriesData.find(category => category.categoryName === selectedTab);

    if (selectedCategory) {
      return products.filter(product => selectedCategory.products.includes(product.id));
    }

    return [];
  };

  const productsToShow = getProductsByTab();

  const fil = [
    {
      id: 1, name: "MuaXuan", title: 'Trái cây mùa xuân'
    },
    {
      id: 2, name: "MuaHe", title: 'Trái cây mùa hè'
    },
    {
      id: 3, name: "MuaThu", title: 'Trái cây mùa thu'
    },
    {
      id: 4, name: "MuaDong", title: 'Trái cây mùa đông'
    }
  ];

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.wrapHeader}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity>
            <Icon name='bell-outline' size={30} color='white' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Setting') }}>
            <Image source={require('../assets/user.png')} style={{ tintColor: 'white', height: 40, width: 40, marginRight: 10, marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.txtInputHeader} onPress={() => { navigation.navigate('Search') }}>
            <Image source={require('../assets/searchicon.png')} style={{ height: 25, width: 25, marginLeft: 5, tintColor: 'white' }} />
          </TouchableOpacity>
          <Button mode="contained" style={styles.btnIcon} onPress={() => navigation.navigate('Cart')} >
            <Icon name='cart-outline' size={23} color='#fff' />
          </Button>
        </View>
      </View>
      <ScrollView>
        {/* filter */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
          <TouchableOpacity onPress={() => handleTabPress('all')}>
            <Text style={{ fontSize: 16, color: selectedTab === 'all' ? primaryColor : '#000', borderBottomColor: selectedTab === 'all' ? primaryColor : 'transparent', borderBottomWidth: selectedTab === 'all' ? 1 : 0 }}>Tất cả</Text>
          </TouchableOpacity>
          {categoriesData.map(category => (
            <TouchableOpacity key={category.id} onPress={() => handleTabPress(category.categoryName)}>
              <Text style={{ fontSize: 16, color: selectedTab === category.categoryName ? primaryColor : '#000', borderBottomColor: selectedTab === category.categoryName ? primaryColor : 'transparent', borderBottomWidth: selectedTab === category.categoryName ? 1 : 0 }}>{category.categoryName}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={toggleModal}>
            <Icon name='filter-menu' size={25} color={primaryColor} />
          </TouchableOpacity>
        </View>
        {/* load product */}
        <View style={styles.wrap}>
          {productsToShow.map(product => (
            <ProductComp
              key={product.id}
              name={product.productName}
              price={numberWithCommas(product.price)}
              sold={product.sold}
              srcImg={product.imageUrl150}
              onClick={() => (navigation.navigate('Details', { product }))}
            />
          ))}
        </View>
      </ScrollView>
      {/* Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {fil.map(category => (
                <TouchableOpacity key={category.id} onPress={() => closeAndNavigate(category.name)}>
                  <Text style={styles.modalText}>{category.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  wrapHeader: {
    backgroundColor: primaryColor,
    width: '100%',
    height: '15%',
    paddingTop: 10,
    paddingBottom: 10
  },
  txtInputHeader: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5
  },
  btnIcon: {
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  wrap: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Home;
