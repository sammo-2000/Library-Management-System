export interface Reservation {
    id: string;
    mediaId: string;
    accountId: string;
    branchId: string;
    notificationSent: string | null;
    reservedAt: string;
    collectedAt: string | null;
    createdAt: string;
    updatedAt: string;
}
