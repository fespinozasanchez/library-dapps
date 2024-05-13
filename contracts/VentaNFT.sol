// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VentaNFT is ERC721URIStorage, ReentrancyGuard, Ownable {
    address public vendedor;
    uint public precio;
    bool public vendido;
    uint256 public tokenId;

    constructor(address _propietario, string memory _tokenURI, uint256 _tokenId, uint _precioInicial) 
        ERC721("ObraDigitalUnica", "ODU") Ownable(_propietario)
    {
        require(_precioInicial > 0, "El precio debe ser mayor que cero");

        vendedor = _propietario;
        precio = _precioInicial;
        tokenId = _tokenId;
        _mint(_propietario, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        transferOwnership(_propietario);
    }

    event NFTComprado(address indexed vendedor, address indexed comprador, uint256 tokenId);
    event PrecioCambiado(uint nuevoPrecio);
    event NFTRetiradoDeVenta(uint256 tokenId);

    modifier soloVendedor() {
        require(msg.sender == vendedor, "Solo el vendedor puede realizar esta operacion");
        _;
    }

    function cambiarPrecio(uint nuevoPrecio) public soloVendedor {
        require(nuevoPrecio > 0, "El precio debe ser mayor que cero");
        precio = nuevoPrecio;
        emit PrecioCambiado(nuevoPrecio);
    }

    function retirarDeVenta() public soloVendedor {
        require(!vendido, "El NFT ya ha sido vendido");
        vendido = true;  // Cambiamos el estado a vendido para que no se pueda vender.
        emit NFTRetiradoDeVenta(tokenId);
    }

    function comprarNFT(address comprador) public payable nonReentrant {
        require(comprador != vendedor, "El vendedor no puede comprar su propio NFT");
        require(msg.value >= precio, "El Ether enviado es insuficiente");
        require(!vendido, "Este NFT ya ha sido vendido");
        
        _transfer(vendedor, comprador, tokenId);
        vendido = true;
        payable(vendedor).transfer(msg.value);
        emit NFTComprado(vendedor, comprador, tokenId);
    }
}
