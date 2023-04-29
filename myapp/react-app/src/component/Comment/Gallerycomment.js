import React, { useState, useEffect, useContext,useRef } from 'react';
import "./css/Gallerycomment.css";
import axios from 'axios';
import Usercontext from '../../Usercontext';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Gallerycomment = ({ show, onHide, boardNo, dcontent, dtitle }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const user = useContext(Usercontext);
  const [profile, setProfile] = useState([]);
  const [iscommentusers, setIscommentusers] = useState([]);
  const [commentUserIds, setCommentUserIds] = useState([]);
  const [nickName, setNickName] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const commentsEndRef = useRef(null);
  const fetchComments = () => {
    return axios
      .get(`http://localhost:8080/web/comments/boardNo/${boardNo}`, { withCredentials: true })
      .then((response) => {
        const receivedComments = response.data.data;
        console.log(response.data.data);
        (response.data.data.some((item) => {
        }));
        const commentUserIds = receivedComments.map((item) => item.writer.no);
        const nickName = receivedComments.map((item) => item.writer.nickName);
        setCommentUserIds(commentUserIds);

        console.log(commentUserIds);
        console.log(nickName);
        if (Array.isArray(receivedComments)) {
          setComments(receivedComments);
          setNickName(nickName);
        } else {
          setComments([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    scrollToLatestComment();
  }, [comments]);

  const commentprofile = () => {
    Promise.all(
      commentUserIds.map((userId) =>
        axios.get(`http://localhost:8080/web/members/${userId}`)
      )
    )
      .then((responses) => {
        const profiles = responses.map((response) => {
          if (response.data.status === "success") {
            return response.data.data.attachedFiles[0].filepath;
          }
        });
        setNickName(nickName);
        setProfiles(profiles); // <-- 이 부분을 수정하세요.
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (commentUserIds.length > 0) {
      commentprofile();
    }
  }, [commentUserIds]);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    if (content.trim() !== "") {
      if (content.length <= 30) {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("boardNo", boardNo);

        axios
          .post("http://localhost:8080/web/comments", formData)
          .then((response) => {
            console.log(response.data);
            e.target.reset();
            fetchComments(); // 새 댓글이 추가된 후 댓글 목록을 업데이트
            commentprofile();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert("댓글은 30자 이하여야 합니다.");
      }
    } else {
      alert("댓글 내용을 입력해주세요.");
    }
  };

  const handleDeleteComment = (commentNo) => {
    axios
      .delete(`http://localhost:8080/web/comments/${commentNo}`, { withCredentials: true })
      .then((response) => {
        fetchComments();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditComment = (commentNo, content) => {
    setEditingCommentId(commentNo);
    setEditedContent(content);
  };

  const handleUpdateComment = (e, commentNo) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/web/comments/${commentNo}`, { content: editedContent }, { withCredentials: true })
      .then((response) => {
        setEditingCommentId(null);
        fetchComments();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const scrollToLatestComment = () => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <>
      <Modal show={show} onHide={onHide} className="gallery-comment-modal">
        <Modal.Body className="gallery-comment-modal-body">
          <div className="gallery-dcontent">
            {dcontent}
            {/* <div className='gallery-dtitle'>
              {dtitle}
            </div> */}
          </div>
          <div className="gcomment-list">
            {comments.map((comment, index) => (
              <div key={comment.no} className="comment-item">
                {editingCommentId === comment.no ? (
                  <form onSubmit={(e) => handleUpdateComment(e, comment.no)}>
                    <input
                      type="text"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button type="submit" className="comment-save"></button>
                    <button onClick={() => setEditingCommentId(null)} className="comment-cancel"></button>
                  </form>
                ) : (
                  <>
                    <div className="gprofile-img">
                      <img src={profiles[index]}></img>
                    </div>
                    <div className="gcomment-nickname">{nickName[index]}</div>
                    <div className='gcooment-content'>
                      {comment.content}
                    </div>
                    {user && user.no === comment.writer.no && (
                      <>
                        <button className="comment-update-btn" onClick={() => handleEditComment(comment.no, comment.content)}></button>
                        <button className="comment-delete-btn" onClick={() => handleDeleteComment(comment.no)}></button>
                      </>

                    )}
                  </>
                )}
              </div>
            ))}
            <div ref={commentsEndRef}></div>
          </div>
          <div className="gcomment-add">
            <form onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder="댓글 작성..."
                onChange={handleContentChange}
              />
              <button type="submit" className="comment-push-btn"></button>
            </form>
          </div>

        </Modal.Body>
      </Modal>
    </>
  );
};

export default Gallerycomment;
