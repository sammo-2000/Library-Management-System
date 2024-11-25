import permissionsList from "../app/api/permissions";
export type userPermissions = {
    borrow: {
      forMe: {
        read: boolean;
      };
      forOthers: {
        create: boolean;
        read: boolean;
        update: boolean;
      };
    };
    reservation: {
      forMe: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
      };
      forOthers: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
      };
    };
    authentication: {
      forMe: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
      };
      forOthers: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
      };
    };
    inventory: {
      media: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
      };
      author: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
      };
      branches: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
      };
      branchesInCity: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
      };
      cities: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
      };
      genres: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
      };
      publishers: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
      };
      transferMedia: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
      };
    };
  };

export type Role = keyof typeof permissionsList; // Automatically infers keys from permissionsList
export type Service = keyof userPermissions;

  