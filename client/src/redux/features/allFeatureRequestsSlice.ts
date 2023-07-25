import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeatureRequest } from '../../helpers/types';

const initialState: FeatureRequest[] = []

export const allFeatureRequestsSlice = createSlice({
  name: 'all feature requests',
  initialState,
  reducers: {
    setAllFeatureRequests: (state, action: PayloadAction<FeatureRequest[]>) => {
      state = action.payload;
      return state;
    },
    upVote: (
      state: FeatureRequest[],
      action: PayloadAction<{ featureRequestId: string; userId: string; userPic: string }>
    ): FeatureRequest[] => {
      return state.map(featureRequest => {
        if (featureRequest._id === action.payload.featureRequestId) {
          return {
            ...featureRequest,
            voters: [action.payload.userId, ...featureRequest.voters],
            votersPics: [action.payload.userPic, ...featureRequest.votersPics],
          };
        } else {
          return featureRequest;
        }
      });
    },
    downVote: (state, action: PayloadAction<{ featureRequestId: string; userId: string; userPic: string }>) => {
      return state.map(featureRequest => (
          featureRequest._id === action.payload.featureRequestId ?
          {...featureRequest, voters: featureRequest.voters.filter( voter => voter !== action.payload.userId ), votersPics: featureRequest.votersPics.filter(voterPic => voterPic !== action.payload.userPic )}
          : featureRequest
        )
      )
    },
    addFeatureRequest: (state, action: PayloadAction<{ featureRequest: FeatureRequest }>) => {
      return [...state, action.payload.featureRequest];
    },
    deleteFeatureRequest: (state, action: PayloadAction<{ featureRequest: FeatureRequest }>) => {
      return state.filter(featureRequest => featureRequest._id !== action.payload.featureRequest._id);
    },
    updateFeatureRequest: (state, action: PayloadAction<{ featureRequestToUpdate: FeatureRequest }>) => {
      return state.map(featureRequest => {
        if (featureRequest._id === action.payload.featureRequestToUpdate._id) {
          featureRequest = action.payload.featureRequestToUpdate;
          return featureRequest;
        } else {
          return featureRequest;
        }
      });
    },
  },
})

export const { upVote, downVote, setAllFeatureRequests, addFeatureRequest, deleteFeatureRequest, updateFeatureRequest } = allFeatureRequestsSlice.actions

export default allFeatureRequestsSlice.reducer