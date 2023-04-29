package bitcamp.myapp.vo;

import lombok.Data;

@Data
public class Follow {
  private int id;
  private int followedId;
  private Member follower;
}