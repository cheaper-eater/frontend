import { useState } from "react";
import { Image, View, Text, TouchableOpacity, Alert, FlatList, StyleSheet, } from "react-native";
import { TextInput } from "react-native-web";
import { useTailwind } from "tailwind-rn";
 


const FoodTypes = () => {

    const [foodCategories, setFoodCategories] = useState([
        {key:"Asian" ,logo:"🍜"},
        {key:"Mexican",logo:"🌮"},
        {key:"Italian",logo:"🍝"},
        {key:"Fast Food",logo:"🍔"},
        {key:"Indian",logo:"🍛"},
        {key:"Dessert",logo:"🍰"},
        {key:"Pizza",logo:"🍕"},
        {key:"Healthy",logo:"🥦"},
        {key:"Thai",logo:"🍤"},
        {key:"Chicken",logo:"🍗"},
        {key:"Japanese",logo:"🍣"},
        {key:"Seafood",logo:"🐟"},
        {key:"Vietnamese",logo:"🍥"},
        {key:"Salads",logo:"🥗"},
        {key:"Bowls",logo:"🍚"},
        {key:"Mediterranean",logo:"🥙"},
        {key:"Steak",logo:"🥩"}
    ])
  const openCategory  = (item) => {
    console.log(item)
  }

  const tailwind = useTailwind();
  return (
    <View  style={tailwind("flex flex-1 sm:items-center"  ) }>
    <View
        style={tailwind(
          "flex flex-1 justify-between sm:justify-center sm:w-1/2 md:w-1/3 xl:w-1/5"
        )}
      > 
        {/* LOGO */}
        <Image 
            source={require("../assets/logos/logo.png")}
            style={{width:200,height:200,alignSelf:"center"}}

        />

        {/* SEARCH BAR */}
        <TextInput 
            placeholder="What are you craving today?"
            style={styles.searchBar}
            
        />



        {/* LIST OF CATEGORIES */}

        <View style={styles.container}>
            <Text style={{fontSize:24, fontWeight:"bold", margin:5, marginBottom:20}}>Categories</Text>
            <FlatList
               
                data={
                foodCategories
                }
                keyExtractor={item => item.key}
                renderItem={({item}) => 
                
                <TouchableOpacity 
                    style={styles.catContainer}
                    
                    onPress={() => openCategory(item.key)}    
                >
                    <Text style={styles.item}>{item.logo}  {item.key}</Text>
                </TouchableOpacity>
                }
            />
        </View>
    </View>
    </View>
  );
  
  
};
const styles = StyleSheet.create({
 
    container: {
      
      flex:1,
      paddingTop: 22,
      alignContent:"flex-start",
      justifyContent:"flex-start",
      paddingBottom:100,
      
    },
    item: {
      fontSize: 20,
    },
    catContainer:{
        padding: 15,
        paddingVertical:20,
        paddingLeft:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        elevation: 5,
        margin:5,
        flex:1,
        borderRadius:5,
        
    },

    //SEARCH 
    searchBar:{
        padding:15,
        paddingVertical:18,
        backgroundColor:"lightgray",
        marginTop:20,
        borderRadius:100,
        marginHorizontal:10,
        fontSize:15,
        color:"gray",
        
    }
  });


export default FoodTypes;