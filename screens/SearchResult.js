import React from "react";
import { View } from "react-native";
import { ProductComp } from "../components";
function SearchResult({route}) {
    const {productName,price,imageUrl150} = route.params ;
    return ( 
        <View>
            <ProductComp name={productName} price={price} srcImg={imageUrl150}/>
        </View>
     );
}

export default SearchResult;