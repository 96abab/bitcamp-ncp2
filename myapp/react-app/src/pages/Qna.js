import React, { useState } from "react";
import axios from "axios";
import "./css/Qna.css";
import QnaBoard from "./QnaBoard";

const Qna = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [qnaList, setQnaList] = useState([]);
  const [showContent, setShowContent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    axios
      .post("http://localhost:8080/web/qnas", formData, {})
      .then((response) => {
        const result = response.data;
        if (result.status === "success") {
          setQnaList([...qnaList, { title, content }]);
          setTitle("");
          setContent("");
          setShowModal(false);
        } else {
          alert("입력 실패!");
        }
      })
      .catch((exception) => {
        alert("입력 중 오류가 발생했습니다.");
      });
  };

  const handleToggleContent = (index) => {
    if (showContent === index) {
      setShowContent(null);
    } else {
      setShowContent(index);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={openModal} className="open-modal-btn">FAQ 추가</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <form onSubmit={handleSubmit} className="faq-form">
              <div>
                <label htmlFor="title">제목: </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="content">내용: </label>
                <input
                  id="content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  required
                ></input>
              </div>
              <button type="submit">FAQ 추가</button>
            </form>
          </div>
        </div>
      )}
      <div className="qna-list">
        <h2>입력된 내용 목록</h2>
        <ul>
          <QnaBoard />
        </ul>
      </div>
    </>
  );
};

export default Qna;
