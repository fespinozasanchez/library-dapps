export interface IBookRentalLibrary {
  methods: {
    safeMintBook: (
      to: string,
      isbn: number,
      price: number,
      endTime: number,
      startTime: number
    ) => TransactionObject<void>

    getISBN: (tokenId: number) => TransactionObject<number>
    getRentalPrice: (tokenId: number) => TransactionObject<number>
    getRentalEnd: (tokenId: number) => TransactionObject<number>
    getRentalStart: (tokenId: number) => TransactionObject<number>
  }
}

interface TransactionObject<T> {
  call: (options?: TransactionOptions) => Promise<T>
  send: (options?: TransactionOptions) => Promise<TransactionReceipt>
}

interface TransactionOptions {
  from?: string
  gasPrice?: string
  gas?: number
}

interface TransactionReceipt {
  transactionHash: string
  status: boolean
  // other properties depending on the needs
}
