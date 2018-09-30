import React from "react";
import { TouchableHighlight } from "react-native";
import styled from "styled-components";
import AddToCalendar from "./AddToCalendar";

type Props = {
  title: string,
  release_date: string,
  poster_path: string,
  id: number | string,
  config: Object,
  getVideoUrl: Function,
  color: string,
  dims: Object
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

  return (
    <Wrapper>
      <TopTab color={color}>
        <MovieTitle>{title}</MovieTitle>
      </TopTab>
      <TouchableHighlight onPress={() => getVideoUrl(id)}>
        <ViewRelative>
          <Poster source={{ uri: poster }} alt="Movie Poster" key={id} />
          <PlayButton
            width={dims.width}
            source={require("../../../assets/images/youtubePlayButton.png")}
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
  margin-top: 10px;
`;

const ViewRelative = styled.View`
  position: relative;
`;

const TopTab = styled.View`
  min-height: 50px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${({ color }) => color};
  padding: 15px 0;
`;

const MovieTitle = styled.Text`
  text-align: center;
  width: 100%;
  color: white;
  line-height: 20px;
  font-size: 20px;
  padding: 0 15px;
  font-weight: bold;
`;

const Poster = styled.Image`
  height: 500px;
  width: 100%;
  margin: 0 auto;
`;

const PlayButton = styled.Image`
  height: 150px;
  width: 50%;
  position: absolute;
  top: ${500 / 2 - 150 / 2}px;
  left: ${({ width }) => (width - 40) / 2 - 80}px;
  opacity: 0.85;
`;
