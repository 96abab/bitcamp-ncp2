import React, { useState } from "react";
import Gallerydetail from "./Gallerydetail";
import "./css/Galleryitem.css";
const GalleryItem = ({ item }) => {
  const [detailmodalOn, setdetailmodalOn] = useState(false);
  const [boarduserfilepath, setBoardUserFilepath] = useState(0)//.

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? `${diffDays}일 전` : '오늘';
  };

  const getData = (boarduserfilepath) => {
    setBoardUserFilepath(boarduserfilepath);
  }//.

  const handleClose = () => {
    setdetailmodalOn(false);
  };

  // console.log(boarduserfilepath.filepath,"아이템 보드유저패쓰");

// console.log(item.comment.commetNo);
const defaultProfile = "/img/defaultprofile.jpg";
return (
  <div key={item.no}>
    <table className="gall-list-table" id={`board-table-${item.no}`} border="1">
      <tbody>
        <tr>
          <td>
            <div className="gall-div-detail-box">
              <div className="gall-img-wrap">
                <img className="gall-img-profile" src={boarduserfilepath.filepath ? boarduserfilepath.filepath : defaultProfile}></img>
                <Gallerydetail boarduserfilepath={boarduserfilepath} getData={getData}></Gallerydetail>
              </div>
    
              <div className="gall-writer-wrap">
                <p>{item.writer.name}</p>
              </div>
              <div className="gall-like-img"></div>
              <div className="gall-like-wrap">
                <p>{item.likes}</p>
              </div>
              <div className="gall-date-wrap">
                <p>{formatDate(item.createdDate)}</p>
              </div>
              <Gallerydetail
              show={detailmodalOn}
              onHide={handleClose}
              boardNo={item.no}
              userId={item.writer.no}
              viewCount={item.viewCount}
              getData={getData} // Add this line
              />
              <div
                className="gall-div-detail"
                onClick={() => setdetailmodalOn(true)}
              >
                <img className="gall-img" src={item.attachedFiles[0].filepath} />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
};

export default GalleryItem;