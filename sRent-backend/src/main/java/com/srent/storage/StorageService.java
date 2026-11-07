package com.srent.storage;
import java.io.InputStream;
import com.srent.common.ApiException; import com.srent.config.AppProperties; import io.minio.*; import io.minio.http.Method; import org.springframework.beans.factory.annotation.Qualifier; import org.springframework.http.HttpStatus; import org.springframework.stereotype.Service; import java.util.*; import java.util.concurrent.TimeUnit;
@Service
public class StorageService {
    private final MinioClient minio; private final MinioClient presigner; private final AppProperties props;
    public StorageService(MinioClient minio,@Qualifier("minioPresigner") MinioClient presigner,AppProperties props){this.minio=minio;this.presigner=presigner;this.props=props;}
    public record Upload(String objectKey,String url,Date expiresAt){} public record Metadata(long size,String contentType){}
    public Upload presignedUpload(boolean privateBucket,String objectKey,String contentType){try{String bucket=bucket(privateBucket);Map<String,String> headers=Map.of("Content-Type",contentType);int seconds=(int)props.getStorage().getPresignExpiry().toSeconds();String url=presigner.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder().method(Method.PUT).bucket(bucket).object(objectKey).expiry(seconds,TimeUnit.SECONDS).extraHeaders(headers).build());return new Upload(objectKey,url,new Date(System.currentTimeMillis()+seconds*1000L));}catch(Exception e){throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE,"STORAGE_UNAVAILABLE","Không thể tạo URL upload: "+e.getMessage());}}
    public String presignedDownload(String key){try{int seconds=(int)props.getStorage().getPresignExpiry().toSeconds();return presigner.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder().method(Method.GET).bucket(bucket(true)).object(key).expiry(seconds,TimeUnit.SECONDS).build());}catch(Exception e){throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE,"STORAGE_UNAVAILABLE","Không thể tạo URL tải tệp");}}
    public String publicUrl(String key){return props.getStorage().getPublicEndpoint()+"/"+props.getStorage().getPublicBucket()+"/"+key;}
    public Metadata stat(boolean privateBucket,String key){try{var s=minio.statObject(StatObjectArgs.builder().bucket(bucket(privateBucket)).object(key).build());return new Metadata(s.size(),s.contentType());}catch(Exception e){throw ApiException.badRequest("UPLOAD_NOT_FOUND","Không tìm thấy tệp đã upload");}}
    public InputStream readPrivate(String key){try{return minio.getObject(GetObjectArgs.builder().bucket(bucket(true)).object(key).build());}catch(Exception e){throw ApiException.badRequest("FILE_NOT_FOUND","Không thể đọc tệp riêng tư");}}
    private String bucket(boolean priv){return priv?props.getStorage().getPrivateBucket():props.getStorage().getPublicBucket();}
}
