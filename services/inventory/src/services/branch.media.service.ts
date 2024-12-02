import BranchMedia from "../models/BranchMedia";

//Business Logic Layer

export class BranchMediaService {
    public async getBranchMedia() {
        return await BranchMedia.findAll();
    }

    public async getBranchMediaByBranchId(branchId: number) {
        return await BranchMedia.findAll({
           where: {
               BranchId: branchId
           }
        });
    }
}