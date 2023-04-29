package bitcamp.myapp.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.FollowService;
import bitcamp.myapp.vo.Follow;
import bitcamp.myapp.vo.Member;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/follows")
public class FollowController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("FollowController 생성됨!");
  }

  @Autowired private FollowService followService;


  @PostMapping("/{followedId}")
  public Object addFollow(
      @PathVariable int followedId,
      HttpSession session
      ) throws Exception {
    Member loginUser = (Member) session.getAttribute("loginUser");

    Follow follow = new Follow();
    follow.setFollower(loginUser);
    follow.setFollowedId(followedId);

    followService.addFollow(follow);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("/followers/{followedId}")
  public Object getFollowers(@PathVariable int followedId) {
    log.debug("FollowController.getFollowers() 호출됨!");

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(followService.getFollowers(followedId));
  }

  @GetMapping("/following/{followerId}")
  public Object getFollowing(@PathVariable int followerId) {
    log.debug("FollowController.getFollowing() 호출됨!");

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(followService.getFollowing(followerId));
  }

  @DeleteMapping("/{followedId}")
  public Object removeFollow(@PathVariable int followedId, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    Follow follow = new Follow();
    follow.setFollower(loginUser);
    follow.setFollowedId(followedId);

    followService.removeFollow(follow);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


}