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
    upVote: (state, action: PayloadAction<{ featureRequestId: string; userId: string }>) => {
      return state.map(featureRequest => (
          featureRequest._id === action.payload.featureRequestId ?
          {...featureRequest, voters: [action.payload.userId, ...featureRequest.voters]}
          : featureRequest
        )
      )
    },
    downVote: (state, action: PayloadAction<{ featureRequestId: string; userId: string }>) => {
      return state.map(featureRequest => (
          featureRequest._id === action.payload.featureRequestId ?
          {...featureRequest, voters: featureRequest.voters.filter( voter => voter !== action.payload.userId )}
          : featureRequest
        )
      )
    }
  },
})

export const { upVote, downVote, setAllFeatureRequests } = allFeatureRequestsSlice.actions

export default allFeatureRequestsSlice.reducer