import { React, useState } from "react";
import {
  Text,
  View,
  Modal,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ModalsLang = ({
  langmodalvisible,
  setlangmodalvisible,
  onSelectlang,
}) => {
  const [selectedlang, setselectedlang] = useState(0);
  const [language, setlanguage] = useState([
    { name: "English", selected: true },
    { name: "Urdu", selected: false },
  ]);
  const onSelect = (index) => {
    const temp = language;
    temp.map((item, ind) => {
      if (index == ind) {
        if (item.selected == true) {
          item.selected = false;
        } else {
          item.selected = true;
          setselectedlang(index);
        }
      } else {
        item.selected = false;
      }
    });
    let temp2 = [];
    temp.map((item) => {
      temp2.push(item);
    });
    setlanguage(temp2);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={langmodalvisible}
      onRequestClose={() => {
        setlangmodalvisible(!langmodalvisible);
      }}
    >
      <View style={styles.centerview}>
        <View style={styles.modalview}>
          <Text style={styles.title}>Select Language</Text>
          <View style={{ width: "100%" }}>
            <FlatList
              data={language}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.lang_item,
                      {
                        borderColor: item.selected == true ? "blue" : "black",
                        backgroundColor:
                          item.selected == true ? "lightgrey" : "white",
                      },
                    ]}
                    onPress={() => {
                      onSelect(index);
                    }}
                  >
                    {item.selected == true ? (
                      <Image
                        style={[styles.select_icon, { tintColor: "blue" }]}
                        source={require("../assets/images/select.png")}
                      />
                    ) : (
                      <Image
                        style={styles.select_icon}
                        source={require("../assets/images/unselect.png")}
                      />
                    )}
                    <Text
                      style={{
                        marginLeft: 20,
                        fontSize: 18,
                        color: item.selected == true ? "blue" : "black",
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              style={{
                width: "40%",
                height: 50,
                borderWidth: 0.5,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setlangmodalvisible(false);
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "40%",
                height: 50,
                borderWidth: 0.5,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#4B68E9",
              }}
              onPress={() => {
                setlangmodalvisible(false);
                onSelectlang(selectedlang);
              }}
            >
              <Text style={{ color: "white" }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalsLang;

const styles = StyleSheet.create({
  centerview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalview: {
    width: "90%",
    height: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
  },
  lang_item: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  select_icon: {
    width: 24,
    height: 24,
  },
  btn: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
