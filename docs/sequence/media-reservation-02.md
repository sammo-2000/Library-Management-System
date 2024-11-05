title UC-004 (2) - Media Reservation

activate User
User->Reservation Page: Reserve available media
activate Reservation Page
Reservation Page->Reservation Controller: Submit reservation request
activate Reservation Controller
Reservation Controller->Media Reservation API: Validate and process request
activate Media Reservation API
Media Reservation API->Reservation Limit API: Check reservation limits
activate Reservation Limit API
Reservation Limit API->User Model: Fetch user’s reservation data
activate User Model
User Model->Database: Query user reservation data from DB
activate Database
Database-->User Model: User reservation data returned
deactivate Database
User Model-->Reservation Limit API: User reservation data returned
deactivate User Model
Reservation Limit API-->Media Reservation API: User eligible for reservation
deactivate Reservation Limit API
Media Reservation API->Reservation Model: Store reservation details
activate Reservation Model
Reservation Model->Database: Store reservation in DB
Database-->Reservation Model: Reservation stored
Reservation Model-->Media Reservation API: Reservation stored
deactivate Reservation Model
Media Reservation API-->Reservation Controller: Reservation success
deactivate Media Reservation API
Reservation Controller-->Reservation Page: Confirm reservation
deactivate Reservation Controller
Reservation Page-->User: Reservation confirmed

deactivate Reservation Page
note over Reservation Page, User: Reservation successful

alt Media Not Available at Selected Branch
Reservation Controller->Media Reservation API: Check media availability at other branches
activate Media Reservation API
Media Reservation API->Branch Model: Fetch branch data
activate Branch Model
Branch Model->Database: Query branch availability from DB
Database-->Branch Model: Branch availability data returned
Branch Model-->Media Reservation API: Media availability at alternative branches
deactivate Branch Model
Media Reservation API-->Reservation Controller: Suggest alternative branches
deactivate Media Reservation API
Reservation Controller-->Reservation Page: Suggest alternatives or waitlist
User->Reservation Page: Choose alternative branch or join waitlist
activate Reservation Page
Reservation Page->Reservation Controller: Submit updated reservation/waitlist

activate Reservation Controller
Reservation Controller->Media Reservation API: Process updated request
activate Media Reservation API
Media Reservation API->Reservation Model: Store updated reservation/waitlist
activate Reservation Model
Reservation Model->Database: Store updated reservation in DB
Database-->Reservation Model: Data stored
Reservation Model-->Media Reservation API: Update success
deactivate Reservation Model
Media Reservation API-->Reservation Controller: Update success
deactivate Reservation Controller
deactivate Media Reservation API
activate Reservation Controller
Reservation Controller-->Reservation Page: Confirm update
deactivate Reservation Page
deactivate Reservation Controller
end

alt Reservation Limit Exceeded
Reservation Controller->Media Reservation API: Check reservation limits
activate Media Reservation API
Media Reservation API->Reservation Limit API: Validate user limit
activate Reservation Limit API
Reservation Limit API->User Model: Fetch user’s reservation data
activate User Model
User Model->Database: Query user reservation data from DB
activate Database
Database-->User Model: User data returned
deactivate Database
User Model-->Reservation Limit API: User data returned
deactivate User Model
Reservation Limit API-->Media Reservation API: Limit exceeded
deactivate Reservation Limit API
Media Reservation API-->Reservation Controller: Reservation limit reached
deactivate Media Reservation API
Reservation Controller-->Reservation Page: Display limit exceeded message
User->Reservation Page: Cancel reservation or try later
end
