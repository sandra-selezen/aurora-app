import React from 'react';
import { ActivityIndicator, TouchableOpacity, Text } from 'react-native';

interface ICustomButton {
  title: string;
  handlePress: () => void;
  containerStyles?: any;
  textStyles?: any;
  isLoading?: boolean;
}

const CustomButton = ({ title, handlePress, textStyles, containerStyles, isLoading }: ICustomButton) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  )
}

export default CustomButton;
