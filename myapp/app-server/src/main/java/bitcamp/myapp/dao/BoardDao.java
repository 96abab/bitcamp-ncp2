package bitcamp.myapp.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import bitcamp.myapp.vo.Board;

@Mapper
public interface BoardDao {
  void insert(Board board);
  List<Board> findAll(String keyword);
  List<Board> findPeak(String keyword);
  List<Board> findNightMarket(String keyword);
  List<Board> findFirework(String keyword);
  List<Board> findDron(String keyword);
  Board findByNo(int no);
  void increaseViewCount(int no);
  int update(Board b);
  int delete(int no);

  void deleteLikes(int no);
  void deleteComments(int no);
  List<Board> findByUserId(@Param("keyword") String keyword, @Param("userId") int userId);
}























