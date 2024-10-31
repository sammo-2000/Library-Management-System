title UC-006 - Cancel Reservation

actor Library Member
boundary Reservations Page
control Reservation Controller
entity Reservation Model
database Database
actor Email System

activate Library Member
Library Member->Reservations Page:Chooses cancel reservation\n
activate Reservations Page
Reservations Page->Reservation Controller:Calls cancel reservation API
activate Reservation Controller
Reservation Controller->Reservation Model:Get waitlist
activate Reservation Model
Reservation Model->Database:Get waitlist
activate Database
Reservation Model<--Database:Return waitlist
deactivate Database
Reservation Controller<--Reservation Model:Return waitlist
deactivate Reservation Model
Reservation Controller->Reservation Controller:Check user is in waitlist
alt User is in waitlist
Reservation Controller->Reservation Model:Remove user from waitlist
activate Reservation Model
Reservation Model->Database:Remove user from waitlist
activate Database
Reservation Model<--Database:Removal successful
deactivate Database
Reservation Controller<--Reservation Model:Removal successful
deactivate Reservation Model
Reservation Controller->Email System:Send email confirmation
activate Email System
Reservations Page<--Reservation Controller:Returns successful response
deactivate Email System
Library Member<--Reservations Page:Display confirmation message
else User not in waitlist

Reservations Page<--Reservation Controller:Returns bad request with error message
Library Member<--Reservations Page:Display error message
end
