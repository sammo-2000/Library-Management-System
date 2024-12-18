title Library Management System - Authentication and User Management

actor Library Member
participant Server as Backend API
participant Middleware
control Controller
database authentication-db
actor User
participant Server
database DB

User -> Server: POST /api/register {user data}
Server -> Middleware: validateToken 
Middleware -> Server: Token valid/invalid
alt Token invalid
    Server -> User: 401 Unauthorized
else Token valid
    Server -> Controller: validate user permissions
    Controller -> Middleware: authorizeRoles (e.g., Manager, Receptionist)
    Middleware -> Controller: Role authorized/unauthorized
    alt Role unauthorized
        Controller -> User: 403 Forbidden
    else Role authorized
        Controller -> DB: INSERT INTO users (hashed data)
        alt Insert successful
            DB -> Controller: User added
            Controller -> Server: User registration successful
            Server -> User: 200 OK {message: User registration successful}
        else Insert failed
            DB -> Controller: Error
            Controller -> Server: Internal Server Error
            Server -> User: 500 Internal Server Error
        end
    end
end

User -> Server: POST /api/signin {email, password}
Server -> DB: SELECT * FROM users WHERE email = $1
alt User not found
    DB -> Server: No user foundtitle Library Management System - Authentication and User Management

actor Library Member
participant Server as Backend API
participant Middleware
control Controller
database authentication-db as AuthDB

Library Member -> Server: POST /api/register {user data}
activate Server
Server -> Middleware: validateToken 
activate Middleware
Middleware --> Server: Token valid/invalid
deactivate Middleware

alt Token invalid
    Server --> Library Member: 401 Unauthorized
    deactivate Server
else Token valid
    Server -> Controller: validate user permissions
    activate Controller
    Controller -> Middleware: authorizeRoles (e.g., Manager, Receptionist)
    activate Middleware
    Middleware --> Controller: Role authorized/unauthorized
    deactivate Middleware
    alt Role unauthorized
        Controller --> Library Member: 403 Forbidden
        deactivate Controller
        deactivate Server
    else Role authorized
        Controller -> AuthDB: INSERT INTO users (hashed data)
        activate AuthDB
        alt Insert successful
            AuthDB --> Controller: User added
            deactivate AuthDB
            Controller --> Server: User registration successful
            deactivate Controller
            Server --> Library Member: 200 OK {message: "User registration successful"}
            deactivate Server
        else Insert failed
            AuthDB --> Controller: Error
            deactivate AuthDB
            Controller --> Server: Internal Server Error
            deactivate Controller
            Server --> Library Member: 500 Internal Server Error
            deactivate Server
        end
    end
end

Library Member -> Server: POST /api/signin {email, password}
activate Server
Server -> AuthDB: SELECT * FROM users WHERE email = $1
activate AuthDB
alt User not found
    AuthDB --> Server: No user found
    deactivate AuthDB
    Server --> Library Member: 401 Invalid email or password
    deactivate Server
else User found
    AuthDB --> Server: User data
    deactivate AuthDB
    Server -> Middleware: bcrypt.compare(password, hashedPassword)
    activate Middleware
    alt Password invalid
        Middleware --> Server: Password mismatch
        deactivate Middleware
        Server --> Library Member: 401 Invalid email or password
        deactivate Server
    else Password valid
        Middleware --> Server: Password match
        deactivate Middleware
        Server -> Middleware: jwt.sign({userId, role}, secret, expiresIn: 1h)
        activate Middleware
        Middleware --> Server: JWT Token
        deactivate Middleware
        Server --> Library Member: 200 OK {token: JWT Token, message: "Sign-in successful"}
        deactivate Server
    end
end

    Server -> User: 401 Invalid email or password
else User found
    DB -> Server: User data
    Server -> Middleware: bcrypt.compare(password, hashedPassword)
    alt Password invalid
        Middleware -> Server: Password mismatch
        Server -> User: 401 Invalid email or password
    else Password valid
        Middleware -> Server: Password match
        Server -> Middleware: jwt.sign({userId, role}, secret, expiresIn: 1h)
        Middleware -> Server: JWT Token
        Server -> User: 200 OK {token: JWT Token, message: "Sign-in successful"}
    end
end
