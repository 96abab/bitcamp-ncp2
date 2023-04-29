import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Membermanagement.css';

function Membermanagement() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(20);

  useEffect(() => {
    axios
      .get('http://localhost:8080/web/members/allMember')
      .then((response) => response.data)
      .then((result) => {
        if (result.status === 'success') {
          setMembers(result.data);
          console.log(result.data);
        } else {
          // handle error
        }
      })
      .catch((error) => {
        // handle error
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = (no) => {
    axios
      .delete(`http://localhost:8080/web/members/${no}`)
      .then((response) => response.data)
      .then((result) => {
        if (result.status === 'success') {
          console.log(result);
          setMembers((prevMembers) =>
            prevMembers.filter((member) => member.no !== no)
          );
        } else {
          // handle error
        }
      })
      .catch((error) => {
        // handle error
      });
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className='Membermanagement-box'>
      <h2>회원 목록</h2>
      <input
        type='text'
        value={search}
        onChange={handleSearchChange}
        placeholder='회원 검색...'
      />
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>이메일</th>
            <th>닉네임</th>
            <th>전화번호</th>
            <th>생성일</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member, index) => (
            <tr key={member.no}>
              <td>{indexOfFirstMember + index + 1}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.nickName}</td>
              <td>{member.tel}</td>
              <td>{member.createdDate}</td>

              <td>
                <button onClick={() => handleDelete(member.no)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='Membermanagement-pagination'>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Membermanagement;
