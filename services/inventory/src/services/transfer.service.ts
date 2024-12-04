//Business Logic Layer

import BranchMedia from "../models/BranchMedia";

export class TransferService {

    public getStockCount = async (branchId: number, mediaId: number): Promise<number> => {
        const stock = await BranchMedia.findOne({
            where: {
                BranchId: branchId,
                MediaId: mediaId,
            },
        });

        console.log(stock);

        return 0;
    }

    public updateStockCount = async () => {}

    public addStockCount = async () => {}

    public transfer = async (branchOne: number, branchTwo: number, mediaId: number, quantity: number, transfer: string) => {
        return this.getStockCount(branchOne, mediaId);
    }

    // public async updateStock(branchId: number, mediaId: number, quantity: number) {
    //     return await BranchMedia.update(
    //         { quantity },
    //         {
    //             where: {
    //                 BranchId: branchId,
    //                 MediaId: mediaId,
    //             },
    //         }
    //     );
    // }
    //
    // public getStock = async (branchId: number, mediaId: number) => {
    //     return await BranchMedia.findOne({
    //         where: {
    //             BranchId: branchId,
    //             MediaId: mediaId,
    //         }
    //     },)
    // }
    // //
    // // public  takeStock = async (branchId: number, mediaId: number, quantity: number)=  {
    // //
    // //
    // //
    // //     return await BranchMedia.create({
    // //         BranchId: branchId,
    // //         MediaId: mediaId,
    // //         quantity: quantity,
    // //     });
    // // }
    //
    //
    // public async createStock(branchId: number, mediaId: number, quantity: number) {
    //     return await BranchMedia.create({
    //         BranchId: branchId,
    //         MediaId: mediaId,
    //         quantity: quantity,
    //     });
    // }
    //
    // public async transfer(branchOne: number, branchTwo: number, mediaId: number, quantity: number, transfer: string) {
    //
    //     type Branch = {
    //         branchId: number,
    //         stock: number,
    //     }
    //
    //     // from and to branch
    //     const fromBranch: Branch = {
    //         branchId: transfer === "OneToTwo" ? branchOne : branchTwo,
    //         stock: 1
    //     };
    //     const toBranch: Branch = {
    //         branchId: transfer === "OneToTwo" ? branchTwo : branchOne,
    //         stock: 1
    //     };
    //
    //     if (fromBranch.stock < quantity) { throw new Error('Not enough in stock to transfer'); }
    //
    //     // does it already this item (to branch)
    //     if (toBranch.stock === 0) {
    //         // create one
    //         await this.createStock(toBranch.branchId, mediaId, quantity);
    //
    //         // take from other
    //
    //     }
    //     else {
    //         // update count
    //
    //         // take from other
    //     }
    // }
}