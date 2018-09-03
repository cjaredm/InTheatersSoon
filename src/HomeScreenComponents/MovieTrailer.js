import React from "react";
import { StyleSheet, View, TouchableHighlight, WebView } from "react-native";
import styled from "styled-components";

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

type Props = {
  videoKey: string,
  unsetTrailers: any
};

export default function MovieTrailer(props: Props) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.closeModal}
        onPress={props.unsetTrailers}
      >
        <ExitText>&#x2716;</ExitText>
      </TouchableHighlight>
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${props.videoKey}` }}
      />
    </View>
  );
}

const ExitText = styled.Text`
  text-align: center;
  line-height: 50px;
  font-size: 42px;
`;
