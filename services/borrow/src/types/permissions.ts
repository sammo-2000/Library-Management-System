export type Permissions = {
  forMe: {
    read: boolean;
  };
  forOthers: {
    create: boolean;
    read: boolean;
    update: boolean;
  };
};
