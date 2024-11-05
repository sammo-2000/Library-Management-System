title UC-005 (1) - Authenticate Member's Details

actor Branch Librarian/Call Centre Operator
boundary Member Authentication Page
control Authentication Controller
entity Authentication Model
database Database

activate Branch Librarian/Call Centre Operator
Branch Librarian/Call Centre Operator->Member Authentication Page:Enter member's details
activate Member Authentication Page
Member Authentication Page->Authentication Controller:Calls authentication service API
activate Authentication Controller
Authentication Controller->Authentication Model:Get member details
activate Authentication Model
Authentication Model->Database:Get member details
activate Database
Authentication Model<--Database:Return member details
deactivate Database
Authentication Model->Authentication Model:Authenticate member details
alt Successfully authenticated
Authentication Controller<--Authentication Model:Authentication success
Member Authentication Page<--Authentication Controller:Returns successful response and token

Branch Librarian/Call Centre Operator<--Member Authentication Page:Redirect to Member Actions Page
else Failed authentication
Authentication Controller<--Authentication Model:Authentication failed
deactivate Authentication Model
Member Authentication Page<--Authentication Controller:Returns failed response
deactivate Authentication Controller
Branch Librarian/Call Centre Operator<--Member Authentication Page:Display error message
deactivate Member Authentication Page

end
