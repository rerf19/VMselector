resource "azurerm_virtual_machine" "example-vm" {
  name = "Standard_A4_v2"
  location = [
    "CanadaEast"
  ]
  vm_size = "A4_v2"
  storage_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }
}

