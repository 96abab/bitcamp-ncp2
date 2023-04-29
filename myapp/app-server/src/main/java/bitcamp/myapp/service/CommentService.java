package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.Comment;

public interface CommentService {
  void add(Comment comment);
  List<Comment> list(int boardNo);
  List<Comment> list(String keyword);
  Comment get(int boardNo);
  Comment get(String email, String password);
  void update(Comment comment);
  void delete(int no);

}





