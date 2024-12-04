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

    public updateStockCount = async (branchId: number, mediaId: number, quantity: number) => {
        const stock = await BranchMedia.findOne({
            where: {
                BranchId: branchId,
                MediaId: mediaId,
            },
        });

        if (!stock) {
            throw new Error(`Stock entry not found for BranchId ${branchId} and MediaId ${mediaId}`);
        }

        stock.quantity = quantity;

        return await stock.save();
    };

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
        };

        // Determine from and to branch
        const fromBranch: Branch = {
            branchId: transfer === "OneToTwo" ? branchOne : branchTwo,
            stock: await this.getStockCount(transfer === "OneToTwo" ? branchOne : branchTwo, mediaId),
        };

        const toBranch: Branch = {
            branchId: transfer === "OneToTwo" ? branchTwo : branchOne,
            stock: await this.getStockCount(transfer === "OneToTwo" ? branchTwo : branchOne, mediaId),
        };

        if (fromBranch.stock < quantity) {
            throw new Error(`Not enough in stock to transfer, there are ${fromBranch.stock} in stock.`);
        }

        let rest = {};

        // If the destination branch has no stock
        if (toBranch.stock < 1) {
            // Add stock to the destination branch
            const addToBranch = await this.addStockCount(toBranch.branchId, mediaId, quantity);

            // Deduct stock from the source branch
            const updateFromBranch = await this.updateStockCount(fromBranch.branchId, mediaId, fromBranch.stock - quantity);

            rest = {
                addedToBranch: addToBranch,
                deductedFromBranch: updateFromBranch,
            };
        } else {
            // Update stock for both branches
            const updateToBranch = await this.updateStockCount(toBranch.branchId, mediaId, toBranch.stock + quantity);
            const updateFromBranch = await this.updateStockCount(fromBranch.branchId, mediaId, fromBranch.stock - quantity);


            rest = {
                updatedToBranch: updateToBranch,
                deductedFromBranch: updateFromBranch,
            };
        }

        // return {
        //     fromBranch,
        //     toBranch,
        //     rest,
        // };

        return "Stock update successfully";
    }
}