package bitcamp.myapp.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.Qna;

@Mapper
public interface QnaDao {
  void insert(Qna q);
  List<Qna> findAll();
  List<Qna> allQna();
  Qna findByNo(int no);
  Qna get(int no);
  Qna findByEmailAndPassword(Map<String,Object> params);
  Qna findByEmail(String email);
  int update(Qna q);
  int delete(int no);


}







