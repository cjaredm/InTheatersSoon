import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { SCREENS } from "./HomeScreen";

export default function ResultsHeader(props) {
  const {
    searchValue,
    inputOnChange,
    isLoading,
    setError,
    requestMovies,
    error,
    errorMessage,
    results,
    openSettings,
    resetInput
  } = props;

  return (
    <View style={{ position: "relative", paddingTop: 25 }}>
      <Text style={styles.title}>
        {results ? "Search Results" : "In Theaters Soon"}
      </Text>
      <TouchableHighlight
        style={{ position: "absolute", top: 20, right: 10 }}
        onPress={openSettings}
      >
        <Text>Login / Sign Up / Account</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    lineHeight: 30,
    height: 30,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    textDecorationLine: "underline"
  }
});

ResultsHeader.propTypes = {
  openSettings: PropTypes.func,
  results: PropTypes.array
};
