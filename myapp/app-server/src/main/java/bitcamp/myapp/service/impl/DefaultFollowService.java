package bitcamp.myapp.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.myapp.dao.FollowDao;
import bitcamp.myapp.service.FollowService;
import bitcamp.myapp.vo.Follow;

@Service
public class DefaultFollowService implements FollowService {

  @Autowired private FollowDao followDao;

  @Transactional
  @Override
  public void addFollow(Follow follow) {
    followDao.insertFollow(follow);
  }

  @Override
  public List<Follow> getFollowers(int followedId) {
    return followDao.findFollowersByFollowedId(followedId);
  }

  @Override
  public List<Follow> getFollowing(int followerId) {
    return followDao.findFollowingByFollowerId(followerId);
  }

  @Transactional
  @Override
  public void removeFollow(Follow follow) {
    if (followDao.deleteFollow(follow) == 0) {
      throw new RuntimeException("팔로우 관계가 존재하지 않습니다!");
    }
  }
}