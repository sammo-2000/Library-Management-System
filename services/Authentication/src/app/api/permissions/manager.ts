import {userPermissions} from "../../../types/permissionTypes.js";

const manager: userPermissions = {
    borrow: {
      forMe: {
        read: false,
      },
      forOthers: {
        create: true,
        read: true,
        update: true,
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
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    },
    inventory: {
      media: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      author: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      branches: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      branchesInCity: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      cities: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      genres: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      publishers: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      transferMedia: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    },
  };
  
  export default manager;