'use client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image
} from '@nextui-org/react'

export default function App () {
  return (
    <Navbar className='dark'>
      <NavbarBrand>
        <Image
          src="/img/Logo.webp"
          alt="Logo Departamento de Informática"
          width={90}
          height={79}
          className="m-auto"
        />
        <p className="font-bold text-inherit">Biblioteca De Felipe</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Inicio
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Felipe Espinoza"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Bienvenido.</p>
              <p className="font-semibold">fespinoza@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="settings">Mis Libros</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Cerrar Sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}
