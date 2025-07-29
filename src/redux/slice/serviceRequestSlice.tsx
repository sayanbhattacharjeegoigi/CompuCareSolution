import { api_add_service_request } from "@/src/apis/ApiEndPoint";
import { CallApi_Without_Token } from "@/src/apis/ApiRequest";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store/Store";

interface ServiceRequestPayload {
  repair_category_id: number | undefined;
  maufacturer_id: number | undefined;
  model_id: number | undefined;
  service_type_id: number | undefined;
  repair_issue_id: number[];
  userId: number | undefined;
}

interface ServiceRequestState {
  loading: boolean;
  requestId: number | null;
  serviceTypeId: string | null;
  address: any;
  description: string[];
  message: string | null;
  error: string | null;
}

const initialState: ServiceRequestState = {
  loading: false,
  requestId: null,
  serviceTypeId: null,
  address: {},
  description: [],
  message: null,
  error: null,
};

const serviceRequestSlice = createSlice({
  name: "serviceRequest",
  initialState,
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    requestSuccess(
      state,
      action: PayloadAction<{
        requestId: number;
        serviceTypeId: string;
        message: string;
      }>
    ) {
      state.loading = false;
      state.requestId = action.payload.requestId;
      state.serviceTypeId = action.payload.serviceTypeId;
      state.message = action.payload.message;
    },
    requestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearRequest(state) {
      return initialState;
    },
    addressStore(state, action) {
      state.address = action.payload;
    },
    addressclear(state) {
      state.address = {};
    },
    addressDescription(state, action) {
      state.description = action.payload;
    },
    addressClear(state) {
      state.description = [];
    },
  },
});

export const {
  requestStart,
  requestSuccess,
  requestFailure,
  clearRequest,
  addressStore,
} = serviceRequestSlice.actions;

export default serviceRequestSlice.reducer;

export const submitServiceRequest =
  (payload: ServiceRequestPayload): AppThunk =>
  async (dispatch) => {
    dispatch(requestStart());
    try {
      const res = await CallApi_Without_Token(api_add_service_request, payload);

      if (res?.status === "1") {
        dispatch(
          requestSuccess({
            requestId: res.requestId,
            serviceTypeId: res.service_type_id,
            message: res.message,
          })
        );
      } else {
        dispatch(requestFailure(res?.error || "Submission failed"));
      }
    } catch (error: any) {
      dispatch(requestFailure(error.message || "Unexpected error"));
    }
  };
