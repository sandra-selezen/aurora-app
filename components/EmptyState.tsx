import { View, Text, Image } from "react-native";
import { router } from "expo-router";

import { images } from "../constants";
import CustomButton from "./CustomButton";

interface IEmptyState {
  title: string;
  subtitle: string;
  buttonTitle: string;
  onButtonClick: () => void;
}

const EmptyState = ({ title, subtitle, buttonTitle, onButtonClick }: IEmptyState) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-xl font-pmedium text-gray-100">{title}</Text>
      <Text className="text-sm text-center font-psemibold text-white mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title={buttonTitle}
        handlePress={onButtonClick}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
