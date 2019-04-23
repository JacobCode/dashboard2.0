import {
  UPDATE_USER_INFO,
  ADD_WEBSITE,
  ADD_SERVER,
  ADD_BUG,
  DELETE_WEBSITE,
  DELETE_SERVER,
  DELETE_BUG,
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
      name: 'Business proposal due',
      date: '5/03'
    },
    {
      id: 2,
      type: 'school',
      name: 'Finish thesis project',
      date: '5/9',
    },
    {
      id: 3,
      type: 'personal',
      name: 'Set up portfolio website',
      date: '5/27',
    },
    {
      id: 4,
      type: 'work',
      name: 'Edit and update store database',
      date: '6/15'
    },
    {
      id: 5,
      type: 'school',
      name: 'Complete PHP project',
      date: '6/22'
    },
    {
      id: 6,
      type: 'school',
      name: 'Present final project',
      date: '6/25'
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
  bugsData: [
    { title: 'Fix loading error', type: 'bug' },
    { title: 'Delete uneccessary variables', type: 'bug' }
  ],
  websiteData: [
    { title: 'Fix navbar on mobile devices', type: 'website' },
    { title: 'Remove horizontal scroll bar', type: 'website' }
  ],
  serverData: [],
  chart: {}
};

export default ((state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return {
        ...state,
        user_info: action.payload
      };
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
    case ADD_BUG:
      return {
        ...state,
        bugsData: action.payload
      }
    case ADD_SERVER:
      return {
        ...state,
        serverData: action.payload
      }
    case ADD_WEBSITE:
      return {
        ...state,
        websiteData: action.payload
      }
    case DELETE_BUG:
      return {
        ...state,
        bugsData: action.payload
      }
    case DELETE_SERVER:
      return {
        ...state,
        serverData: action.payload
      }
    case DELETE_WEBSITE:
      return {
        ...state,
        websiteData: action.payload
      }
    default:
      return state;
  }
})