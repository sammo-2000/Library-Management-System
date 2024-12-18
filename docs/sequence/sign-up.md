title Library Management System - Authentication (Sign Up)
actor Library Member
participant Server
participant Middleware
control Controller
database authentication-db

activate Library Member
Library Member -> Server: POST /api/register {user data}
activate Server
Server -> Middleware: validateToken 
activate Middleware
Middleware --> Server: Token valid/invalid
deactivate Middleware

alt Token invalid
    Server --> Library Member: 401 Unauthorized

else Token valid
    Server -> Controller: validate user permissions
     activate Controller
    Controller -> Middleware: authorizeRoles (e.g., Manager, Receptionist)
    activate Middleware
    Middleware --> Controller: Role authorized/unauthorized
    deactivate Middleware
    alt Role unauthorized
        Controller --> Library Member: 403 Forbidden
     else Role authorized
        Controller -> authentication-db: INSERT INTO users 
        activate authentication-db
        alt Insert successful
            authentication-db --> Controller: User added
            Controller --> Server: User registration successful   
            Server --> Library Member: 200 OK {message: "User registration successful"}
        else Insert failed
            authentication-db --> Controller: Error
            deactivate authentication-db
            Controller --> Server: Internal Server Error
            deactivate Controller
            Server --> Library Member: 500 Internal Server Error
            deactivate Server
        end
    end
end