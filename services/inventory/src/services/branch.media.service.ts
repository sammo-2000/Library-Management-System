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

    // Update stock quantity for a specific BranchId and MediaId
  public async updateStock(branchId: number, mediaId: number) {

    const stock = await BranchMedia.findOne({
      where: {
        BranchId: branchId,
        MediaId: mediaId,
      },
    });
     console.log(stock)
    if (!stock) {
      throw new Error("Stock not found");
    }

    if (stock.quantity < 1) {
      throw new Error("Not enough stock available");
    }

    stock.quantity -= 1;
    await stock.save();

    return stock;
  }
}