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
import bitcamp.myapp.service.LikeService;
import bitcamp.myapp.vo.Like;
import bitcamp.myapp.vo.Member;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/likes")
public class LikeController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("LikeController 생성됨!");
  }

  @Autowired private LikeService likeService;


  @PostMapping("/{boardId}")
  public Object addLike(
      @PathVariable int boardId,
      HttpSession session
      ) throws Exception {
    Member loginUser = (Member) session.getAttribute("loginUser");

    Like like = new Like();
    like.setMember(loginUser);
    like.setBoardId(boardId);

    likeService.addLike(like);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("/{boardId}")
  public Object getLikes(@PathVariable int boardId) {
    log.debug("LikeController.getLikes() 호출됨!");

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(likeService.getLikes(boardId));
  }

  @DeleteMapping("/{boardId}")
  public Object removeLike(@PathVariable int boardId, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    Like like = new Like();
    like.setMember(loginUser);
    like.setBoardId(boardId);

    likeService.removeLike(like);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }
}