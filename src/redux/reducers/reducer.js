import {
  UPDATE_USER_INFO,
  NOTIFICATIONS,
  BOOKMARKS,
  TASKS,
  CHART
} from '../actions/types';

import Chartist from 'chartist';

// Animation Delays
var delays = 80,
  durations = 500;

// Initial State
const initialState = {
  user_info: {
    first_name: 'Guest',
    last_name: 'User',
    email: 'example@domain.com',
    username: 'guestuser1'
  },
  // REMOVE ONCE IMPLEMENTED
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
  // ADD COMPLETE BOOLEAN
  tasks: {
    bugsData: [
      { title: 'Fix horizontal scrolling view' },
      { title: 'Optimize images' }
    ],
    websiteData: [
      { title: 'Renew website certificate' },
      { title: 'Deploy new website' }
    ],
    serverData: []
  },
  chart: {
    data: {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series: [
        [10, 15, 25, 30, 25, 15, 10]
      ]
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    // Animation
    animation: {
      draw: function (data) {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    }
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return {
        ...state,
        user_info: action.payload
      };
    default:
      return state;
  }
}