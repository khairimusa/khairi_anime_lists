import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./animelistcard.style";
import { checkImageURL } from "../../../../utils";
import { Fontisto } from "@expo/vector-icons";

const nFormatter = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
};

const AnimeListCard = ({ anime, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(anime.images.webp.image_url)
              ? anime.images.webp.image_url
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="contain"
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.animeName} numberOfLines={1}>
          {anime?.title}
        </Text>

        <Text style={styles.animeType}>{anime?.rating}</Text>
        <View style={styles.ratingsContainer}>
          <Fontisto name="star" size={12} color="gold" />
          <Text style={styles.animeType}>{anime?.score}</Text>
          <Text style={styles.animeType}>({nFormatter(anime?.scored_by)})</Text>
        </View>
        <Text style={styles.animeType}>
          {anime?.season} {anime?.year}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AnimeListCard;
