import React, { useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import useAppwrite from '@/hooks/useAppwrite';
import { searchPosts } from '@/lib/appwrite';
import VideoCard, { IVideoCard } from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';
import SearchInput from '@/components/SearchInput';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query as string));

  useEffect(() => {
    refetch();
  }, [query]);

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
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={Array.isArray(query) ? query[0] : query} refetch={refetch} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
            buttonTitle="Back to Explore"
            onButtonClick={() => router.push("/home")}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search;
