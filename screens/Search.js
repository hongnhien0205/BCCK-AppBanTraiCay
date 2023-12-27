
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation()
  useEffect(() => {
    const searchProducts = async () => {
      try {
        const productsRef = firestore().collection('products');
        const snapshot = await productsRef
          .where('productName', '>=', searchQuery)
          .get();
  
        const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching products:', error);
      }
    };
  
    searchProducts();
  }, [searchQuery]);
  
  
  

  const handleSearch = async () => {
    // Gọi hàm searchProducts khi người dùng bấm nút tìm kiếm
    await searchProducts();
    navigation.navigate('SearchResult', { searchQuery });
    console.log(searchQuery);
  };
  

  const SearchResultItem = ({ item }) => (
    <TouchableOpacity
      style={{ height: 50, justifyContent: 'center', paddingLeft: 20 }}
      onPress={() => {
        console.log('Selected:', item.category);
        navigation.navigate('SearchResult',{productName:item.productName,price:item.price,imageUrl150:item.imageUrl150})
        // navigation.navigate('Categories', { cate: item.category });
      }}
    >
      <View>
        <Text style={{ fontSize: 16, color: '#000' }}>{item.productName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10, marginTop: 10, marginLeft: 10 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc' }}
          placeholder="Search for products"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity onPress={()=>{handleSearch
          }
        }>
          <Image source={require('../assets/searchicon.png')} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SearchResultItem item={item} />}
      />
    </View>
  );
};

export default Search;
