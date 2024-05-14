export interface ContractType {
  safeMintBook: (
    account: string,
    isbn: string,
    price: number,
    endDate: number,
    startDate: number,
    options: { from: string }
  ) => Promise<any>
  getISBN: (tokenId: number) => Promise<number>
  getRentalPrice: (tokenId: number) => Promise<number>
  getRentalEnd: (tokenId: number) => Promise<number>
  getRentalStart: (tokenId: number) => Promise<number>
}
