import { getJSON } from '../../backend';
import { createAction, nameAction } from '../../util/createAction';

export const namespace = value => nameAction('settings', value);

export const GET_SETTINGS_SUCCESS = namespace('GET_SETTINGS_SUCCESS');

export function getSettingsSuccess(settings) {
  return createAction(GET_SETTINGS_SUCCESS, settings);
}

export function getSettings() {
  return async (dispatch) => {
    dispatch(getSettingsSuccess(await getJSON(`${process.env.NODE_DAEMON_API}/api/settings`)));
  };
}

function getInitialState() {
  return null;
}

export default function reducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case GET_SETTINGS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
