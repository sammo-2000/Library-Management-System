title UC-006 - Cancel Reservation

actor Library Member
boundary Reservations Page
control ReservationController
participant ReservationService
entity Reservation Model
database Reservation Database

activate Library Member
Library Member->Reservations Page:Chooses cancel reservation\n
activate Reservations Page
Reservations Page->ReservationController:DELETE /api/reservation/:id

activate ReservationController
ReservationController->ReservationService:remove()
activate ReservationService
ReservationService->ReservationService:findOne()
alt The user has a reservation
ReservationService->Reservation Model:delete()
activate Reservation Model
Reservation Model->Reservation Database:Deletes from database
activate Reservation Database
Reservation Model<<--Reservation Database:returns response to delete query
deactivate Reservation Database
ReservationService<<--Reservation Model:returns reservation that was deleted
deactivate Reservation Model
ReservationController<<--ReservationService:returns reservation that was deleted
Reservations Page<<--ReservationController:returns successful response
Library Member<-Reservations Page:Removes reservation from UI
else The user doesn't have a reservation
ReservationController<<--ReservationService:throws new NotFoundException()
deactivate ReservationService
Reservations Page<<--ReservationController:returns 404 response
deactivate ReservationController
Library Member<-Reservations Page:Displays error message
deactivate Reservations Page
end
