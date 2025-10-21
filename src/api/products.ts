import axios from 'axios';
import { Platform } from 'react-native';

// Local/emulator and remote (ngrok/LAN) endpoints
const EMULATOR_ANDROID = 'http://10.0.2.2:3000';
const EMULATOR_IOS = 'http://localhost:3000';
const REMOTE_BASE = 'https://delmer-superadorn-luba.ngrok-free.dev';
const LAN_BASE = 'http://192.168.1.42:3000';

const API_URL = (() => {
  if (__DEV__) {
    // in development prefer emulator host when running on emulator
    return Platform.OS === 'android' ? REMOTE_BASE : EMULATOR_IOS;
  }
  // installed APK / production -> use remote/ngrok or LAN
  return REMOTE_BASE;
})();

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const getProducts = async () => {
  const response = await instance.get('/products');
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await instance.get(`/products/${id}`);
  return response.data;
};
