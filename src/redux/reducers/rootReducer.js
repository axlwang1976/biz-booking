import { combineReducers } from 'redux';

import companiesReducer from './companiesReducer';
import rolesReducer from './rolesReducer';
import groupsReducer from './groupsReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import areasReducer from './areasReducer';
import meetingRoomsReducer from './meetingRoomsReducer';
import equipmentTypesReducer from './equipmentTypesReducer';
import equipmentsReducer from './equipmentsReducer';
import mediasReducer from './mediasReducer';
import contentsReducer from './contentsReducer';
import meetingsReducer from './meetingsReducer';
import bookingRoomReducer from './bookingRoomReducer';
import channelsReducers from './channelsReducer';
import schedulesReducers from './schedulesReducer';
import devicesReducer from './devicesReducer';

export default combineReducers({
  companies: companiesReducer,
  roles: rolesReducer,
  groups: groupsReducer,
  users: usersReducer,
  auth: authReducer,
  areas: areasReducer,
  meetingRooms: meetingRoomsReducer,
  equipmentTypes: equipmentTypesReducer,
  equipments: equipmentsReducer,
  medias: mediasReducer,
  contents: contentsReducer,
  meetings: meetingsReducer,
  bookingRoom: bookingRoomReducer,
  channels: channelsReducers,
  schedules: schedulesReducers,
  devices: devicesReducer,
});
