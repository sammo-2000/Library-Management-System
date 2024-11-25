import manager from './manager.js';
import receptionist from './receptionist.js';
import guest from './guests.js';
import callCenterOperator from './callCenterOperator.js';
import freeMember from './freeMember.js';
import paidMember from './paidMember.js';

const permissionsList = {
  manager,
  receptionist,
  guest,
  callCenterOperator,
  freeMember,
  paidMember
};

export default permissionsList;
