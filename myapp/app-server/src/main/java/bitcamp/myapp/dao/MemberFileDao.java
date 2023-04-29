package bitcamp.myapp.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.MemberFile;

@Mapper
public interface MemberFileDao {
  int insert(MemberFile memberFile);
  int insertList(List<MemberFile> memberFiles);
  List<MemberFile> findAllOfMember(int memberNo);
  MemberFile findByNo(int memberFileNo);
  int delete(int memberFileNo);
  int deleteOfMember(int memberNo);
}























