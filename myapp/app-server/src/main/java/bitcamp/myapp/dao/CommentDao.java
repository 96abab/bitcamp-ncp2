package bitcamp.myapp.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.Comment;

@Mapper
public interface CommentDao {
  void insert(Comment comment);
  List<Comment> findAll(int boardNo);
  List<Comment> findAll(String keyword);
  Comment findByNo(int boardNo);
  Comment findByEmailAndPassword(Map<String,Object> params);
  Comment findByEmail(String email);
  int update(Comment b);
  int delete(int no);
}























