// redux/slice/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  username?: string;
  token?: string;
  userDetails?: UserDetails;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: undefined,
  token: undefined,
  userDetails: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; token: string; userDetails?: UserDetails }>) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.userDetails = action.payload.userDetails;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = undefined;
      state.token = undefined;
      state.userDetails = undefined;
    },
    updateUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
    },
  },
});

export const { login, logout, updateUserDetails } = authSlice.actions;
export default authSlice.reducer;
