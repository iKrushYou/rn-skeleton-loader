import React, { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import paellaImage from "./paella.jpg";
import Skeleton from "rn-skeleton-loader";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  useEffect(() => handleRefresh(), []);

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text>Demo for react-native-skeleton</Text>
          <View style={{ marginTop: 16 }} />
        </View>
        <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
            }
        >
          {new Array(3).fill(0).map((_, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.cardHeader}>
                  <Skeleton loading={isLoading} type={"circle"} widthVariance={0}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>AK</Text>
                    </View>
                  </Skeleton>
                  <View style={{ marginRight: 16 }} />
                  <View>
                    <Skeleton loading={isLoading} width={150}>
                      <Text>Shrimp and Chorizo Paella</Text>
                    </Skeleton>
                    <Skeleton loading={isLoading} width={100}>
                      <Text>September 14, 2016</Text>
                    </Skeleton>
                  </View>
                </View>
                <Skeleton loading={isLoading} type={"rect"} widthVariance={0}>
                  <View style={styles.cardImage}>
                    <Image source={paellaImage} style={{ flex: 1 }} />
                  </View>
                </Skeleton>
                <View style={styles.cardContent}>
                  <Skeleton loading={isLoading} lines={3}>
                    <Text>
                      This impressive paella is a perfect party dish and a fun meal
                      to cook together with your guests. Add 1 cup of frozen peas
                      along with the mussels, if you like.
                    </Text>
                  </Skeleton>
                </View>
              </View>
          ))}
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: -1,
    padding: 16,
  },
  card: {
    margin: 8,
    borderRadius: 4,
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "white",
  },
  cardImage: {
    flexDirection: "row",
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: "#ff4c3d",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 20,
  },
});
