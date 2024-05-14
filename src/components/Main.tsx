/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import data from '@/lib/data.json'
import { type Book } from '@/interfaces/book'
import { useEffect, useMemo, useState } from 'react'
import { DateRangePicker } from '@nextui-org/date-picker'
import { getLocalTimeZone, parseDate, today } from '@internationalized/date'

import {
  Select,
  SelectItem,
  Card,
  CardFooter,
  Image,
  Button,
  Tooltip,
  useDisclosure,
  ModalBody,
  ModalFooter,
  Modal,
  ModalContent,
  ModalHeader
} from '@nextui-org/react'

import { PlusIcon } from './svg'
import { useMetamask } from '@/hooks/useMetamask'
import { useContract } from '@/hooks/useContract'

const books: Book[] = data.library.map((data) => data.book)
const genres: Array<Book['genre']> = [
  'All',
  ...Array.from(new Set(books.map((book) => book.genre)))
]

export default function Main () {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [genre, setGenre] = useState<Book['genre']>('All')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [date, setDate] = useState({
    start: parseDate(new Date().toLocaleDateString('en-CA')),
    end: parseDate(new Date().toLocaleDateString('en-CA'))
  })
  const matchs = useMemo(() => {
    if (genre.length === 0 || genre === '' || genre === 'All') return books
    return books.filter((book) => book.genre === genre)
  }, [genre])

  function handleBookClick (book: Book) {
    setSelectedBook(book)
    onOpen()
  }

  const { connectedAccount, connectMetamask } = useMetamask()
  const [contract, setContract] = useState(null)

  useEffect(() => {
    const init = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const loadedContract = await useContract()
      if (loadedContract) {
        setContract(loadedContract)
      }
    }

    init()
  }, [])

  const handleRentBook = async () => {
    // connectMetamask()
    if (!contract || !selectedBook) {
      console.error('Contract is not loaded or no book selected.')
      return
    }
    const { start, end } = date
    const PRICE = calculatePrice(selectedBook.pages, start, end)
    const STARTDATE = new Date(start).getTime() / 1000
    const ENDDATE = new Date(end).getTime() / 1000
    try {
      const receipt = await contract.safeMintBook(
        connectedAccount,
        selectedBook.ISBN,
        PRICE,
        ENDDATE,
        STARTDATE,
        { from: connectedAccount }
      )
      console.log('Transaction receipt:', receipt)
    } catch (error) {
      console.error('Error calling safeMintBook:', error)
    }
  }

  const calculatePrice = (pages, start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = endDate.getTime() - startDate.getTime()
    const days = diffTime / (1000 * 3600 * 24)
    return pages * Math.round(days)
  }
  return (
    <div className="grid gap-2 h-full max-h-full overflow-y-auto">
      <div className="flex justify-between items-center w-full">
        <Select
          value={genre}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setGenre(e.target.value)
          }}
          items={genres}
          label="Género"
          placeholder="Selecciona un Género"
          className="max-w-xs"
        >
          {genres.map((genre) => (
            <SelectItem key={genre}>{genre}</SelectItem>
          ))}
        </Select>

        <Button onPress={connectMetamask}>Connect Metamask</Button>
      </div>

      {connectedAccount != null && (
        <Tooltip
          key={'success'}
          color={'success'}
          content={`Conectado ${connectedAccount}`}
          className="capitalize"
        >
          <Button
            variant="flat"
            color={'success'}
            className="capitalize"
            onClick={() => {
              navigator.clipboard.writeText(connectedAccount)
            }}
          >
            {connectedAccount}
          </Button>
        </Tooltip>
      )}

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-2">
        {matchs?.map((book, index) => (
          <li key={book.ISBN}>
            <Card isFooterBlurred>
              <Image
                removeWrapper
                alt={book.title}
                className="aspect-[9/14] z-0  object-cover"
                src={book.cover}
              />

              <CardFooter className="absolute bg-white/50 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                  <p className=" text-black text-xs uppercase font-bold">
                    {book.author.name}
                  </p>
                  <small className="text-black">{genre}</small>
                  <h4 className="text-black font-bold text-base">
                    {book.title}
                  </h4>
                </div>
                <Button
                  isIconOnly
                  onPress={() => {
                    handleBookClick(book)
                  }}
                  color={'default'}
                  variant="shadow"
                  aria-label="add to favorite"
                >
                  {<PlusIcon />}
                </Button>
              </CardFooter>
            </Card>
            {selectedBook?.ISBN === book.ISBN && (
              <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Seleccione la fecha de inicio y fin de la renta
                      </ModalHeader>
                      <ModalBody>
                        <DateRangePicker
                          label="Stay duration"
                          isRequired
                          value={date}
                          minValue={today(getLocalTimeZone())}
                          onChange={setDate}
                          className="max-w-xs"
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Cancelar
                        </Button>
                        <Button color="primary" onClick={handleRentBook}>
                          Arrendar
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
