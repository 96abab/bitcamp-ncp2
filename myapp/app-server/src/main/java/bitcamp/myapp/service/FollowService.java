package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.Follow;

public interface FollowService {
  void addFollow(Follow follow);
  List<Follow> getFollowers(int followedId);
  List<Follow> getFollowing(int followerId);
  void removeFollow(Follow follow);
}