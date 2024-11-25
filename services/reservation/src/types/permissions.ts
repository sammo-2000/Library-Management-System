export type Permissions = {
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
};
