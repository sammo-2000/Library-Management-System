title Library Management System - Authentication (Sign In)
actor Library Member
participant Server
participant Middleware
control Controller
database authentication-db

activate Library Member
Library Member -> Server: POST /api/signin {email, password}
activate Server
Server -> authentication-db: SELECT * FROM users WHERE email = $1
activate authentication-db
alt User not found
    authentication-db --> Server: No user found

    Server --> Library Member:  Invalid credential
    deactivate Server
else User found
    authentication-db --> Server: User data
    deactivate authentication-db
activate Server
    Server -> Middleware: bcrypt.compare(password, hashedPassword)
    activate Middleware
deactivate Server
    alt Password invalid
        Middleware --> Server: Password mismatch
activate Server
        Server --> Library Member: Invalid credential
        deactivate Server
    else Password valid
        Middleware --> Server: Password match
        deactivate Middleware
activate Server
        Server -> Middleware: jwt.sign({userId, role}, secret, expiresIn: 1h)
        activate Middleware
        Middleware --> Server: JWT Token
        deactivate Middleware
        Server --> Library Member: Sign-in successful! Redirecting...
        deactivate Server
    end
end