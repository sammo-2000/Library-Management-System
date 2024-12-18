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
    DB -> Server: No user found
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
