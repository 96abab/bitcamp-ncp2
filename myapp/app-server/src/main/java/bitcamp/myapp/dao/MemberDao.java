package bitcamp.myapp.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.Member;

@Mapper
public interface MemberDao {
  void insert(Member m);
  List<Member> findAll();
  List<Member> allMember();
  Member findByNo(int no);
  Member get(int no);
  Member findByEmailAndPassword(Map<String,Object> params);
  Member findByEmail(String email);
  int update(Member m);
  int delete(int no);


}







