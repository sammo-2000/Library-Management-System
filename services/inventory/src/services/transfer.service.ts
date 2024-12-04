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

        if (!stock) return 0

        return stock.quantity;
    }

    public updateStockCount = async (branchId: number, mediaId: number, quantity: number) => {}

    public addStockCount = async (branchId: number, mediaId: number, quantity: number) => {
        return await BranchMedia.create({
            BranchId: branchId,
            MediaId: mediaId,
            quantity: quantity,
        });
    }

    public async transfer(branchOne: number, branchTwo: number, mediaId: number, quantity: number, transfer: string) {

        type Branch = {
            branchId: number,
            stock: number,
        }

        // from and to branch
        const fromBranch: Branch = {
            branchId: transfer === "OneToTwo" ? branchOne : branchTwo,
            stock: await this.getStockCount(transfer === "OneToTwo" ? branchOne : branchTwo, mediaId)
        };
        const toBranch: Branch = {
            branchId: transfer === "OneToTwo" ? branchTwo : branchOne,
            stock:  await this.getStockCount(transfer === "OneToTwo" ? branchTwo : branchOne, mediaId)
        };

        if (fromBranch.stock < quantity) { throw new Error('Not enough in stock to transfer'); }

        // does it already this item (to branch)
        if (toBranch.stock === 0) {
            // create one
            await this.addStockCount(toBranch.branchId, mediaId, quantity);

            // take from other
            await this.updateStockCount(fromBranch.branchId, mediaId, fromBranch.stock - quantity)
        }
        else {
            // update count
            await this.updateStockCount(toBranch.branchId, mediaId, fromBranch.stock + quantity)

            // take from other
            await this.updateStockCount(fromBranch.branchId, mediaId, fromBranch.stock - quantity)
        }
    }
}