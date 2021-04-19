import { fromJS, List } from 'immutable';

import {
  TOGGLE_SIDEBAR,
  OPEN_MENU,
  OPEN_SUBMENU,
  CHANGE_THEME,
  CHANGE_MODE,
  CHANGE_LAYOUT,
  CHANGE_DIRECTION,
  LOAD_PAGE,
  GET_MENU,
  GET_MENU_SUCCESS,
  GET_MENU_FAILURE
} from '../constants/uiConstants';

const initialState = {
  /* Settings for Themes and layout */
  theme: 'blueTheme',
  type: 'light', // light or dark
  direction: 'ltr', // ltr or rtl
  layout: 'big-sidebar', // sidebar, big-sidebar, top-navigation, mega-menu
  /* End settings */
  palette: List([
    { name: 'Red', value: 'redTheme' },
    { name: 'Green', value: 'greenTheme' },
    { name: 'Blue', value: 'blueTheme' },
    { name: 'Purple', value: 'purpleTheme' },
    { name: 'Orange', value: 'orangeTheme' },
    { name: 'Grey', value: 'greyTheme' },
    { name: 'Green Light', value: 'lightGreenTheme' },
    { name: 'Blue Light', value: 'lightBlueTheme' },
    { name: 'Brown', value: 'brownTheme' },
  ]),
  sidebarOpen: true,
  pageLoaded: false,
  subMenuOpen: [],
  menu: [],
  loading: false,
  message: null,
};

const getMenus = menuArray => menuArray.map(item => {
  if (item.child) {
    return item.child;
  }
  return false;
});

const setNavCollapse = (arr, curRoute, menu) => {
  let headMenu = 'not found';
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr[i].length; j += 1) {
      if (arr[i][j].link === curRoute) {
        headMenu = menu[i].key;
      }
    }
  }
  return headMenu;
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return state.withMutations((mutableState) => {
        mutableState.set('sidebarOpen', !state.get('sidebarOpen'));
      });
    case OPEN_MENU: 
      return state.withMutations((mutableState) => {
        mutableState.set('sidebarOpen', true);
      });
    case OPEN_SUBMENU:
      return state.withMutations((mutableState) => {
        // Set initial open parent menu
        const activeParent = setNavCollapse(
          getMenus(state.getIn(['menu'])),
          action.initialLocation,
          state.getIn(['menu'])
        );

        // Once page loaded will expand the parent menu
        if (action.initialLocation) {
          mutableState.set('subMenuOpen', List([activeParent]));
          return;
        }

        // Expand / Collapse parent menu
        const menuList = state.get('subMenuOpen');
        if (menuList.indexOf(action.key) > -1) {
          if (action.keyParent) {
            mutableState.set('subMenuOpen', List([action.keyParent]));
          } else {
            mutableState.set('subMenuOpen', List([]));
          }
        } else {
          mutableState.set('subMenuOpen', List([action.key, action.keyParent]));
        }
      });
    case CHANGE_THEME:
      return state.withMutations((mutableState) => {
        mutableState.set('theme', action.theme);
      });
    case CHANGE_MODE:
      return state.withMutations((mutableState) => {
        mutableState.set('type', action.mode);
      });
    case CHANGE_LAYOUT:
      return state.withMutations((mutableState) => {
        mutableState.set('layout', action.layout);
      });
    case CHANGE_DIRECTION:
      return state.withMutations((mutableState) => {
        mutableState.set('direction', action.direction);
      });
    case LOAD_PAGE:
      return state.withMutations((mutableState) => {
        mutableState.set('pageLoaded', action.isLoaded);
      });

    case GET_MENU:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case GET_MENU_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', false);
        mutableState.set('menu', action.menu);
      });
    case GET_MENU_FAILURE:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', false);
        mutableState.set('menu', action.error.message);
      });

    default:
      return state;
  }
}
