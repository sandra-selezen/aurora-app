import React from 'react';
import { View, Text } from 'react-native';

interface IInfoBox {
  title: string | number;
  subtitle?: string;
  containerStyles?: any;
  titleStyles: any;
}

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }: IInfoBox) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  )
}

export default InfoBox;
