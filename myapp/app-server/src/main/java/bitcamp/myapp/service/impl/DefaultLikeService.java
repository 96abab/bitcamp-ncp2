package bitcamp.myapp.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.myapp.dao.LikeDao;
import bitcamp.myapp.service.LikeService;
import bitcamp.myapp.vo.Like;

@Service
public class DefaultLikeService implements LikeService {

  @Autowired private LikeDao likeDao;

  @Transactional
  @Override
  public void addLike(Like like) {
    likeDao.insertLike(like);
  }

  @Override
  public List<Like> getLikes(int boardId) {
    return likeDao.findLikesByPostId(boardId);
  }

  @Transactional
  @Override
  public void removeLike(Like like) {
    if (likeDao.deleteLike(like) == 0) {
      throw new RuntimeException("좋아요가 존재하지 않습니다!");
    }
  }
}