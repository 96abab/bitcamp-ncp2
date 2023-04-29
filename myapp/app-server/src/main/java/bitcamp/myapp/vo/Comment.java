package bitcamp.myapp.vo;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class Comment {
  private int no;
  private String content;
  private Member writer;
  private int boardNo;
  private int writerNo;

  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd",
      timezone = "Asia/Seoul")
  private Date createdDate;

}

