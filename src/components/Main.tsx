'use client'
import data from '@/lib/data.json'
import { type Book } from '@/interfaces/book'
import { useEffect, useMemo, useState } from 'react'
import {
  Select,
  SelectItem,
  Card,
  CardFooter,
  Image,
  Button
} from '@nextui-org/react'
import { HeartIcon, PlusIcon } from './svg'

const books: Book[] = data.library.map((data) => data.book)
const genres: Array<Book['genre']> = [
  'All',
  ...Array.from(new Set(books.map((book) => book.genre)))
]

function onReadListChange (callback: (readList: Set<string>) => void) {
  function getReadList () {
    const storedReadList = localStorage.getItem('readList')
    if (storedReadList != null) {
      const readList = new Set<string>(
        JSON.parse(storedReadList) as Iterable<string>
      ) // Specify the type as Iterable<string>
      return readList
    }
    return new Set<string>() // Return an empty set of strings if there is no data
  }
  const readList = getReadList()
  callback(readList)

  window.addEventListener('storage', (e) => {
    if (e.key === 'readList') callback(getReadList())
  })
  getReadList()
  return () => {
    window.removeEventListener('storage', (e) => {
      if (e.key === 'readList') callback(getReadList())
    })
  }
}
export default function Main () {
  const [genre, setGenre] = useState<Book['genre']>('All')
  const [readList, setReadList] = useState<Set<Book['ISBN']>>(new Set())
  const matchs = useMemo(() => {
    if (genre.length === 0 || genre === '' || genre === 'All') return books
    return books.filter((book) => book.genre === genre)
  }, [genre])

  function handleBookClick (book: Book['ISBN']) {
    const draft = new Set(readList) // Clona el conjunto para no mutar el original
    if (draft.has(book)) {
      draft.delete(book)
    } else {
      draft.add(book)
    }
    setReadList(draft)

    // Al agregar o quitar elementos, actualiza el localStorage
    localStorage.setItem('readList', JSON.stringify(Array.from(draft)))
  }

  useEffect(() => {
    const unsuscribe = onReadListChange(setReadList)
    return () => {
      unsuscribe()
    }
  }, [])

  return (
    <div className="grid gap-2 h-full max-h-full overflow-y-auto">
      <Select
        value={genre}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setGenre(e.target.value)
        }}
        items={genres}
        label="Genero"
        placeholder="Selecciona un Genero"
        className="max-w-xs"
      >
        {genres.map((genre) => (
          <SelectItem key={genre}>{genre}</SelectItem>
        ))}
      </Select>
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
                    handleBookClick(book.ISBN)
                  }}
                  color={readList.has(book.ISBN) ? 'danger' : 'default'}
                  variant="shadow"
                  aria-label="add to favorite"
                >
                  {readList.has(book.ISBN) ? <HeartIcon /> : <PlusIcon />}
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
