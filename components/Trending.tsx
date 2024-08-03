import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import * as Animatable from 'react-native-animatable';

import { icons } from "../constants";

type CombinedStyle = ViewStyle & TextStyle & ImageStyle;

const zoomIn: Animatable.CustomAnimation<CombinedStyle> = {
  0: {
    scaleY: 0.9,
  },
  1: {
    scaleY: 1,
  },
};

const zoomOut: Animatable.CustomAnimation<CombinedStyle> = {
  0: {
    scaleY: 1,
  },
  1: {
    scaleY: 0.9,
  },
};

interface ITrendingItemProps {
  activeItem: any;
  item: ITrendingItem;
}

interface ITrendingItem {
  $id: string;
  video: string;
  thumbnail: string;
}

interface ITrending {
  posts: ITrendingItem[];
}

const TrendingItem = ({ activeItem, item }: ITrendingItemProps) => {
  const videoRef = useRef<Video | null>(null);
  const [play, setPlay] = useState(false);
  const [status, setStatus] = useState<any>({});

  // console.log("videoRef", videoRef);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          ref={videoRef}
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          isLooping
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          // onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          // onPress={() => {
          //   if (status.isPlaying) {
          //     videoRef.current?.pauseAsync(); // Optional chaining to check if videoRef.current is not null
          //   } else {
          //     videoRef.current?.playAsync(); // Optional chaining to check if videoRef.current is not null
          //   }
          // }}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
}

const Trending = ({ posts }: ITrending) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  )
}

export default Trending;
