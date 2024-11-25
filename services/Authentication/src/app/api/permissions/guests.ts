import {userPermissions} from "../../../types/permissionTypes.js";


  const guest: userPermissions = {
    borrow: {
      forMe: {
        read: false,
      },
      forOthers: {
        create: false,
        read: false,
        update: false,
      },
    },
    reservation: {
      forMe: {
        create: false,
        read: false,
        update: false,
        delete: false,
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
        create: true,
        read: false,
        update: false,
        delete: false,
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
        create: false,
        read: true,
        update: false,
        delete: false,
      },
    },
  };
  
  export default guest;