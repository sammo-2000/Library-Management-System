title UC-002 - Manage Inventory

actor User
boundary View Branches Page
control Branches Controller
entity Branches Model
boundary Manage Inventory Page
control Inventory Controller
entity Inventory Model
database Inventory Database

activate User
User->View Branches Page:HTTPS request
activate View Branches Page
View Branches Page->Branches Controller:request all branches
activate Branches Controller
Branches Controller->Branches Model:Get all branches
activate Branches Model
Branches Model->Inventory Database:Get all branches
activate Inventory Database
Branches Model<--Inventory Database:Return branches
deactivate Inventory Database
Branches Controller<--Branches Model:Return branches
deactivate Branches Model
View Branches Page<--Branches Controller:Display branches
deactivate Branches Controller
View Branches Page->Branches Controller:Click on branch
activate Branches Controller
Branches Controller->Branches Model:Get branch inventory
activate Branches Model
Branches Model->Inventory Database:Get inventory
activate Inventory Database
Branches Model<--Inventory Database:Return inventory
deactivate Inventory Database
Branches Controller<--Branches Model:Return inventory
deactivate Branches Model
View Branches Page<--Branches Controller:Display inventory
deactivate Branches Controller
View Branches Page->Manage Inventory Page:Select item
activate Manage Inventory Page
Manage Inventory Page->Inventory Controller:Get inventory from all branch for the item
deactivate View Branches Page
activate Inventory Controller
Inventory Controller->Inventory Model:Get inventory from all branch for the item
activate Inventory Model
Inventory Model->Inventory Database:Get inventory from all branch for the item
activate Inventory Database
Inventory Model<--Inventory Database:Return inventory status
deactivate Inventory Database
Inventory Controller<--Inventory Model:Return inventory status
deactivate Inventory Model
Manage Inventory Page<--Inventory Controller:Display inventory
deactivate Inventory Controller
Manage Inventory Page->Inventory Controller:Move item from branch to another
activate Inventory Controller
Inventory Controller->Inventory Model:Check available quantities
deactivate Inventory Model
activate Inventory Model
Inventory Controller<--Inventory Model:Return available quantities
alt There is enough in stock
Inventory Controller->Inventory Model:Change stock between branches
Inventory Model->Inventory Database:Update stock
else There is not enough in stock
deactivate Inventory Model
Manage Inventory Page<--Inventory Controller:Display error not enough stock to move around
end
deactivate Inventory Controller
