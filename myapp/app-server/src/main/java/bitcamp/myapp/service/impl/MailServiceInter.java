package bitcamp.myapp.service.impl;

import java.io.UnsupportedEncodingException;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public interface MailServiceInter {

  MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException;

  String createKey();

  String sendSimpleMessage(String to) throws Exception;

}
