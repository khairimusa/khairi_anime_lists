import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
  Alert,
  Modal,
  FlatList,
} from "react-native";

import styles from "./welcome.style";
import { COLORS } from "../../../constants";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../../hook/useDebouce";
import axios from "axios";
import AnimeListCard from "../../common/cards/animelistscard/AnimeListCard";
import useStore from "../../../utils/store";

export default function Welcome({}) {
  const [search, setSearch] = useState("");
  const { modalVisible, setModalVisible } = useStore();
  const debouncedSearchTerm = useDebounce(search, 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", debouncedSearchTerm],
    queryFn: async () => {
      let baseUrl = "https://api.jikan.moe/v4/anime";
      const { data } = await axios.get(`${baseUrl}?q=${search}&limit=15`);
      return data.data;
    },
  });

  return (
    <View>
      <View style={styles.tabsContainer}>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <TextInput
            style={{
              height: 50,
              backgroundColor: "#f2f2f2",
              borderRadius: 15,
              paddingHorizontal: 20,
              width: "70%",
            }}
            placeholder="Enter an anime name..."
            onChangeText={(searchTerm) => {
              setSearch(searchTerm);
            }}
            defaultValue={search}
          />
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.textStyle}>Search</Text>
          </Pressable>
        </View>

        <View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <SearchResult
                    data={data}
                    isLoading={isLoading}
                    error={error}
                  />
                  <Pressable
                    style={[styles.buttonInsideModal, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </View>
  );
}

function renderItem({ item }) {
  return (
    <View
      style={{
        paddingVertical: 5,
        paddingHorizontal: 1,
        backgroundColor: COLORS.lightWhite,
        width: "100%",
      }}
    >
      <AnimeListCard anime={item} key={item.mal_id} handleNavigate={() => {}} />
    </View>
  );
}

function SearchResult({ data, isLoading, error }) {
  const keyExtractor = (_, index) => index.toString();

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Results</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : data.length === 0 ? (
        <Text>No data available</Text>
      ) : (
        <View style={{ height: "85%" }}>
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
}
