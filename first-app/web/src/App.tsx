import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import StudentListStorage from "./StudentListStorage.json";

const web3 = new Web3(
  (window as any).web3.currentProvider || "http://localhost:8545"
);

const contract = new web3.eth.Contract(
  StudentListStorage.abi as any,
  "0x67886Dc2cc0A6a5314d1331dE3063D663Da05c5d"
);

console.log(web3, contract)
function App() {
  const [name, setName] = useState<string>();
  const [age, setAge] = useState<string>();
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    getStudentList();
  }, []);

  const submit = async () => {
    const accounts = await web3.eth.requestAccounts();
    await contract.methods.setList(name, age).send({ from: accounts[0] });
    getStudentList();
  };

  const getStudentList = async () => {
    const studentList = await contract.methods.getList().call();
    console.log(studentList);
    
    setStudentList(studentList);
  };
  const deleteStudent = async (index: number) => {
    const accounts = await web3.eth.requestAccounts();
    await contract.methods.remove(index).send({ from: accounts[0] });
    getStudentList();
  };

  return (
    <div className="App">
      <div className="form" style={{ margin: 20 }}>
        <label htmlFor="name">name：</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="age" style={{ marginLeft: 10 }}>
          age：
        </label>
        <input
          id="age"
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={submit}>submit</button>
      </div>
      <div className="studentList">
        {studentList.map((student, index) => {
          const { id, name, age, account } = student;
          return (
            <div key={index}>
              {id}-{name}-{age}-{account}{" "}
              <span onClick={() => deleteStudent(index)}>删除</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
