// authSlice.ts
import { api_get_user_details, api_login } from "@/src/apis/ApiEndPoint";
import { CallApi_GET, CallApi_Without_Token } from "@/src/apis/ApiRequest";
import { UserDetails } from "@/src/constants/Data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store/Store"; // import this from your store.ts

interface User {
  userId: number;
  fullName: string;
  email: string;
  userType: number;
}

interface AuthState {
  loading: boolean;
  user: User | null;
  userDetails: UserDetails | null;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  userDetails: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
      state.error = null;
    },
    authSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
    },
    authFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    userDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    userDetailsSuccess(state, action: PayloadAction<UserDetails>) {
      state.loading = false;
      state.userDetails = action.payload;
    },
    userDetailsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  logoutSuccess,
  userDetailsStart,
  userDetailsSuccess,
  userDetailsFailure,
} = authSlice.actions;
export default authSlice.reducer;
// Add these inside authSlice.ts or in a separate file if preferred

export const login =
  (email: string, password: string, isRememberMe: boolean): AppThunk =>
  async (dispatch) => {
    dispatch(authStart());
    try {
      console.log("Logging in with:", { email, password });

      const res = await CallApi_Without_Token(api_login, { email, password });
      console.log("Login response:", res);

      if (!res) {
        throw new Error("No response received from server.");
      }

      if (res?.status === 1) {
        const user: User = {
          userId: res.userId,
          fullName: res.fullName,
          email: res.email,
          userType: res.userType,
        };
        await AsyncStorage.setItem("user", JSON.stringify(user));
        if (isRememberMe) {
          await AsyncStorage.setItem(
            "loginCred",
            JSON.stringify({ email, password })
          );
        }
        dispatch(authSuccess(user));
      } else {
        dispatch(authFailure(res?.error || "Login failed"));
      }
    } catch (error: any) {
      console.error("Login error:", error);
      dispatch(authFailure(error?.error || "Unexpected error"));
    }
  };

export const loadUserFromStorage = (): AppThunk => async (dispatch) => {
  dispatch(authStart());
  try {
    const data = await AsyncStorage.getItem("user");
    if (data) {
      const user: User = JSON.parse(data);
      dispatch(authSuccess(user));
    } else {
      dispatch(authFailure("No user found"));
    }
  } catch (error: any) {
    dispatch(authFailure(error.message || "Failed to load user"));
  }
};
export const logout = (): AppThunk => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("user");
    dispatch(logoutSuccess());
  } catch (error) {
    console.error("Logout error:", error);
  }
};
export const fetchUserDetails = (): AppThunk => async (dispatch) => {
  dispatch(userDetailsStart());
  try {
    let user = await AsyncStorage.getItem("user");
    if (!user) {
      return dispatch(userDetailsFailure("User not found in storage"));
    }
    const parsedUser = JSON.parse(user);
    const res = await CallApi_GET(
      api_get_user_details + JSON.stringify(parsedUser?.userId)
    );

    if (res?.status === 1) {
      const user: UserDetails = {
        userId: res.userInfo.userId,
        customerId: res.userInfo.customerId,
        timezoneId: res.userInfo.timezoneId,
        timezone: res.userInfo.timezone,
        fname: res.userInfo.fname,
        lname: res.userInfo.lname,
        email: res.userInfo.email,
        profileImg: res.userInfo.profileImg,
        gender: res.userInfo.gender,
        date_of_birth: res.userInfo.date_of_birth,
        address: res.userInfo.address,
        latitude: res.userInfo.latitude,
        longitude: res.userInfo.longitude,
        phoneNumber: res.userInfo.phoneNumber,
        city: res.userInfo.city,
        state: res.userInfo.state,
        country: res.userInfo.country,
        zip_code: res.userInfo.zip_code,
        stripe_customer_id: res.userInfo.stripe_customer_id,
        stripe_connect_id: res.userInfo.stripe_connect_id,
        stripe_account_verified: res.userInfo.stripe_account_verified,
        profile_description: res.userInfo.profile_description,
      };
      dispatch(userDetailsSuccess(user));
      return user; // ✅ return the user so the screen can check
    } else {
      dispatch(
        userDetailsFailure(res?.error || "Failed to fetch user details")
      );
    }
  } catch (error: any) {
    dispatch(userDetailsFailure(error.message || "Unexpected error"));
  }
};
