import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/QnaBoard.css";

const QnaBoard = () => {
  const [nickName, setNickName] = useState(null);
  const [createDate, setCreateDate] = useState(null);
  const [no, setNo] = useState(null);
  const [viewCount, setViewCount] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [showContent, setShowContent] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/web/qnas");
      const result = response.data;
      if (result.status === "success" && Array.isArray(result.data)) {
        setFaqs(result.data);
      } else {
        console.error("Error fetching FAQs: Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const handleToggleContent = (index) => {
    if (showContent === index) {
      setShowContent(null);
    } else {
      setShowContent(index);
    }
  };

  return (
    <div className="faq-board">
      <h1>FAQ 게시판</h1>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index} onClick={() => handleToggleContent(index)} className={showContent === index ? "open" : ""}>
            <h2>{faq.title}</h2>
            <p>{faq.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default QnaBoard;
