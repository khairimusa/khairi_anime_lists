import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./anime.style";
import { Octicons } from "@expo/vector-icons";
import { checkImageURL } from "../../../utils";

const Anime = ({ animeLogo, animeTitle, genre, producer, year }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: checkImageURL(animeLogo) ? animeLogo : "",
          }}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.animeTitleBox}>
        <Text style={styles.animeTitle}>{animeTitle}</Text>
      </View>

      <View style={styles.animeInfoBox}>
        <Text style={styles.genre}>{genre} </Text>
        <Octicons name="dot-fill" size={12} color="black" />
        <View style={styles.producerBox}>
          <Text style={styles.producerName}> {producer} </Text>
        </View>
        <Octicons name="dot-fill" size={12} color="black" />
        <Text style={styles.genre}> {year}</Text>
      </View>
    </View>
  );
};

export default Anime;
