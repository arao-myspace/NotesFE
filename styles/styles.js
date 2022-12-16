import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  viewStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 25,
    height: "100%",
    width: "100%",
    backgroundColor: "#eaeaea",
  },
  item: {
    borderColor: "rgba(128, 128, 128, 0.4)",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    width: 160,
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "600",
    fontSize: 12,
  },
  body: {
    fontSize: 10,
  },
});

export default styles;
