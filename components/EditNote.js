import React, { useState, useEffect } from "react";
import { View, Modal, Text, Button } from "react-native";
import styles from "../styles/styles";

const EditModal = (props) => {
  function closeEditHandler() {
    props.onClose();
  }

  return (
    <Modal animationType="slide" visible={props.visible}>
      <View style={styles.item}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.body}>{props.body}</Text>
      </View>
      <Button onPress={closeEditHandler} title="Back to main" />
    </Modal>
  );
};

export default EditModal;
