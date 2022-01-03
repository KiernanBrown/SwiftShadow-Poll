import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    authenticated: false,
    user: {
      username: '',
      twitchId: '',
      image: '',
      polls: [],
      subTier: '',
      _id: '',
    },
  },
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };
    },
    updatePendingVotes: (state, action) => {
      let updatedVote = action.payload;
      if (!state.user.pendingVotes) {
        state.user.pendingVotes = [];
      }

      let voteIndex = state.user.pendingVotes.findIndex((vote) => {
        return vote.optionId === updatedVote.optionId;
      });

      if (voteIndex !== -1) {
        let newVoteCount = (state.user.pendingVotes[voteIndex].votes =
          state.user.pendingVotes[voteIndex].votes + updatedVote.votes);
        if (newVoteCount === 0) {
          state.user.pendingVotes.splice(voteIndex, 1);
        }
      } else {
        state.user.pendingVotes.push({
          optionId: updatedVote.optionId,
          votes: updatedVote.votes,
        });
      }

      let pendingCount = 0;
      state.user.pendingVotes.forEach(vote => {
        pendingCount += vote.votes;
      });

      state.user.pendingVoteCount = pendingCount;
    },
    clearPendingVotes: (state) => {
      state.user.pendingVotes = [];
      state.user.pendingVoteCount = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, updatePendingVotes, clearPendingVotes } =
  userSlice.actions;

export default userSlice.reducer;
