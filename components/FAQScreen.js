import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FAQScreen = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>FAQ's</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={[styles.boxContainer, { width: windowWidth - 40 }]}>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.boxText}>Question:{"\n"}How to pay the challan?</Text>
        </TouchableOpacity>
      </View>

    <View style={[styles.boxContainer, { width: windowWidth - 40 }]}>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.boxText}>Question:{"\n"}How to pay the challan?</Text>
        </TouchableOpacity>
      </View>
     <View style={[styles.boxContainer, { width: windowWidth - 40 }]}>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.boxText}>Question:{"\n"}How to pay the challan?</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.boxContainer, { width: windowWidth - 40 }]}>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.boxText}>Question:{"\n"}How to pay the challan?</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.boxContainer, { width: windowWidth - 40 }]}>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.boxText}>Question:{"\n"}How to pay the challan?</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(10,76,118,1)',
    height: 80,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
   fontFamily: "poppins-bold",
    color: "white"
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginHorizontal: 20,
  },
  box: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(24,154,180,1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginVertical: 3,
    marginHorizontal: 5,
  },
  boxText: {
    fontSize: 18,
   fontFamily: "poppins-regular",
    marginBottom: 5,
    color: "white"
  },
});

export default FAQScreen;
