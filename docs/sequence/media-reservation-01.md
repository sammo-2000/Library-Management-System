title UC-004 (1) - Media Reservation

actor User
boundary Catalog Search Page
control Search Controller
participant Media Search API
entity Media Model
database Database

activate User
 User->Catalog Search Page:Search for media
activate Catalog Search Page
Catalog Search Page->Search Controller: Submit search request
activate Search Controller
Search Controller->Media Search API: Process search request
activate Media Search API
Media Search API->Media Model: Retrieve media availability
activate Media Model
Media Model->Database: Query media availability from DB
activate Database
Database-->Media Model: Media availability returned
deactivate Database
Media Model-->Media Search API: Media availability retrieved

deactivate Media Model
Media Search API-->Search Controller: Return search results

deactivate Media Search API
Search Controller-->Catalog Search Page:Display media availability to user

deactivate Catalog Search Page
deactivate Search Controller

