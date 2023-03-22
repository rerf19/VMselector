resource "azurerm_resource_group" "rg_A2m_v2" {
  name     = "rg_A2m_v2_name"
  location = "ukwest"
}

resource "azurerm_virtual_network" "vir_A2m_v2" {
  name                = "vir_A2m_v2_name"
  resource_group_name = "rg_A2m_v2_name"
  location            = "ukwest"
  address_space = [
    "10.0.0.0/16"
  ]
}

resource "azurerm_subnet" "sb_A2m_v2" {
  name                 = "sb_A2m_v2_name"
  resource_group_name  = "rg_A2m_v2_name"
  virtual_network_name = "vir_A2m_v2_name"
  address_prefixes = [
    "10.0.3.0/24"
  ]
}

resource "azurerm_network_interface" "ni_A2m_v2" {
  name                = "ni_A2m_v2_name"
  location            = "ukwest"
  resource_group_name = "rg_A2m_v2_name"
  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.sb_A2m_v2.id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_linux_virtual_machine" "A2m_v2" {
  name                = "virtiualMachine"
  location            = "ukwest"
  size                = "Standard_A2m_v2"
  resource_group_name = "rg_A2m_v2_name"
  network_interface_ids = [
    azurerm_network_interface.ni_A2m_v2.id
  ]
  disable_password_authentication = false
  admin_username                  = "secret_admin"
  admin_password                  = "secret_password@123"
  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }
}

