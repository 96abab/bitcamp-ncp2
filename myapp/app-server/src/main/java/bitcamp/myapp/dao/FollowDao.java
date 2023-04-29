package bitcamp.myapp.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.Follow;

@Mapper
public interface FollowDao {
  void insertFollow(Follow follow);
  List<Follow> findFollowersByFollowedId(int followedId);
  List<Follow> findFollowingByFollowerId(int followerId);
  int deleteFollow(Follow follow);
  int delete(int no);
}