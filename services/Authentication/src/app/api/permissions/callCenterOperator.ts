import {userPermissions} from "../../../types/permissionTypes.js";

const callCenterOperator: userPermissions = {
    borrow: {
      forMe: {
        read: false,
      },
      forOthers: {
        create: false,
        read: true,
        update: false,
      },
    },
    reservation: {
      forMe: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      forOthers: {
        create: true,
        read: true,
        update: true,
        delete: true,
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
        read: true,
        update: true,
        delete: true,
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
        create: false,
        read: false,
        update: false,
        delete: false,
      },
    },
  };
  
  export default callCenterOperator;