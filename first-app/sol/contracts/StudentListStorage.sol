// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract StudentListStorage {
    struct Student {
        uint256 id;
        string name;
        uint256 age;
        address account;
    }
    Student[] public StudentList;

    function setList(string memory _name, uint256 _age)
        public
        returns (uint256)
    {
        StudentList.push(
            Student(StudentList.length + 1, _name, _age, msg.sender)
        );
        return StudentList.length;
    }

    function remove(uint256 index) public returns (Student[] memory) {
        if (index >= StudentList.length) return StudentList;
        for (uint256 i = index; i < StudentList.length - 1; i++) {
            StudentList[i] = StudentList[i + 1];
        }
        StudentList.pop();
        return StudentList;
    }

    function getList() public view returns (Student[] memory) {
        return StudentList;
    }
}
