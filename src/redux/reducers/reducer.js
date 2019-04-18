import {
  UPDATE_USER_INFO,
  ADD_TASK,
  DELETE_TASK,
  ADD_BOOKMARK,
  DELETE_BOOKMARK
} from '../actions/types';

// Initial State
const initialState = {
  // User Info
  user_info: {
    first_name: 'Guest',
    last_name: 'User',
    email: 'example@domain.com',
    username: 'guestuser1'
  },
  // Notifications
  notifications: [
    {
      id: 1,
      type: 'work',
      name: 'Notification 1',
      date: '2/13',
    },
    {
      id: 2,
      type: 'school',
      name: 'Notification 2',
      date: '2/19',
    },
    {
      id: 3,
      type: 'personal',
      name: 'Notification 3',
      date: '2/27',
    }
  ],
  // Bookmarks
  bookmarks: [
    {
      url: 'https://www.apple.com/',
      name: 'Apple'
    },
    {
      url: 'https://stackoverflow.com/',
      name: 'Stack Overflow'
    },
    {
      url: 'https://www.awwwards.com/',
      name: 'Awwwards'
    }
  ],
  // Tasks
  tasks: {
    bugsData: [
      { title: 'Bug task one', type: 'bug' },
      { title: 'Bug task two', type: 'bug' },
      { title: 'Bug task three', type: 'bug' }
    ],
    websiteData: [
      { title: 'Website task one', type: 'website' },
      { title: 'Website task two', type: 'website' },
    ],
    serverData: [
      { title: 'Server task one', type: 'server' },
      { title: 'Server task two', type: 'server' },
    ]
  },
  chart: {}
};

export default ((state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return {
        ...state,
        user_info: action.payload
      };
    case DELETE_TASK:
      return {
        ...state
      }
    case ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: action.payload
      };
    case DELETE_BOOKMARK:
      return {
        ...state,
        bookmarks: action.payload
      };
    default:
      return state;
  }
})