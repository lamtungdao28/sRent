package com.srent.common;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.Instant;
import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log=LoggerFactory.getLogger(GlobalExceptionHandler.class);
    public record ErrorResponse(String code, String message, Instant timestamp, String path, Map<String,String> fieldErrors) {}
    @ExceptionHandler(ApiException.class) ResponseEntity<ErrorResponse> api(ApiException e,HttpServletRequest r){return response(e.getStatus(),e.getCode(),e.getMessage(),r,null);}
    @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<ErrorResponse> validation(MethodArgumentNotValidException e,HttpServletRequest r){
        Map<String,String> fields=new LinkedHashMap<>(); e.getBindingResult().getFieldErrors().forEach(x->fields.putIfAbsent(x.getField(),x.getDefaultMessage()));
        return response(HttpStatus.BAD_REQUEST,"VALIDATION_ERROR","Dữ liệu không hợp lệ",r,fields);
    }
    @ExceptionHandler(AccessDeniedException.class) ResponseEntity<ErrorResponse> denied(AccessDeniedException e,HttpServletRequest r){return response(HttpStatus.FORBIDDEN,"FORBIDDEN","Bạn không có quyền thực hiện thao tác này",r,null);}
    @ExceptionHandler(DataIntegrityViolationException.class) ResponseEntity<ErrorResponse> conflict(DataIntegrityViolationException e,HttpServletRequest r){return response(HttpStatus.CONFLICT,"DATA_CONFLICT","Dữ liệu xung đột hoặc đã tồn tại",r,null);}
    @ExceptionHandler(MaxUploadSizeExceededException.class) ResponseEntity<ErrorResponse> max(MaxUploadSizeExceededException e,HttpServletRequest r){return response(HttpStatus.PAYLOAD_TOO_LARGE,"FILE_TOO_LARGE","Tệp vượt quá dung lượng cho phép",r,null);}
    @ExceptionHandler(Exception.class) ResponseEntity<ErrorResponse> unknown(Exception e,HttpServletRequest r){log.error("Unhandled error at {}",r.getRequestURI(),e);return response(HttpStatus.INTERNAL_SERVER_ERROR,"INTERNAL_ERROR","Có lỗi nội bộ xảy ra",r,null);}
    private ResponseEntity<ErrorResponse> response(HttpStatus s,String c,String m,HttpServletRequest r,Map<String,String> f){return ResponseEntity.status(s).body(new ErrorResponse(c,m,Instant.now(),r.getRequestURI(),f));}
}
