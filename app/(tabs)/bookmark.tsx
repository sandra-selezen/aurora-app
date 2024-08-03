import React from 'react';
import { router } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native';
import useAppwrite from '@/hooks/useAppwrite';
import { getUserPosts } from '@/lib/appwrite';
import EmptyState from '@/components/EmptyState';
import SearchInput from '@/components/SearchInput';
import VideoCard from '@/components/VideoCard';
import { useAuthContext } from '@/context/GlobalProvider';

const BookMark = () => {
  const { user } = useAuthContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator}
          />
        )}
        ListHeaderComponent={() => (
          <View className="mt-6 mb-8 px-4">
            <Text className="mb-6 text-2xl text-white font-psemibold">Saved Videos</Text>
            <SearchInput />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="You don't have any saved videos yet"
            buttonTitle="Back to Explore"
            onButtonClick={() => router.push("/home")}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default BookMark;
