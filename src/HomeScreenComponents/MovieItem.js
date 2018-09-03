import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from "react-native";
import styled from "styled-components";
import AddToCalendar from "./AddToCalendar";

type Props = {
  title: string,
  release_date: string,
  poster_path: string,
  id: any,
  config: any,
  getVideoUrl: any,
  color: string,
  dims: any
};

export default function MovieItem(props: Props) {
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
    <Wrapper>
      <View style={styles.topTab}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableHighlight onPress={() => getVideoUrl(id)}>
        <ViewRelative>
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
        </ViewRelative>
      </TouchableHighlight>
      <AddToCalendar
        releaseDate={release_date}
        title={title}
        color={color}
        dims={dims}
      />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  margin-top: 10;
`;

const ViewRelative = styled.View`
  position: relative;
`;
