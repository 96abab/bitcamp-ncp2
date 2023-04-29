package bitcamp.myapp.controller;

import java.util.ArrayList;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import bitcamp.myapp.service.MemberService;
import bitcamp.myapp.service.ObjectStorageService;
import bitcamp.myapp.vo.Member;
import bitcamp.myapp.vo.MemberFile;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/members")
public class MemberController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("MemberController 생성됨!");
  }

  @Autowired private MemberService memberService;
  @Autowired private ObjectStorageService objectStorageService;

  @PostMapping
  public Object insert(@RequestBody Member member) {
    memberService.add(member);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


  private String bucketName = "hangang-bucket";

  @GetMapping("{no}")
  public Object view(@PathVariable int no) {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(memberService.get(no));
  }


  @PutMapping("{no}")
  public Object update(
      @PathVariable int no,
      Member member,
      List<MultipartFile> files,
      HttpSession session) throws Exception{

    Member loginUser = (Member) session.getAttribute("loginUser");

    Member writer = new Member();
    writer.setNo(loginUser.getNo());

    List<MemberFile> memberFiles = new ArrayList<>();
    for (MultipartFile file : files) {
      String filename = objectStorageService.uploadFile("hangang-bucket", "member/", file);
      if (filename == null) {
        continue;
      }

      MemberFile memberFile = new MemberFile();
      memberFile.setOriginalFilename(file.getOriginalFilename());
      memberFile.setFilepath(filename);
      memberFile.setMimeType(file.getContentType());
      memberFile.setMemberNo(member.getNo());
      memberFiles.add(memberFile);
    }
    member.setAttachedFiles(memberFiles);

    memberService.update(member);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


  @GetMapping
  public Object list(String keyword) {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(memberService.list(keyword));
  }

  @GetMapping("/allMember")
  public Object memberlist(String keyword) {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(memberService.memberlist(keyword));
  }



  //  @PutMapping("{no}")
  //  public Object update(
  //      @PathVariable int no,
  //      @RequestBody Member member) {
  //
  //    log.debug(member);
  //
  //    // 보안을 위해 URL 번호를 게시글 번호로 설정한다.
  //    member.setNo(no);
  //
  //    memberService.update(member);
  //    return new RestResult()
  //        .setStatus(RestStatus.SUCCESS);
  //  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no) {
    memberService.delete(no);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }
}
