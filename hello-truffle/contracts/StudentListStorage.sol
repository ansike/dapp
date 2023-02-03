// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract StudentListStorage {
    struct Student {
        uint256 id;
        string name;
        uint256 age;
    }
    Student[] public StudentList;

    function addList(string memory _name, uint256 _age)
        public
        returns (uint256)
    {
        uint256 index = StudentList.length + 1;
        StudentList.push(Student(index, _name, _age));
        return StudentList.length;
    }

    function getList() public view returns (Student[] memory) {
        return StudentList;
    }
}
