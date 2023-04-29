package bitcamp.myapp.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import bitcamp.myapp.service.BoardService;
import bitcamp.myapp.service.MemberService;
import bitcamp.myapp.vo.BoardFile;
import bitcamp.myapp.vo.MemberFile;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class DownloadController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("DownloadController 생성됨!");
  }

  @Autowired private BoardService boardService;
  @Autowired private MemberService memberService;

  @RequestMapping("/download/boardfile")
  public String execute(
      @RequestParam("fileNo") int fileNo,
      HttpServletRequest request,
      HttpServletResponse response) throws Exception {

    BoardFile boardFile = boardService.getFile(fileNo);
    MemberFile memberFile = memberService.getFile(fileNo);

    if (boardFile == null) {
      throw new RuntimeException("파일 정보 없음!");
    }

    File downloadFile = new File(System.getProperty("user.home") + "/webapp-upload/" + boardFile.getFilepath());
    if (!downloadFile.exists()) {
      throw new RuntimeException("파일이 존재하지 않음!");
    }

    response.setContentType(boardFile.getMimeType());

    response.setHeader("Content-Disposition",
        String.format("attachment; filename=\"%s\"", boardFile.getOriginalFilename()));

    try (
        BufferedInputStream fileIn = new BufferedInputStream(new FileInputStream(downloadFile));
        BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());) {

      int b;
      while ((b = fileIn.read()) != -1) {
        out.write(b);
      }
      out.flush();
    }

    return null;
  }
}






