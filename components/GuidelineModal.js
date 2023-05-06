import React from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";

const MyModal = ({
  modalVisible,
  setModalVisible,
  RuleNo,
  setRuleNo,
  Ruledesc,
  setRuledisc,
  onClose,
  onAddItem,
}) => {
  const handleSave = () => {
    onAddItem(RuleNo, Ruledesc);
    onClose();
    setRuleNo("");
    setRuledisc("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{ fontSize: 17, fontWeight: "bold", textAlign: "center" }}
            >
              Add New Guideline
            </Text>

             <TextInput
              style={styles.textInput}
              placeholder="Rule Number"
              value={RuleNo}
              onChangeText={setRuleNo}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Description"
              value={Ruledesc}
              onChangeText={setRuledisc}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#faf0e6",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: 310,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default MyModal;
