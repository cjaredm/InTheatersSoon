import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Image, Text } from "react-native";

export function SavedMovie(props) {
  const { color: backgroundColor, title, id, poster, backdrop, dims } = props;

  const posterWidth = 65;

  const styles = StyleSheet.create({
    container: {
      width: dims.width,
      height: 100,
      backgroundColor,
      flex: 1,
      flexDirection: "row"
    },
    poster: {
      height: 100,
      width: 65,
      marginHorizontal: "auto",
      justifyContent: "flex-start"
    },
    backdrop: {
      height: 100,
      width: 120
    },

    textContainer: {
      maxWidth: dims.width - posterWidth - 200,
      justifyContent: "flex-end"
    },

    title: {
      textAlign: "center",
      color: "white",
      lineHeight: 16,
      fontSize: 16,
      fontWeight: "bold"
    },
    date: {
      textAlign: "center"
    }
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.backdrop}
        source={{ uri: backdrop }}
        alt="Movie Poster"
        key={id}
      />
      <View styles={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>2018-09-15</Text>
      </View>
    </View>
  );
}

SavedMovie.propTypes = {
  title: PropTypes.string,
  release_date: PropTypes.string,
  poster_path: PropTypes.string,
  id: PropTypes.number,
  config: PropTypes.object,
  color: PropTypes.string,
  dims: PropTypes.object
};
