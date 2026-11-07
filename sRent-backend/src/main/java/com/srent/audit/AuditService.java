package com.srent.audit;
import lombok.RequiredArgsConstructor; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Propagation; import org.springframework.transaction.annotation.Transactional; import java.util.UUID;
@Service @RequiredArgsConstructor
public class AuditService { private final AuditLogRepository repo; @Transactional(propagation=Propagation.MANDATORY) public void log(UUID actor,String action,String type,UUID resource,String details){var l=new AuditLog();l.setActorId(actor);l.setAction(action);l.setResourceType(type);l.setResourceId(resource);l.setDetails(details);repo.save(l);} }
