title UC-005 - Media Search

actor Guest
boundary Media Search Page
participant MediaRoutes
control MediaController
participant MediaService
entity Media (Model)
database Inventory Database
activate Guest
Guest->Media Search Page:Clicks Search
activate Media Search Page
Media Search Page->MediaRoutes:GET /api/media
activate MediaRoutes
MediaRoutes->MediaController:getAllMedia()
activate MediaController
deactivate MediaRoutes
MediaController->MediaService:getAllMedia()
activate MediaService
MediaService->Media (Model):findAndCountAll()
activate Media (Model)
Media (Model)->Inventory Database:Queries Database
activate Inventory Database
Media (Model)<<--Inventory Database:returns response to query
deactivate Inventory Database
MediaService<<--Media (Model):returns {rows: Media[], count: number}
deactivate Media (Model)
MediaController<<--MediaService:returns {media: Media[], total: number}
deactivate MediaService
Media Search Page<<--MediaController:Returns Response
deactivate MediaController
alt The response contains media
Guest<<--Media Search Page:Displays Media

else The response has an empty array for media
Guest<<--Media Search Page:Displays "No matching media"
deactivate Media Search Page
end
