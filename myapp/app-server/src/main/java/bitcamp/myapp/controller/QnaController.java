package bitcamp.myapp.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.ObjectStorageService;
import bitcamp.myapp.service.QnaService;
import bitcamp.myapp.vo.Member;
import bitcamp.myapp.vo.Qna;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/qnas")
public class QnaController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("QnaController 생성됨!");
  }

  @Autowired private QnaService qnaService;
  @Autowired private ObjectStorageService objectStorageService;

  @PostMapping
  public Object insert(Qna qna, HttpSession session) {

    Member loginUser = (Member) session.getAttribute("loginUser");

    Member writer = new Member();
    writer.setNo(loginUser.getNo());
    qna.setWriter(writer);

    qnaService.add(qna);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


  private String bucketName = "hangang-bucket";

  @GetMapping("{no}")
  public Object view(@PathVariable int no) {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(qnaService.get(no));
  }


  @PutMapping("{no}")
  public Object update(
      @PathVariable int no,
      Qna qna,
      HttpSession session) throws Exception{

    Qna loginUser = (Qna) session.getAttribute("loginUser");

    Qna writer = new Qna();
    writer.setNo(loginUser.getNo());


    qnaService.update(qna);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


  @GetMapping
  public Object list(String keyword) {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(qnaService.list(keyword));
  }

  @GetMapping("/allQna")
  public Object qnalist(String keyword) {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(qnaService.qnalist(keyword));
  }



  //  @PutMapping("{no}")
  //  public Object update(
  //      @PathVariable int no,
  //      @RequestBody Qna qna) {
  //
  //    log.debug(qna);
  //
  //    // 보안을 위해 URL 번호를 게시글 번호로 설정한다.
  //    qna.setNo(no);
  //
  //    qnaService.update(qna);
  //    return new RestResult()
  //        .setStatus(RestStatus.SUCCESS);
  //  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no) {
    qnaService.delete(no);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }
}
