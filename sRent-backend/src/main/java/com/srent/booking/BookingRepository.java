package com.srent.booking; import org.springframework.data.domain.*; import org.springframework.data.jpa.repository.*; import org.springframework.data.repository.query.Param; import java.util.*;
public interface BookingRepository extends JpaRepository<Booking,UUID>{
    @EntityGraph(attributePaths={"room","student","landlord"}) Page<Booking> findAllByStudentId(UUID id,Pageable p);
    @EntityGraph(attributePaths={"room","student","landlord"}) Page<Booking> findAllByLandlordId(UUID id,Pageable p);
    boolean existsByRoomIdAndStudentIdAndStatus(UUID r,UUID s,Booking.Status status);
    @Query("select b from Booking b where b.room.id=:room and b.status='PENDING' and b.id<>:except") List<Booking> otherPending(@Param("room")UUID room,@Param("except")UUID except);
    long countByStatus(Booking.Status status);
}
