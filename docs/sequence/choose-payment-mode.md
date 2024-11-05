title UC-001 - Choose Payment Mode

actor User
boundary Choose Payment Page
control User Controller
entity User Model
boundary Payment Page
control Payment Controller
database User Info Database
actor Payment Provider

activate User
User->Choose Payment Page:Request HTTPS page
activate Choose Payment Page
Choose Payment Page->User Controller:Check if user has active payment
activate User Controller
User Controller->User Model:Check user subscriptions status
activate User Model
User Model->User Info Database:Get user info
activate User Info Database
User Model<--User Info Database:Return user info
deactivate User Info Database
User Controller<--User Model:Return user subscription status
deactivate User Model
Choose Payment Page<--User Controller:Return user subscription status
deactivate User Controller
alt User has subscription
Choose Payment Page->Payment Controller:User choose new plan
activate Payment Controller
User Controller<-Payment Controller:Get user subscriptions status
activate User Controller
User Controller->User Model:Get user info
activate User Model
User Controller<--User Model:Return user info
deactivate User Model
User Controller-->Payment Controller:Return subscription status
deactivate User Controller
Payment Controller->Payment Controller:Add current subscription length into new subscription
else User has inactive subscription
Choose Payment Page->Payment Controller:Choose subscription plan
deactivate Choose Payment Page
end
Payment Controller->Payment Provider:Create payment session
activate Payment Provider
Payment Controller<--Payment Provider:Return payment session id
deactivate Payment Provider
User<--Payment Controller:Return payment session id
deactivate Payment Controller
User->Payment Page:Request HTTPS payment page with an ID
activate Payment Page
Payment Page->Payment Provider:Get payment session info
activate Payment Provider
Payment Page<--Payment Provider:Return payment info
deactivate Payment Provider
alt Payment successful
Payment Page->Payment Controller:Update user subscription length & status
activate Payment Controller
Payment Controller->User Info Database:Update user subscription length & status
activate User Info Database
Payment Page-->User:Display payment success page
deactivate Payment Controller
else Payment unsuccessful
deactivate User Info Database
Payment Page-->User:Display error success page
end
deactivate Payment Page
