package bitcamp.myapp.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.Like;

@Mapper
public interface LikeDao {
  void insertLike(Like like);
  List<Like> findLikesByPostId(int boardId);
  Like findLikeByPostIdAndUserId(Like like);
  int deleteLike(Like like);
  int delete(int no);
}