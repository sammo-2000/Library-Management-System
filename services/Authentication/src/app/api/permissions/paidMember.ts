import {userPermissions} from "../../../types/permissionTypes.js";

const paidMember: userPermissions = {
    borrow: {
      forMe: {
        read: true,
      },
      forOthers: {
        create: false,
        read: false,
        update: false,
      },
    },
    reservation: {
      forMe: {
        create: true,
        read: true,
        update: false,
        delete: true,
      },
      forOthers: {
        create: false,
        read: false,
        update: false,
        delete: false,
      },
    },
    authentication: {
      forMe: {
        create: false,
        read: true,
        update: true,
        delete: true,
      },
      forOthers: {
        create: false,
        read: false,
        update: false,
        delete: false,
      },
    },
    inventory: {
      media: {
        create: false,
        read: true,
        update: false,
        delete: false,
      },
      author: {
        create: false,
        read: true,
        update: false,
        delete: false,
      },
      branches: {
        create: false,
        read: true,
        update: false,
        delete: false,
      },
      branchesInCity: {
        create: false,
        read: true,
        update: false,
        delete: false,
      },
      cities: {
        create: false,
        read: true,
        update: false,
        delete: false,
      },
      genres: {
        create: false,
        read: true,
        update: false,
        delete: false,
      },
      publishers: {
        create: false,
        read: true,
        update: false,
        delete: false,
      },
      transferMedia: {
        transfer: false
      },
    },
  };
  
  export default paidMember;
 