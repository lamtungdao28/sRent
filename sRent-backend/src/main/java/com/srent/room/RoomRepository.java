package com.srent.room;
import jakarta.persistence.LockModeType; import org.springframework.data.domain.*; import org.springframework.data.jpa.repository.*; import org.springframework.data.repository.query.Param; import java.util.*;
public interface RoomRepository extends JpaRepository<Room,UUID>,JpaSpecificationExecutor<Room>{
    @EntityGraph(attributePaths="property") Page<Room> findAllByPropertyOwnerId(UUID ownerId,Pageable pageable);
    @Lock(LockModeType.PESSIMISTIC_WRITE) @Query("select r from Room r join fetch r.property p join fetch p.owner where r.id=:id") Optional<Room> findByIdForUpdate(@Param("id") UUID id);
    @Query("select count(r) from Room r where r.approvalStatus=:status") long countByApprovalStatus(@Param("status") Room.ApprovalStatus status);
}
