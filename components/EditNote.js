import React, { useState, useEffect } from "react";
import { View, Modal, Text, Button, TextInput } from "react-native";
import styles from "../styles/styles";

const EditModal = (props) => {
  function closeEditHandler() {
    props.onClose();
  }

  return (
    <Modal animationType="slide" visible={props.visible}>
      <View>
        <View accessibilityRole="toolbar" style={styles.topToolbar}>
          <Button onPress={closeEditHandler} title="Cancel" color="#ff7d7d" />
          <Button onPress={closeEditHandler} title="Save" color="#2a54fa" />
        </View>
        <View style={styles.editContainer}>
          <TextInput
            placeholder="Title..."
            multiline={false}
            style={styles.input}
            // onChangeText={inputTitle}
            value={props.title}
          />
          <TextInput
            placeholder="Content..."
            textAlignVertical="top"
            multiline={true}
            style={styles.inputMulti}
            // onChangeText={inputContent}
            value={props.body}
          />
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;
