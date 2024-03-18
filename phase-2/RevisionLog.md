# Revision Log
-----------------------------------------------------------------------------------------------------------

1.) **Use Case Diagram**

1.1 Removed include relationship and use case named `"Select specific date, time, and capacity"` from the use case diagram
    
    : This use case has been removed because it has now been integrated into the same scenario as the `"Book workspaces"` use case.
 
1.2 Changed use case named `"Edit, update, and suspending profiles"` to `"Manage Customer Profile"`
    
    : This modification has been made to consolidate the functionalities of editing, updating, and suspending profiles
    into a single scenario, which is now represented by the `"User Account Management"` use case.
 
1.3 Changed use case named `"Can add, delete, and manage employee information"` to `"Employee Management"`
    
    : This modification has been made to consolidate the functionalities of add, delete, and manage employee information
    into a single scenario, which is now represented by the `"Employee Management"` use case.
 
1.4 Changed use case named `"Refund and Cancel"` to `"Cancel Booking"`
    
    : This modification has been made to consolidate the functionalities of cancel and booking into a single scenario, which is now represented by the `"Cancel Booking"` use case."
 
1.5 Added use case named `"Registration (Employee)"` to the use case diagram
    
    : This use case has been added to the diagram to add Registration function for Employee Account.
 
1.6 Combined use case named `"View the Total Revenue"` and `"Be able to customize Reports and Analytics"` into one use case named `"Manage Revenue"`
    
    : This modification has been made to consolidate the functionalities of view payment record, get total revenue, and view revenue report into a single use case, which is now represented by `"Manage Revenue"`.
 
1.7 Added use case named `"Manage detailed Information of Co-Working Space"` to the use case diagram
    
    : This use case has been added to the diagram to let the employee be able to add, edit, and delete Co-Working Space and manage stock.


-----------------------------------------------------------------------------------------------------------

2.) **Context Diagram / Data Flow Diagram Level 0**

2.1 Group External Entities `"Banking API"` and `"True Wallet"` together
    
    : This change is implemented because these two functionalities share identical input and output data flows.
 
2.2 Change External Entities named `"CCTV"` to `"CCTV System"`
    
    : This change is enacted to clarify that we are referring to the entire CCTV system and not just individual cameras, aligning with our data flow requirements.
 
2.3 Changes of data in `"Manager Employee"` Entity
    
    2.3.1 Combined "Total Revenue" with "Revenue Report" to form "Total Revenue Report"
          : Combined "Total Revenue" with "Revenue Report" to form "Total Revenue Report" to provide a unified view of revenue-related data.
 
    2.3.2 Added input "CCTV camera number, Date, Time" to the System
          : This data has been added to input fields for "CCTV camera number, Date, Time" to facilitate tracking of CCTV Footage.
 
    2.3.3 Added "Reservation Info" as an output from the System
          : This data has been added as an output to provide information on reservations.
    
    2.3.4 Added input "Registration Employee Info, Role, Username, Password"
          : This data has been added to manage employee account information.
    
    2.3.5 Added "Footage" output from the system
          : This data has been added to capture and share relevant video data.
 
2.4 Changes of data in `"Customer"` Entity
    
    2.4.1 Added output "Co-Working Space Details" from the System
          : This data has been added to provide customers with workspace information.
    
    2.4.2 Added output "Refund Status" from the System
          : This data has been added to communicate refund progress to customers.
 
    2.4.3 Added output "Payment Receipt" from the System
          : This data has been added to provide payment confirmation and documentation.
 
2.5 Changes of data in `"Email Authentication"` Entity
    
    2.5.1 Removed the output "Payment Info"
          : This data has been deleted as it was not relevant to the email authentication.
 
    2.5.2 Removed the output "User Verification"
          : This data has been deleted as it was not relevant to the email authentication for registration.
 
2.6 Changes of data in `"Employee"` Entity
    
    2.6.1 Added input and output "Co-working space details" to/from the System
          : This data has been added to combine it with the "Available Stock Item" to show information of Co-working.
 
    2.6.2 Added input and output "Update Co-working space Info" to/from the System
          : This data has been added to capture changes in stock item availability.
 
    2.6.3 Added "Footage" output from the system
          : This data has been added to capture and share relevant video data.
 
    2.6.4 Added input "CCTV camera number, Date, Time" to the System
          : This data has been added to input fields for "CCTV camera number, Date, Time" to facilitate tracking of CCTV Footage.
 
    2.6.5 Added "CCTV Location(Room, Floor)" output from the system
          : This data has been added to ask for Room and Floor of the wanted footage.
 
2.7 Changes of data in `"CCTV System"` Entity
    
    2.7.1 Removed the output "Staff Identification"
          : This data has been deleted as it was not needed for the CCTV System to identify anything.
 
    2.7.2 Changed "Username, Password" to "Request access Output"
          : This modification has been made to better represent the purpose of this system's output to the CCTV System.
 
2.8 Changes of data in `"Credit Card / Mastercard"` Entity
    
    2.8.1 Removed the output "Cancel Request"
          : This data has been deleted as it was not relevant to "Credit Card / Mastercard" Entity.
 
    2.8.2 Combined "Card Number, Name, Expired Month/Year, CVV" with "Payment Info"
          : This modification has been made to simplify and consolidate payment-related data.
 
    2.8.3 Removed the input "Refund Info"
          : This data has been deleted as it was not relevant to "Credit Card / Mastercard" Entity.
 
    2.8.4 Added input "Verification Status" to the system
          : This data has been added to support card verification processes.
 
2.9 Changes of data in `"Banking API and True Wallet"` Entity
    
    2.9.1 Removed the output "Cancel Request"
          : This data has been deleted as it was not relevant to "Banking API and True Wallet" Entity.
    
    2.9.2 Removed the input "Refund Info"
          : This data has been deleted as it was not relevant to "Credit Card / Mastercard" Entity.
 
    2.9.3 Added input "OTP" to the system
          : This data has been added to reflect the use of OTPs in the banking API and True Wallet processes.
