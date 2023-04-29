package bitcamp.myapp.web.interceptor;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AdminCheckInterceptor implements HandlerInterceptor {

  Logger log = LogManager.getLogger(getClass());

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    log.trace("preHandle() 호출됨!");

    //    if (request.getMethod().equals("GET")) {
    //      return true;
    //    }
    //
    //    Member loginUser = (Member) request.getSession().getAttribute("loginUser");
    //    if (!loginUser.getEmail().equals("root@root")) {
    //      response.setContentType("application/json;charset=UTF-8");
    //      PrintWriter out = response.getWriter();
    //      out.print(new ObjectMapper().writeValueAsString(
    //          new RestResult()
    //          .setStatus(RestStatus.FAILURE)
    //          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
    //          .setData("권한이 없습니다.")));
    //      return false;
    //    }
    //    return true;
    //  }
    //
    //  @Override
    //  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
    //      ModelAndView modelAndView) throws Exception {
    //    log.trace("postHandle() 호출됨!");
    //  }
    //
    //  @Override
    //  public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
    //      Object handler, Exception ex) throws Exception {
    //    log.trace("afterCompletion() 호출됨!");
    return true;
  }
}






