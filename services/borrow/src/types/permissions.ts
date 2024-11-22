export type Permissions = {
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
};
