import React, { useEffect } from "react";
import { useRouter, usePathname } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";

import styles from "./animelists.style";
import { COLORS } from "../../../constants";
import AnimeListCard from "../../common/cards/animelistscard/AnimeListCard";
import useFetch from "../../../hook/useFetch";

const AnimeLists = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Anime Lists</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong {JSON.stringify(data, null, 2)}</Text>
        ) : (
          data?.map((anime) => (
            <AnimeListCard
              anime={anime}
              key={`${anime.mal_id}`}
              handleNavigate={() =>
                router.push(`/anime-details/${anime.mal_id}`)
              }
            />
          ))
        )}
      </View>
    </View>
  );
};

export default AnimeLists;
