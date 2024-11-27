export type Permissions = {
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
