import React from 'react';
import { TouchableOpacity, Text, Share, Alert } from 'react-native';

interface ShareButtonProps {
  productId: string;
  productName: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ productId, productName }) => {
  const handleShare = async () => {
    // const url = `https://shop.com/product/${productId}`;
    // try {
    //   await Share.share({
    //     message: `Check out this amazing flower on Flowerly 🌸: ${url}`,
    //   });
    // } catch (error) {
    //   console.error('Error sharing product:', error);
    // }
    try {
        
      const deepLink = `myshop://product/${productId}`;
      await Share.share({
        message: `I found this product, please check it out:\n\n${productName}\n${deepLink}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share product.');
      console.error(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleShare}
      style={{
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        marginTop: 10,
      }}
    >
      <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>
        Share Productt
      </Text>
    </TouchableOpacity>
  );
};

export default ShareButton;
