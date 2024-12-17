title UC-002 - Manage Inventory

actor User
boundary View Branches Page
control Branches Controller
entity Branches Model
boundary Manage Inventory Page
control Inventory Controller
entity Inventory Model
database Inventory Database
actor Reservation service
actor Borrow service

activate User
User->View Branches Page:User click view stocks
activate View Branches Page
View Branches Page->Branches Controller:Get branches
activate Branches Controller
Branches Controller->Branches Model:Get branches
activate Branches Model
Branches Model->Inventory Database:Get branches
activate Inventory Database
Branches Model<--Inventory Database:Return branches
deactivate Inventory Database
Branches Controller<--Branches Model:Return branches
deactivate Branches Model
View Branches Page<--Branches Controller:Return branches
deactivate Branches Controller
User<--View Branches Page:Display branches
User->View Branches Page:Select branch
View Branches Page->Inventory Controller:Get stock & stock count for selected branch
activate Inventory Controller
Inventory Controller->Inventory Model:Get stock count
activate Inventory Model
Inventory Model->Inventory Database:Get stock count
activate Inventory Database
Inventory Model<--Inventory Database:Return stock count
deactivate Inventory Database
Inventory Controller<--Inventory Model:Return stock count
deactivate Inventory Model
Inventory Controller->Reservation service:Get reservation count
activate Reservation service
Inventory Controller<--Reservation service:Return reservation count
deactivate Reservation service
Inventory Controller->Borrow service:Get borrow count
activate Borrow service
Inventory Controller<--Borrow service:Return borrow count
deactivate Borrow service
View Branches Page<--Inventory Controller:Return stock & counts
deactivate Inventory Controller
User<--View Branches Page:Display info
User->View Branches Page:Click transfer
View Branches Page->Manage Inventory Page:Redirect
activate Manage Inventory Page
deactivate View Branches Page
Manage Inventory Page->Inventory Controller:Form filled with transfer detail
activate Inventory Controller
Inventory Controller->Inventory Controller:Validate input is of valid point
alt Invalid input
Manage Inventory Page<--Inventory Controller:Return error
User<--Manage Inventory Page:Display error
else Valid input
Inventory Controller->Inventory Model:Check if enough stock to transfer
activate Inventory Model
Inventory Model->Inventory Database:Get stock count
activate Inventory Database
Inventory Model<--Inventory Database:Return stock count
deactivate Inventory Database
Inventory Controller<--Inventory Model:Return stock count
deactivate Inventory Model
alt Not enough stock
Manage Inventory Page<--Inventory Controller:Not enough stock error
User<--Manage Inventory Page:Display error
else Enough stock
Inventory Controller->Inventory Model:Update stock count
activate Inventory Model
Inventory Model->Inventory Database:Update stock count
deactivate Inventory Model
activate Inventory Database
Manage Inventory Page<--Inventory Controller:Return message
deactivate Inventory Controller
deactivate Inventory Database
User<--Manage Inventory Page:Display message
deactivate Manage Inventory Page
end
end