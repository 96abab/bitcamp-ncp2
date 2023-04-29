package bitcamp.myapp.vo;

import lombok.Data;

@Data
public class Like {
  private int id;
  private int boardId;
  private Member member;
}