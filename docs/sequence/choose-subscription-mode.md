title UC-001 - Choose Subscription

actor User
boundary Choose Subscription Page
boundary Payment success Page
boundary Payment cancel Page
boundary Payment Page
control Payment Controller
database Subscription Database
actor Payment Provider

activate User
User->Choose Subscription Page:User click subscription plan
activate Choose Subscription Page
alt User is not logged on
User<-Choose Subscription Page:Redirect to login page
else User is logged on
Choose Subscription Page->Payment Controller:Send plan & user info
activate Payment Controller
Payment Controller->Payment Controller:Validate data received
Payment Controller->Subscription Database:getUserById() get users status
activate Subscription Database
Payment Controller<-Subscription Database:Return user status
deactivate Subscription Database
alt User has active subscription
Choose Subscription Page<-Payment Controller:User already have an active subscription
User<-Choose Subscription Page:Display toast with error
else User does not has active subscription
Payment Controller->Payment Provider:Create payment session
activate Payment Provider
Payment Controller<-Payment Provider:Return session ID
deactivate Payment Provider
Choose Subscription Page<-Payment Controller:Return session ID
deactivate Payment Controller
Choose Subscription Page->Payment Page:Redirect to payment page
deactivate Choose Subscription Page
activate Payment Page
Payment Page->Payment Provider:Process paymeny
activate Payment Provider
deactivate Payment Page
alt Paymeny successful
Payment success Page<-Payment Provider:Redirect to payment success page
activate Payment success Page
User<-Payment success Page:Display page
deactivate Payment success Page
Payment Controller<-Payment Provider:Call web hook to update user status
activate Payment Controller
Payment Controller->Subscription Database:Update user status
deactivate Payment Controller
activate Subscription Database
else Paymeny unsuccessful
deactivate Subscription Database
Payment cancel Page<-Payment Provider:Redirect to payment cancel page
deactivate Payment Provider
activate Payment cancel Page
User<-Payment cancel Page:Display page
deactivate Payment cancel Page
end
end
end