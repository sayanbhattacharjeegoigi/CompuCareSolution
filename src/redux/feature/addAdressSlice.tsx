import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallApi_Without_Token } from '../../apis/ApiRequest';
import { api_addAddress } from '../../apis/ApiEndPoint';

interface AddressPayload {
  user_id: string;
  bfirst_name: string;
  blast_name?: string;
  bemail?: string;
  bphno?: string;
  baddress?: string;
  bcountry?: string;
  bcity?: string;
  bstate?: string;
  bzip?: string;
  shiptodifferadd?: string;
  sfirst_name?: string;
  slast_name?: string;
  semail?: string;
  sphno?: string;
  saddress?: string;
  scountry?: string;
  scity?: string;
  sstate?: string;
  szip?: string;
}

interface AddressState {
  billingAddress: Partial<AddressPayload>;
  shippingAddress: Partial<AddressPayload>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AddressState = {
  billingAddress: {},
  shippingAddress: {},
  status: 'idle',
  error: null,
};

// Thunk to add address
export const addAddress = createAsyncThunk(
  'address/addAddress',
  async (payload: AddressPayload, { rejectWithValue }) => {
    try {
      const response = await CallApi_Without_Token("POST", api_addAddress, JSON.stringify(payload));

      console.log("response address", response);
      
      if (response.status === "success") {
        return response.result;
      } else {
        return rejectWithValue(response.result);
      }
    } catch (error : any) {
      return rejectWithValue(error.message);
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAddress.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.billingAddress = action.payload.billingAddress;
        state.shippingAddress = action.payload.shippingAddress;
      })
      .addCase(addAddress.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearError } = addressSlice.actions;

export default addressSlice.reducer;
