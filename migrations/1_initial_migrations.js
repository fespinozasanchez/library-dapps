const BookRentalLibrary = artifacts.require("BookRentalLibrary")

module.exports = function (deployer) {
    deployer.deploy(BookRentalLibrary)
}   