title UC-003 - Notification (Email)

activate User
User->Reservation Page: Reserve media
activate Reservation Page
Reservation Page->Reservation Controller: Submit reservation request
activate Reservation Controller
Reservation Controller->Media Reservation API: Validate and process request
activate Media Reservation API
Media Reservation API->Reservation Model: Store reservation details
activate Reservation Model
Reservation Model->Database: Store reservation in DB
activate Database
Database-->Reservation Model: Reservation stored
deactivate Database
Reservation Model-->Media Reservation API: Reservation stored
deactivate Reservation Model
Media Reservation API-->Reservation Controller: Reservation success
deactivate Media Reservation API
Reservation Controller-->Reservation Page: Confirm reservation to user

deactivate Reservation Controller
deactivate Reservation Page
note over Reservation Page, User: Reservation confirmed

alt Media Available for Pickup or Reservation Expiry
Media Reservation API->Reservation Model: Check reservation status
activate Reservation Model
Reservation Model->Database: Query reservation status
activate Database
Database-->Reservation Model: Status retrieved
deactivate Database
Reservation Model-->Media Reservation API: Media available or reservation expiring
deactivate Reservation Model
Media Reservation API->Notification Controller: Trigger notification for user
Notification Controller->Notification Service API: Process notification request
activate Notification Service API
Notification Service API->User Model: Retrieve user email
activate User Model
User Model->Database: Fetch user email from DB
Database-->User Model: User email retrieved
User Model-->Notification Service API: User email retrieved
deactivate User Model
Notification Service API-->Notification Controller: Notification generated
deactivate Notification Service API
Notification Controller->Email Service: Send email
Email Service-->User: Send email notification
note over Email Service, User: Email notification sent
end
