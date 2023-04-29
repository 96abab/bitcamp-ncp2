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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import bitcamp.myapp.service.BoardService;
import bitcamp.myapp.service.ObjectStorageService;
import bitcamp.myapp.vo.Board;
import bitcamp.myapp.vo.BoardFile;
import bitcamp.myapp.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/boards")
public class BoardController {

  // 입력: POST   => /boards
  // 목록: GET    => /boards
  // 조회: GET    => /boards/{no}
  // 변경: PUT    => /boards/{no}
  // 삭제: DELETE => /boards/{no}

  Logger log = LogManager.getLogger(getClass());

  @Autowired private BoardService boardService;
  @Autowired private ObjectStorageService objectStorageService;

  private String bucketName = "hangang-bucket";

  @PostMapping
  public Object insert(
      Board board,
      List<MultipartFile> files,
      HttpSession session) throws Exception{

    Member loginUser = (Member) session.getAttribute("loginUser");

    Member writer = new Member();
    writer.setNo(loginUser.getNo());
    board.setWriter(writer);



    List<BoardFile> boardFiles = new ArrayList<>();
    for (MultipartFile file : files) {
      String filename = objectStorageService.uploadFile("hangang-bucket", "gallery/", file);
      if (filename == null) {
        continue;
      }

      BoardFile boardFile = new BoardFile();
      boardFile.setOriginalFilename(file.getOriginalFilename());
      boardFile.setFilepath(filename);
      boardFile.setMimeType(file.getContentType());
      boardFile.setBoardNo(board.getNo());
      boardFiles.add(boardFile);
    }
    board.setAttachedFiles(boardFiles);

    boardService.add(board);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping
  public Object list(String keyword) {
    log.debug("BoardController.list() 호출됨!");

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(boardService.list(keyword));
  }


  @GetMapping("/peak")
  public Object findPeak(String keyword) {
    log.debug("BoardController.findPeak() 호출됨!");

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(boardService.findPeak(keyword));
  }

  @GetMapping("/nightMarket")
  public Object findNightMarket(String keyword) {
    log.debug("BoardController.findNightMarket() 호출됨!");

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(boardService.findNightMarket(keyword));
  }

  @GetMapping("/firework")
  public Object findFirework(String keyword) {
    log.debug("BoardController.findFirework() 호출됨!");

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(boardService.findFirework(keyword));
  }

  @GetMapping("/dron")
  public Object findDron(String keyword) {
    log.debug("BoardController.findDron() 호출됨!");

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(boardService.findDron(keyword));
  }


  @GetMapping("{no}")
  public Object view(@PathVariable int no) {
    Board board = boardService.get(no);
    if (board != null) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData(board);
    } else {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.NO_DATA);
    }
  }
  @GetMapping("/user/{userId}")
  public Object listByUser(@PathVariable int userId, String keyword) {
    log.debug("BoardController.listByUser() 호출됨!");

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(boardService.listByUser(keyword, userId));
  }


  @PutMapping("{no}")
  public Object update(
      @PathVariable int no,
      Board board,
      @RequestParam("files")List<MultipartFile> files,
      HttpSession session) throws Exception {

    Member loginUser = (Member) session.getAttribute("loginUser");

    // URL 의 번호와 요청 파라미터의 번호가 다를 경우를 방지하기 위해
    // URL의 번호를 게시글 번호로 설정한다.
    board.setNo(no);

    Board old = boardService.get(board.getNo());
    if (old.getWriter().getNo() != loginUser.getNo()) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("권한이 없습니다.");
    }

    List<BoardFile> boardFiles = new ArrayList<>();
    for (MultipartFile file : files) {
      String filename = objectStorageService.uploadFile("hangang-bucket", "gallery/", file);
      if (filename == null) {
        continue;
      }

      BoardFile boardFile = new BoardFile();
      boardFile.setOriginalFilename(file.getOriginalFilename());
      boardFile.setFilepath(filename);
      boardFile.setMimeType(file.getContentType());
      boardFile.setBoardNo(board.getNo());
      boardFiles.add(boardFile);
    }
    board.setAttachedFiles(boardFiles);

    boardService.update(board);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    Board old = boardService.get(no);
    if (old.getWriter().getNo() != loginUser.getNo()) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("권한이 없습니다.");
    }
    boardService.deleteComments(no);
    boardService.deleteLikes(no);
    boardService.delete(no);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @DeleteMapping("{boardNo}/files/{fileNo}")
  public Object filedelete(
      @PathVariable int boardNo,
      @PathVariable int fileNo,
      HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    Board old = boardService.get(boardNo);

    if (old.getWriter().getNo() != loginUser.getNo()) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("권한이 없습니다.");

    } else {
      boardService.deleteFile(fileNo);
      return new RestResult()
          .setStatus(RestStatus.SUCCESS);
    }
  }
}