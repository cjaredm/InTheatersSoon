import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from "react-native";
import AddToCalendar from "./AddToCalendar";

export default function MovieItem(props) {
  const {
    title,
    release_date,
    poster_path,
    id,
    config,
    getVideoUrl,
    color,
    dims
  } = props;

  const poster = `${config.images.secure_base_url}${
    config.images.poster_sizes[4]
  }${poster_path}`;

  const styles = StyleSheet.create({
    topTab: {
      minHeight: 50,
      width: "100%",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: color,
      paddingVertical: 15
    },

    title: {
      textAlign: "center",
      width: "100%",
      color: "white",
      lineHeight: 20,
      fontSize: 20,
      paddingHorizontal: 15,
      fontWeight: "bold"
    },

    poster: {
      height: 500,
      marginHorizontal: "auto"
    },
    playButton: {
      height: 150,
      width: "50%",
      position: "absolute",
      top: 500 / 2 - 150 / 2,
      left: (dims.width - 40) / 2 - 80,
      opacity: 0.85
    }
  });

  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.topTab}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableHighlight onPress={() => getVideoUrl(id)}>
        <View style={{ position: "relative" }}>
          <Image
            style={styles.poster}
            source={{ uri: poster }}
            alt="Movie Poster"
            key={id}
          />
          <Image
            style={styles.playButton}
            source={require("../../assets/images/youtubePlayButton.png")}
            alt="Play button"
          />
        </View>
      </TouchableHighlight>
      <AddToCalendar
        releaseDate={release_date}
        title={title}
        color={color}
        dims={dims}
      />
    </View>
  );
}

MovieItem.propTypes = {
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
  id: PropTypes.number,
  config: PropTypes.object,
  color: PropTypes.string,
  dims: PropTypes.object
};
