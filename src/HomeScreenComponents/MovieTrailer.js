import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  WebView
} from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignSelf: "stretch",
    height: "100%"
  },
  closeModal: {
    borderRadius: 25,
    backgroundColor: "yellow",
    height: 50,
    width: 50,
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 999999,
    display: "flex"
  }
});

export default function MovieTrailer(props) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.closeModal}
        onPress={props.unsetTrailers}
      >
        <Text
          style={{
            textAlign: "center",
            lineHeight: 50,
            fontSize: 42
          }}
        >
          &#x2716;
        </Text>
      </TouchableHighlight>
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${props.videoKey}` }}
      />
    </View>
  );
}
