// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Attende {
    struct globalActivity {
        string name;
        uint256 time;
        string operation;
        string image;
    }
    globalActivity[] public globalActivityArray;

    function ARRAYgetGlobalActivity()
        public
        view
        returns (globalActivity[] memory)
    {
        return globalActivityArray;
    }

    // ====================*****================ok
    struct activity {
        uint256 time;
        string operation;
        string image;
    }
    struct penalty {
        uint256 time;
        string operation;
    }
    struct Employee {
        string name;
        string status;
        bool exists;
        uint256 penalty;
        bool requestedLateEntry;
        bool lateEntryPenaltyPaid;
        bool requestedEarlyExit;
        bool earlyExitPenaltyPaid;
        activity[] activityHistory;
        penalty[] penaltyHistory;
        uint256 lastEntry;
        uint256 lastExit;
    }
    mapping(address => Employee) public employees;
    // ====================*****================ok
    address public admin;
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function.");
        _;
    }
    // ====================*****================ok
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    // ====================*****================ok
    function getbalance() public view returns (uint256) {
        return address(this).balance;
    }

    // ====================*****================ok
    function payether() public payable {}

    // ====================*****================ok
    constructor() {
        admin = msg.sender;
        employees[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2].name = "ali";
        employees[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2].status = "home";
        employees[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2].exists = true;
        employees[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2].penalty = 0;
        employees[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2]
            .requestedLateEntry = false;
        employees[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2]
            .lateEntryPenaltyPaid = false;
        employees[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2]
            .requestedEarlyExit = false;
        employees[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2]
            .earlyExitPenaltyPaid = false;
        employees[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2].lastEntry = 0;
        employees[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2].lastExit = 0;
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266].name = "shrey";
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266].status = "home";
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266].exists = true;
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266].penalty = 0;
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .requestedLateEntry = false;
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .lateEntryPenaltyPaid = false;
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .requestedEarlyExit = false;
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .earlyExitPenaltyPaid = false;
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266].lastEntry = 0;
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266].lastExit = 0;
        // ===============================================================================================
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .activityHistory
            .push(
                activity({
                    time: 123,
                    operation: "enter",
                    image: "https://user-images.githubusercontent.com/76216765/183026274-ea00fea9-4767-405e-86d3-cf06316d4483.png"
                })
            );
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .activityHistory
            .push(
                activity({
                    time: 456,
                    operation: "leave",
                    image: "https://user-images.githubusercontent.com/76216765/183026274-ea00fea9-4767-405e-86d3-cf06316d4483.png"
                })
            );
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .activityHistory
            .push(
                activity({
                    time: 789,
                    operation: "enterwithpenalty",
                    image: "https://user-images.githubusercontent.com/76216765/183026274-ea00fea9-4767-405e-86d3-cf06316d4483.png"
                })
            );
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .activityHistory
            .push(
                activity({
                    time: 101112,
                    operation: "leavewithpenalty",
                    image: "https://user-images.githubusercontent.com/76216765/183026274-ea00fea9-4767-405e-86d3-cf06316d4483.png"
                })
            );
        // ===========================penalty
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .penaltyHistory
            .push(
                penalty({time: 101112, operation: "LateEntryPenaltyApproved"})
            );
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .penaltyHistory
            .push(
                penalty({time: 131415, operation: "EarlyExitPenaltyApproved"})
            );
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .penaltyHistory
            .push(penalty({time: 151617, operation: "LateEntryPenaltyPaid"}));
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .penaltyHistory
            .push(penalty({time: 181920, operation: "PayEarlyPenaltyPaid"}));
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .penaltyHistory
            .push(
                penalty({time: 212223, operation: "LateEntryPenaltyRequested"})
            );
        employees[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]
            .penaltyHistory
            .push(
                penalty({time: 242526, operation: "EarlyExitPenaltyRequested"})
            );
        // ===============================================================================================
        globalActivityArray.push(
            globalActivity({
                name: "shrey1",
                time: 12,
                operation: "leavewithpenalty",
                image: "https://user-images.githubusercontent.com/76216765/183026274-ea00fea9-4767-405e-86d3-cf06316d4483.png"
            })
        );
        globalActivityArray.push(
            globalActivity({
                name: "shrey2",
                time: 34,
                operation: "EarlyExitPenaltyRequested",
                image: "https://user-images.githubusercontent.com/76216765/183026274-ea00fea9-4767-405e-86d3-cf06316d4483.png"
            })
        );
        globalActivityArray.push(
            globalActivity({
                name: "shrey3",
                time: 56,
                operation: "EarlyExitPenaltyApproved",
                image: "https://user-images.githubusercontent.com/76216765/183026274-ea00fea9-4767-405e-86d3-cf06316d4483.png"
            })
        );
        globalActivityArray.push(
            globalActivity({
                name: "shrey4",
                time: 78,
                operation: "LateEntryPenaltyApproved",
                image: "https://user-images.githubusercontent.com/76216765/183026274-ea00fea9-4767-405e-86d3-cf06316d4483.png"
            })
        );
        globalActivityArray.push(
            globalActivity({
                name: "shrey5",
                time: 910,
                operation: "leave",
                image: "https://user-images.githubusercontent.com/76216765/183026274-ea00fea9-4767-405e-86d3-cf06316d4483.png"
            })
        );
        globalActivityArray.push(
            globalActivity({
                name: "shrey6",
                time: 1112,
                operation: "enter",
                image: "https://user-images.githubusercontent.com/76216765/183026274-ea00fea9-4767-405e-86d3-cf06316d4483.png"
            })
        );
        globalActivityArray.push(
            globalActivity({
                name: "shrey7",
                time: 1314,
                operation: "leavewithpenalty",
                image: "https://user-images.githubusercontent.com/76216765/183026274-ea00fea9-4767-405e-86d3-cf06316d4483.png"
            })
        );
        // ===============================================================================================
    }

    // ====================*****================ok
    function getStartOfWork() public pure returns (uint256) {
        return 1676773800; // February 17, 2023 8:00:00 AM (UTC)
    }

    function checkUser(address add) public view returns (bool) {
        return employees[add].exists;
    }

    function getuser(address add) public view returns (Employee memory) {
        return employees[add];
    }

    // ====================*****================ok
    function addEmployee(address employeeAddress, string memory name) public {
        require(msg.sender == admin, "Only admin can add an employee.");
        require(!employees[employeeAddress].exists, "Employee already exists.");
        employees[employeeAddress].name = name;
        employees[employeeAddress].status = "home";
        employees[employeeAddress].exists = true;
        employees[employeeAddress].penalty = 0;
        employees[employeeAddress].requestedLateEntry = false;
        employees[employeeAddress].lateEntryPenaltyPaid = false;
        employees[employeeAddress].requestedEarlyExit = false;
        employees[employeeAddress].earlyExitPenaltyPaid = false;
        employees[employeeAddress].lastEntry = 0;
        employees[employeeAddress].lastExit = 0;
    }

    // ====================*****================ok
    function removeEmployee(address employeeAddress) public {
        require(msg.sender == admin, "Only admin can remove an employee.");
        require(employees[employeeAddress].exists, "Employee does not exist.");
        delete employees[employeeAddress];
    }

    // ====================*****================
    function approveLateEntryRequest(address employeeAddress) public {
        uint256 time = block.timestamp;
        require(
            msg.sender == admin,
            "Only admin can approve late entry requests."
        );
        Employee storage employee = employees[employeeAddress];
        require(employee.exists, "Employee not found.");
        require(
            employee.requestedLateEntry,
            "Employee did not request late entry."
        );
        employee.penaltyHistory.push(
            penalty({time: time, operation: "LateEntryPenaltyApproved"})
        );
        globalActivityArray.push(
            globalActivity({
                name: employee.name,
                time: time,
                operation: "LateEntryPenaltyApproved",
                image: "notuploaded"
            })
        );
        employee.requestedLateEntry = true;
    }

    // ====================*****================
    function approveEarlyExitRequest(address employeeAddress) public {
        uint256 time = block.timestamp;
        require(
            msg.sender == admin,
            "Only admin can approve early exit requests."
        );
        Employee storage employee = employees[employeeAddress];
        require(employee.exists, "Employee not found.");
        require(
            employee.requestedEarlyExit,
            "Employee did not request early exit."
        );
        employee.penaltyHistory.push(
            penalty({time: time, operation: "EarlyExitPenaltyApproved"})
        );
        globalActivityArray.push(
            globalActivity({
                name: employee.name,
                time: time,
                operation: "EarlyExitPenaltyApproved",
                image: "notuploaded"
            })
        );
        employee.lateEntryPenaltyPaid = true;
    }

    // ====================*****================
    function ARRAYgetEmployeeActivity(address employeeAddress)
        public
        view
        returns (activity[] memory)
    {
        Employee memory emp = employees[employeeAddress];
        require(emp.exists, "Employee not found.");
        return emp.activityHistory;
    }

    // ====================*****================
    function ARRAYgetEmployeePenalty(address employeeAddress)
        public
        view
        returns (penalty[] memory)
    {
        Employee memory emp = employees[employeeAddress];
        require(emp.exists, "Employee not found.");
        return emp.penaltyHistory;
    }

    // ====================*****================
    function enter(string memory url1) public payable {
        Employee storage employee = employees[msg.sender];
        require(employee.exists, "Employee not found.");
        uint256 entryTime = block.timestamp;
        if (entryTime <= getStartOfWork()) {
            employee.status = "office";
            employee.activityHistory.push(
                activity({time: entryTime, operation: "enter", image: url1})
            );
            globalActivityArray.push(
                globalActivity({
                    time: entryTime,
                    name: employee.name,
                    operation: "enter",
                    image: url1
                })
            );
            employee.lastEntry = entryTime;
        } else {
            require(
                employee.requestedLateEntry,
                "Late entry has not been requested."
            );
            employee.penalty += 2;
            require(
                employee.lateEntryPenaltyPaid,
                "Late entry penalty has not been paid."
            );
            employee.status = "office";
            employee.activityHistory.push(
                activity({
                    time: entryTime,
                    operation: "enterwithpenalty",
                    image: url1
                })
            );
            globalActivityArray.push(
                globalActivity({
                    time: entryTime,
                    name: employee.name,
                    operation: "enterwithpenalty",
                    image: url1
                })
            );
            employee.lastEntry = entryTime;
            employee.requestedLateEntry = false;
            employee.lateEntryPenaltyPaid = false;
        }
    }

    // ====================*****================
    function leave(string memory url1) public payable {
        Employee storage employee = employees[msg.sender];
        require(employee.exists, "Employee not found.");
        uint256 exitTime = block.timestamp;
        if (exitTime >= getStartOfWork() + 10 hours) {
            employee.status = "home";
            employee.activityHistory.push(
                activity({time: exitTime, operation: "leave", image: url1})
            );
            globalActivityArray.push(
                globalActivity({
                    time: exitTime,
                    name: employee.name,
                    operation: "leave",
                    image: url1
                })
            );
            employee.lastExit = exitTime;
        } else {
            require(
                employee.requestedEarlyExit,
                "Early exit has not been requested."
            );
            employee.penalty += 2;
            require(
                employee.lateEntryPenaltyPaid,
                "Early exit penalty has not been paid."
            );
            employee.status = "home";
            employee.activityHistory.push(
                activity({
                    time: exitTime,
                    operation: "leavewithpenalty",
                    image: url1
                })
            );
            globalActivityArray.push(
                globalActivity({
                    time: exitTime,
                    name: employee.name,
                    operation: "leavewithpenalty",
                    image: url1
                })
            );
            employee.lastExit = exitTime;
            employee.requestedEarlyExit = false;
            employee.lateEntryPenaltyPaid = false;
        }
    }

    // ====================*****================
    function payLateEntryPenalty(string memory url1) public payable {
        uint256 paytime = block.timestamp;
        Employee storage employee = employees[msg.sender];
        require(employee.exists, "Employee not found.");
        require(employee.penalty == 0, "No penalty to pay.");
        require(
            !employee.lateEntryPenaltyPaid,
            "Late entry penalty already paid."
        );
        // payable(owner).transfer(2 ether);
        // employee.lateEntryPenaltyPaid = true;
        employee.lateEntryPenaltyPaid = true;
        employee.penaltyHistory.push(
            penalty({time: paytime, operation: "LateEntryPenaltyPaid"})
        );
        employee.activityHistory.push(
            activity({
                time: paytime,
                operation: "payLateEntryPenalty",
                image: url1
            })
        );
        globalActivityArray.push(
            globalActivity({
                time: paytime,
                name: employee.name,
                operation: "payLateEntryPenalty",
                image: url1
            })
        );
    }

    // ====================*****================
    function payEarlyExitPenalty(string memory url1) public payable {
        uint256 paytime = block.timestamp;
        Employee storage employee = employees[msg.sender];
        require(employee.exists, "Employee not found.");
        require(employee.penalty == 0, "No penalty to pay.");
        require(
            !employee.earlyExitPenaltyPaid,
            "Early exit penalty already paid."
        );
        // employee.earlyExitPenaltyPaid = true;
        // payable(owner).transfer(2 ether);
        employee.earlyExitPenaltyPaid = true;
        employee.activityHistory.push(
            activity({
                time: paytime,
                operation: "payEarlyExitPenalty",
                image: url1
            })
        );
        employee.penaltyHistory.push(
            penalty({time: paytime, operation: "PayEarlyPenaltyPaid"})
        );
        globalActivityArray.push(
            globalActivity({
                time: paytime,
                name: employee.name,
                operation: "payEarlyExitPenalty",
                image: url1
            })
        );
    }

    // ====================*****================
    event LateEntryRequested(address employee);

    function requestLateEntry() public {
        uint256 requesttime = block.timestamp;
        Employee storage employee = employees[msg.sender];
        require(employee.exists, "Employee not found.");
        require(!employee.requestedLateEntry, "Late entry already requested.");
        employee.requestedLateEntry = true;
        employee.penaltyHistory.push(
            penalty({time: requesttime, operation: "LateEntryPenaltyRequested"})
        );
         globalActivityArray.push(
                globalActivity({
                    name: employee.name,
                    time: requesttime,
                    operation: "LateEntryPenaltyRequested",
                    image: "notuploaded"
                })
            );
        emit LateEntryRequested(msg.sender);
    }

    // ====================*****================
    event EarlyExitRequested(address employee);

    function requestEarlyExit() public {
        uint256 requesttime = block.timestamp;
        Employee storage employee = employees[msg.sender];
        require(employee.exists, "Employee not found.");
        require(!employee.requestedEarlyExit, "Early exit already requested.");
        employee.requestedEarlyExit = true;
        employee.penaltyHistory.push(
            penalty({time: requesttime, operation: "EarlyExitPenaltyRequested"})
        );
        globalActivityArray.push(
                globalActivity({
                    name: employee.name,
                    time: requesttime,
                    operation: "EarlyExitPenaltyRequested",
                    image: "notuploaded"
                })
            );
        emit EarlyExitRequested(msg.sender);
    }
}
