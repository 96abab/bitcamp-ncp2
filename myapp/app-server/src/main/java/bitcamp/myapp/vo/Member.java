package bitcamp.myapp.vo;

import java.sql.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class Member {
  private int no;
  private String email;
  private String password;
  private String name;
  private String tel;
  private String nickName;
  private String introduce;
  private String interest;
  private String hobby;
  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd",
      timezone = "Asia/Seoul")
  private Date createdDate;
  private List<MemberFile> attachedFiles;
}